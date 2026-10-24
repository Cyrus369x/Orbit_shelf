import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const PAGE = 24;
const KEY = "orbit-key";

export const ownerHint = KEY;

const categorySlug = z.enum([
  "action",
  "arcade",
  "puzzle",
  "racing",
  "sports",
  "adventure",
  "strategy",
  "io",
  "girls",
  "casual",
]);

export type GameRow = {
  id: number;
  slug: string;
  title: string;
  blurb: string;
  category: string;
  developer: string;
  embed_url: string | null;
  status: string;
  featured: boolean;
  plays: number;
  created_at: string;
};

export type CategoryRow = {
  slug: string;
  label: string;
  blurb: string;
  sort_order: number;
  live_count: number;
};

function slugify(title: string) {
  const base = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 48);
  return base || "game";
}

function assertKey(key: string) {
  if (key !== KEY) throw new Error("Owner key rejected.");
}

async function db() {
  const { getSql } = await import("@/lib/db");
  return getSql();
}

export const getCatalogHome = createServerFn({ method: "GET" }).handler(async () => {
  const sql = await db();
  const categories = await sql<CategoryRow>`
    select c.slug, c.label, c.blurb, c.sort_order,
      (select count(*)::int from games g where g.category = c.slug and g.status = 'live') as live_count
    from categories c
    order by c.sort_order
  `;
  const featured = await sql<GameRow>`
    select * from games where status = 'live' and featured = true order by created_at desc limit 6
  `;
  const newest = await sql<GameRow>`
    select * from games where status = 'live' order by created_at desc limit 12
  `;
  const totals = await sql<{ live: number; pending: number }>`
    select
      count(*) filter (where status = 'live')::int as live,
      count(*) filter (where status = 'pending')::int as pending
    from games
  `;
  return {
    categories,
    featured,
    newest,
    live: totals[0]?.live ?? 0,
    pending: totals[0]?.pending ?? 0,
  };
});

const browseInput = z.object({
  category: z.string().optional(),
  q: z.string().optional(),
  sort: z.enum(["new", "plays", "title"]).optional(),
  page: z.number().int().min(1).optional(),
});

export const browseGames = createServerFn({ method: "GET" })
  .validator((input: unknown) => browseInput.parse(input))
  .handler(async ({ data }) => {
    const sql = await db();
    const page = data.page ?? 1;
    const q = (data.q ?? "").trim().slice(0, 80);
    const category = data.category && data.category !== "all" ? data.category : "";
    const sort = data.sort ?? "new";
    const like = `%${q.replace(/[%_]/g, "")}%`;
    const offset = (page - 1) * PAGE;
    const where = {
      category,
      q,
      like,
    };

    const rows =
      sort === "plays"
        ? await sql<GameRow>`
            select * from games
            where status = 'live'
              and (${where.category} = '' or category = ${where.category})
              and (${where.q} = '' or title ilike ${where.like} or developer ilike ${where.like} or blurb ilike ${where.like})
            order by plays desc, created_at desc
            limit ${PAGE} offset ${offset}
          `
        : sort === "title"
          ? await sql<GameRow>`
              select * from games
              where status = 'live'
                and (${where.category} = '' or category = ${where.category})
                and (${where.q} = '' or title ilike ${where.like} or developer ilike ${where.like} or blurb ilike ${where.like})
              order by title asc
              limit ${PAGE} offset ${offset}
            `
          : await sql<GameRow>`
              select * from games
              where status = 'live'
                and (${where.category} = '' or category = ${where.category})
                and (${where.q} = '' or title ilike ${where.like} or developer ilike ${where.like} or blurb ilike ${where.like})
              order by created_at desc
              limit ${PAGE} offset ${offset}
            `;
    const counted = await sql<{ n: number }>`
      select count(*)::int as n from games
      where status = 'live'
        and (${category} = '' or category = ${category})
        and (${q} = '' or title ilike ${like} or developer ilike ${like} or blurb ilike ${like})
    `;
    const total = counted[0]?.n ?? 0;
    return { rows, total, page, pageSize: PAGE, pages: Math.max(1, Math.ceil(total / PAGE)) };
  });

export const getGame = createServerFn({ method: "GET" })
  .validator((input: unknown) => z.object({ slug: z.string().min(1).max(80) }).parse(input))
  .handler(async ({ data }) => {
    const sql = await db();
    const rows = await sql<GameRow>`select * from games where slug = ${data.slug} and status = 'live' limit 1`;
    const game = rows[0] ?? null;
    if (!game) return { game: null as GameRow | null, related: [] as GameRow[] };
    await sql`update games set plays = plays + 1 where id = ${game.id}`;
    const related = await sql<GameRow>`
      select * from games
      where status = 'live' and category = ${game.category} and id <> ${game.id}
      order by plays desc
      limit 4
    `;
    return { game: { ...game, plays: game.plays + 1 }, related };
  });

const gameDraft = z.object({
  key: z.string(),
  title: z.string().min(2).max(80),
  blurb: z.string().min(8).max(280),
  developer: z.string().min(2).max(60),
  category: categorySlug,
  embedUrl: z.string().max(400).optional(),
  featured: z.boolean().optional(),
});

function cleanEmbed(raw: string | undefined) {
  const url = (raw ?? "").trim();
  if (!url) return null;
  if (!url.startsWith("https://")) throw new Error("Embed must be an https link.");
  return url;
}

export const publishLive = createServerFn({ method: "POST" })
  .validator((input: unknown) => gameDraft.parse(input))
  .handler(async ({ data }) => {
    assertKey(data.key);
    const sql = await db();
    const embed = cleanEmbed(data.embedUrl);
    let slug = slugify(data.title);
    const clash = await sql<{ slug: string }>`select slug from games where slug = ${slug} limit 1`;
    if (clash.length) slug = `${slug}-${Date.now().toString(36)}`;
    const rows = await sql<GameRow>`
      insert into games (slug, title, blurb, category, developer, embed_url, status, featured)
      values (${slug}, ${data.title.trim()}, ${data.blurb.trim()}, ${data.category}, ${data.developer.trim()}, ${embed}, 'live', ${Boolean(data.featured)})
      returning *
    `;
    return rows[0];
  });

export const submitPending = createServerFn({ method: "POST" })
  .validator((input: unknown) => gameDraft.omit({ key: true, featured: true }).parse(input))
  .handler(async ({ data }) => {
    const sql = await db();
    const embed = cleanEmbed(data.embedUrl);
    if (!embed) throw new Error("A public submission needs an https embed.");
    let slug = slugify(data.title);
    const clash = await sql<{ slug: string }>`select slug from games where slug = ${slug} limit 1`;
    if (clash.length) slug = `${slug}-${Date.now().toString(36)}`;
    await sql`
      insert into games (slug, title, blurb, category, developer, embed_url, status, featured)
      values (${slug}, ${data.title.trim()}, ${data.blurb.trim()}, ${data.category}, ${data.developer.trim()}, ${embed}, 'pending', false)
    `;
    return { ok: true as const };
  });

export const studioBoard = createServerFn({ method: "GET" })
  .validator((input: unknown) => z.object({ key: z.string(), page: z.number().int().min(1).optional() }).parse(input))
  .handler(async ({ data }) => {
    assertKey(data.key);
    const sql = await db();
    const page = data.page ?? 1;
    const offset = (page - 1) * PAGE;
    const rows = await sql<GameRow>`
      select * from games order by created_at desc limit ${PAGE} offset ${offset}
    `;
    const counted = await sql<{ n: number; live: number; pending: number; hidden: number }>`
      select count(*)::int as n,
        count(*) filter (where status = 'live')::int as live,
        count(*) filter (where status = 'pending')::int as pending,
        count(*) filter (where status = 'hidden')::int as hidden
      from games
    `;
    const c = counted[0];
    return {
      rows,
      page,
      pages: Math.max(1, Math.ceil((c?.n ?? 0) / PAGE)),
      live: c?.live ?? 0,
      pending: c?.pending ?? 0,
      hidden: c?.hidden ?? 0,
      total: c?.n ?? 0,
    };
  });

export const setGameState = createServerFn({ method: "POST" })
  .validator((input: unknown) =>
    z
      .object({
        key: z.string(),
        id: z.number().int(),
        status: z.enum(["live", "hidden", "pending"]).optional(),
        featured: z.boolean().optional(),
      })
      .parse(input),
  )
  .handler(async ({ data }) => {
    assertKey(data.key);
    const sql = await db();
    if (data.status) await sql`update games set status = ${data.status} where id = ${data.id}`;
    if (typeof data.featured === "boolean") await sql`update games set featured = ${data.featured} where id = ${data.id}`;
    return { ok: true as const };
  });

export const removeGame = createServerFn({ method: "POST" })
  .validator((input: unknown) => z.object({ key: z.string(), id: z.number().int() }).parse(input))
  .handler(async ({ data }) => {
    assertKey(data.key);
    const sql = await db();
    await sql`delete from games where id = ${data.id}`;
    return { ok: true as const };
  });
