import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import { Shell } from "@/components/shell";
import { GameCard } from "@/components/game-card";
import { browseGames, getCatalogHome } from "@/lib/arcade.functions";

const searchSchema = z.object({
  q: z.string().optional().catch(""),
  category: z.string().optional().catch("all"),
  sort: z.enum(["new", "plays", "title"]).optional().catch("new"),
  page: z.number().optional().catch(1),
});

export const Route = createFileRoute("/browse")({
  validateSearch: searchSchema,
  loaderDeps: ({ search }) => search,
  loader: async ({ deps }) => {
    const [board, home] = await Promise.all([
      browseGames({
        data: {
          q: deps.q || undefined,
          category: deps.category,
          sort: deps.sort,
          page: deps.page && deps.page > 0 ? deps.page : 1,
        },
      }),
      getCatalogHome(),
    ]);
    return { board, categories: home.categories };
  },
  component: Browse,
});

function Browse() {
  const { q, category, sort, page } = Route.useSearch();
  const { board, categories } = Route.useLoaderData();
  const current = category || "all";
  const sortNow = sort || "new";
  const pageNow = page && page > 0 ? page : 1;

  return (
    <Shell>
      <main className="mx-auto max-w-6xl space-y-6 px-4 py-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Shelf</p>
            <h1 className="font-display text-4xl font-extrabold">{board.total} live</h1>
          </div>
          <div className="flex gap-2 text-sm">
            {(
              [
                ["new", "Newest"],
                ["plays", "Most played"],
                ["title", "A–Z"],
              ] as const
            ).map(([id, label]) => (
              <Link
                key={id}
                to="/browse"
                search={{ q: q ?? "", category: current, sort: id, page: 1 }}
                className={`rounded-full px-3 py-2 ${sortNow === id ? "bg-primary text-primary-ink" : "border border-border"}`}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

        <nav className="flex gap-2 overflow-x-auto pb-1">
          <Chip to={{ category: "all" }} active={current === "all"} q={q ?? ""} sort={sortNow}>
            All decks
          </Chip>
          {categories.map((c) => (
            <Chip key={c.slug} to={{ category: c.slug }} active={current === c.slug} q={q ?? ""} sort={sortNow}>
              {c.label}
            </Chip>
          ))}
        </nav>

        {q ? <p className="text-sm text-muted">Matching “{q}”</p> : null}

        {board.rows.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-border p-8 text-muted">
            This deck is empty. Publish from the studio, or approve a developer submission.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
            {board.rows.map((g) => (
              <GameCard key={g.id} game={g} />
            ))}
          </div>
        )}

        <div className="flex items-center justify-between text-sm">
          <span className="text-muted">
            Page {board.page} of {board.pages}
          </span>
          <div className="flex gap-2">
            {pageNow > 1 && (
              <Link to="/browse" search={{ q: q ?? "", category: current, sort: sortNow, page: pageNow - 1 }} className="rounded-full border border-border px-4 py-2">
                Previous
              </Link>
            )}
            {pageNow < board.pages && (
              <Link to="/browse" search={{ q: q ?? "", category: current, sort: sortNow, page: pageNow + 1 }} className="rounded-full border border-border px-4 py-2">
                Next
              </Link>
            )}
          </div>
        </div>
      </main>
    </Shell>
  );
}

function Chip({
  children,
  active,
  q,
  sort,
  to,
}: {
  children: React.ReactNode;
  active: boolean;
  q: string;
  sort: "new" | "plays" | "title";
  to: { category: string };
}) {
  return (
    <Link
      to="/browse"
      search={{ q, category: to.category, sort, page: 1 }}
      className={`h-11 shrink-0 rounded-full px-4 text-sm font-semibold leading-[2.75rem] ${active ? "bg-primary text-primary-ink" : "border border-border bg-surface"}`}
    >
      {children}
    </Link>
  );
}
