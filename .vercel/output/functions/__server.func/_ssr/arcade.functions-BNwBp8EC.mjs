import { n as TSS_SERVER_FUNCTION, t as createServerFn } from "./ssr.mjs";
import { a as object, i as number, n as boolean, o as string, t as _enum } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/arcade.functions-BNwBp8EC.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var PAGE = 24;
var KEY = "orbit-key";
var categorySlug = _enum([
	"action",
	"arcade",
	"puzzle",
	"racing",
	"sports",
	"adventure",
	"strategy",
	"io",
	"girls",
	"casual"
]);
function slugify(title) {
	return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 48) || "game";
}
function assertKey(key) {
	if (key !== KEY) throw new Error("Owner key rejected.");
}
async function db() {
	const { getSql } = await import("./db-DQ53K3r_.mjs");
	return getSql();
}
var getCatalogHome_createServerFn_handler = createServerRpc({
	id: "1c01a661c949f4efffe2b767829968ff7effb4f122553fa0723d8014a192dfaa",
	name: "getCatalogHome",
	filename: "src/lib/arcade.functions.ts"
}, (opts) => getCatalogHome.__executeServer(opts));
var getCatalogHome = createServerFn({ method: "GET" }).handler(getCatalogHome_createServerFn_handler, async () => {
	const sql = await db();
	const categories = await sql`
    select c.slug, c.label, c.blurb, c.sort_order,
      (select count(*)::int from games g where g.category = c.slug and g.status = 'live') as live_count
    from categories c
    order by c.sort_order
  `;
	const featured = await sql`
    select * from games where status = 'live' and featured = true order by created_at desc limit 6
  `;
	const newest = await sql`
    select * from games where status = 'live' order by created_at desc limit 12
  `;
	const totals = await sql`
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
		pending: totals[0]?.pending ?? 0
	};
});
var browseInput = object({
	category: string().optional(),
	q: string().optional(),
	sort: _enum([
		"new",
		"plays",
		"title"
	]).optional(),
	page: number().int().min(1).optional()
});
var browseGames_createServerFn_handler = createServerRpc({
	id: "1cc556692f0a86e9b86e9661c0f1d3ca6a80adc8436ef138a24f79221f8a89ea",
	name: "browseGames",
	filename: "src/lib/arcade.functions.ts"
}, (opts) => browseGames.__executeServer(opts));
var browseGames = createServerFn({ method: "GET" }).validator((input) => browseInput.parse(input)).handler(browseGames_createServerFn_handler, async ({ data }) => {
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
		like
	};
	const rows = sort === "plays" ? await sql`
            select * from games
            where status = 'live'
              and (${where.category} = '' or category = ${where.category})
              and (${where.q} = '' or title ilike ${where.like} or developer ilike ${where.like} or blurb ilike ${where.like})
            order by plays desc, created_at desc
            limit ${PAGE} offset ${offset}
          ` : sort === "title" ? await sql`
              select * from games
              where status = 'live'
                and (${where.category} = '' or category = ${where.category})
                and (${where.q} = '' or title ilike ${where.like} or developer ilike ${where.like} or blurb ilike ${where.like})
              order by title asc
              limit ${PAGE} offset ${offset}
            ` : await sql`
              select * from games
              where status = 'live'
                and (${where.category} = '' or category = ${where.category})
                and (${where.q} = '' or title ilike ${where.like} or developer ilike ${where.like} or blurb ilike ${where.like})
              order by created_at desc
              limit ${PAGE} offset ${offset}
            `;
	const total = (await sql`
      select count(*)::int as n from games
      where status = 'live'
        and (${category} = '' or category = ${category})
        and (${q} = '' or title ilike ${like} or developer ilike ${like} or blurb ilike ${like})
    `)[0]?.n ?? 0;
	return {
		rows,
		total,
		page,
		pageSize: PAGE,
		pages: Math.max(1, Math.ceil(total / PAGE))
	};
});
var getGame_createServerFn_handler = createServerRpc({
	id: "c5e52d9345d051d15ec4eedd02bfa363b2f0a82060a10ed972cc5766dd1283b5",
	name: "getGame",
	filename: "src/lib/arcade.functions.ts"
}, (opts) => getGame.__executeServer(opts));
var getGame = createServerFn({ method: "GET" }).validator((input) => object({ slug: string().min(1).max(80) }).parse(input)).handler(getGame_createServerFn_handler, async ({ data }) => {
	const sql = await db();
	const game = (await sql`select * from games where slug = ${data.slug} and status = 'live' limit 1`)[0] ?? null;
	if (!game) return {
		game: null,
		related: []
	};
	await sql`update games set plays = plays + 1 where id = ${game.id}`;
	const related = await sql`
      select * from games
      where status = 'live' and category = ${game.category} and id <> ${game.id}
      order by plays desc
      limit 4
    `;
	return {
		game: {
			...game,
			plays: game.plays + 1
		},
		related
	};
});
var gameDraft = object({
	key: string(),
	title: string().min(2).max(80),
	blurb: string().min(8).max(280),
	developer: string().min(2).max(60),
	category: categorySlug,
	embedUrl: string().max(400).optional(),
	featured: boolean().optional()
});
function cleanEmbed(raw) {
	const url = (raw ?? "").trim();
	if (!url) return null;
	if (!url.startsWith("https://")) throw new Error("Embed must be an https link.");
	return url;
}
var publishLive_createServerFn_handler = createServerRpc({
	id: "932f60626dd1595e4afb83841da3849e88120e7295960570b5f526386a620df4",
	name: "publishLive",
	filename: "src/lib/arcade.functions.ts"
}, (opts) => publishLive.__executeServer(opts));
var publishLive = createServerFn({ method: "POST" }).validator((input) => gameDraft.parse(input)).handler(publishLive_createServerFn_handler, async ({ data }) => {
	assertKey(data.key);
	const sql = await db();
	const embed = cleanEmbed(data.embedUrl);
	let slug = slugify(data.title);
	if ((await sql`select slug from games where slug = ${slug} limit 1`).length) slug = `${slug}-${Date.now().toString(36)}`;
	return (await sql`
      insert into games (slug, title, blurb, category, developer, embed_url, status, featured)
      values (${slug}, ${data.title.trim()}, ${data.blurb.trim()}, ${data.category}, ${data.developer.trim()}, ${embed}, 'live', ${Boolean(data.featured)})
      returning *
    `)[0];
});
var submitPending_createServerFn_handler = createServerRpc({
	id: "daf2e3a71978319f330c4cf7e46030825fa805c2da5ddbffd7ce024b257f8925",
	name: "submitPending",
	filename: "src/lib/arcade.functions.ts"
}, (opts) => submitPending.__executeServer(opts));
var submitPending = createServerFn({ method: "POST" }).validator((input) => gameDraft.omit({
	key: true,
	featured: true
}).parse(input)).handler(submitPending_createServerFn_handler, async ({ data }) => {
	const sql = await db();
	const embed = cleanEmbed(data.embedUrl);
	if (!embed) throw new Error("A public submission needs an https embed.");
	let slug = slugify(data.title);
	if ((await sql`select slug from games where slug = ${slug} limit 1`).length) slug = `${slug}-${Date.now().toString(36)}`;
	await sql`
      insert into games (slug, title, blurb, category, developer, embed_url, status, featured)
      values (${slug}, ${data.title.trim()}, ${data.blurb.trim()}, ${data.category}, ${data.developer.trim()}, ${embed}, 'pending', false)
    `;
	return { ok: true };
});
var studioBoard_createServerFn_handler = createServerRpc({
	id: "5162757694d98342936d6af0568925c860560ad7388d3f5535713d5a28350324",
	name: "studioBoard",
	filename: "src/lib/arcade.functions.ts"
}, (opts) => studioBoard.__executeServer(opts));
var studioBoard = createServerFn({ method: "GET" }).validator((input) => object({
	key: string(),
	page: number().int().min(1).optional()
}).parse(input)).handler(studioBoard_createServerFn_handler, async ({ data }) => {
	assertKey(data.key);
	const sql = await db();
	const page = data.page ?? 1;
	const rows = await sql`
      select * from games order by created_at desc limit ${PAGE} offset ${(page - 1) * PAGE}
    `;
	const c = (await sql`
      select count(*)::int as n,
        count(*) filter (where status = 'live')::int as live,
        count(*) filter (where status = 'pending')::int as pending,
        count(*) filter (where status = 'hidden')::int as hidden
      from games
    `)[0];
	return {
		rows,
		page,
		pages: Math.max(1, Math.ceil((c?.n ?? 0) / PAGE)),
		live: c?.live ?? 0,
		pending: c?.pending ?? 0,
		hidden: c?.hidden ?? 0,
		total: c?.n ?? 0
	};
});
var setGameState_createServerFn_handler = createServerRpc({
	id: "32e67315927ea5e250a0b80fdbe6eea0256866cafaf3c1544bde70d10a711fbb",
	name: "setGameState",
	filename: "src/lib/arcade.functions.ts"
}, (opts) => setGameState.__executeServer(opts));
var setGameState = createServerFn({ method: "POST" }).validator((input) => object({
	key: string(),
	id: number().int(),
	status: _enum([
		"live",
		"hidden",
		"pending"
	]).optional(),
	featured: boolean().optional()
}).parse(input)).handler(setGameState_createServerFn_handler, async ({ data }) => {
	assertKey(data.key);
	const sql = await db();
	if (data.status) await sql`update games set status = ${data.status} where id = ${data.id}`;
	if (typeof data.featured === "boolean") await sql`update games set featured = ${data.featured} where id = ${data.id}`;
	return { ok: true };
});
var removeGame_createServerFn_handler = createServerRpc({
	id: "13c3f58cbdb7e4bd7f6743aa3dfa2dd6ed20c1a37f103cf8700fb3362edc4581",
	name: "removeGame",
	filename: "src/lib/arcade.functions.ts"
}, (opts) => removeGame.__executeServer(opts));
var removeGame = createServerFn({ method: "POST" }).validator((input) => object({
	key: string(),
	id: number().int()
}).parse(input)).handler(removeGame_createServerFn_handler, async ({ data }) => {
	assertKey(data.key);
	await (await db())`delete from games where id = ${data.id}`;
	return { ok: true };
});
//#endregion
export { browseGames_createServerFn_handler, getCatalogHome_createServerFn_handler, getGame_createServerFn_handler, publishLive_createServerFn_handler, removeGame_createServerFn_handler, setGameState_createServerFn_handler, studioBoard_createServerFn_handler, submitPending_createServerFn_handler };
