import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell } from "@/components/shell";
import { GameCard } from "@/components/game-card";
import { getCatalogHome } from "@/lib/arcade.functions";

export const Route = createFileRoute("/")({
  loader: () => getCatalogHome(),
  component: Home,
});

function Home() {
  const data = Route.useLoaderData();

  return (
    <Shell>
      <main className="mx-auto max-w-6xl space-y-10 px-4 py-6">
        <section className="grid overflow-hidden rounded-3xl border border-border bg-surface lg:grid-cols-[1.3fr_1fr]">
          <img src="/art/hangar.jpg" alt="A dark hangar of game cabinets facing a nebula" className="h-64 w-full object-cover lg:h-full" />
          <div className="flex flex-col justify-center gap-4 p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Station catalog</p>
            <h1 className="font-display text-4xl font-extrabold leading-none sm:text-5xl">A shelf built for a thousand games.</h1>
            <p className="text-muted">
              Categories, search, and pages are ready. The hangar is empty until you publish. {data.live} live
              {data.pending ? ` · ${data.pending} waiting on you` : ""}.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/browse" search={{ q: "", page: 1, sort: "new", category: "all" }} className="inline-flex h-11 items-center rounded-full bg-primary px-5 text-sm font-semibold text-primary-ink">
                Open the shelf
              </Link>
              <Link to="/studio" className="inline-flex h-11 items-center rounded-full border border-border px-5 text-sm font-semibold">
                Owner studio
              </Link>
            </div>
          </div>
        </section>

        <section>
          <h2 className="mb-4 font-display text-2xl font-bold">Decks</h2>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
            {data.categories.map((c) => (
              <Link
                key={c.slug}
                to="/browse"
                search={{ category: c.slug, q: "", page: 1, sort: "new" }}
                className="rounded-2xl border border-border bg-surface p-4 hover:border-primary/50"
              >
                <p className="font-display text-lg font-bold">{c.label}</p>
                <p className="mt-1 line-clamp-2 text-sm text-muted">{c.blurb}</p>
                <p className="mt-3 text-xs text-accent">{c.live_count} live</p>
              </Link>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-4 font-display text-2xl font-bold">Featured</h2>
          {data.featured.length === 0 ? (
            <Empty label="Nothing is pinned to the viewport yet. Mark a game featured from the studio." />
          ) : (
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
              {data.featured.map((g) => (
                <GameCard key={g.id} game={g} />
              ))}
            </div>
          )}
        </section>

        <section>
          <div className="mb-4 flex items-end justify-between">
            <h2 className="font-display text-2xl font-bold">Just docked</h2>
            <Link to="/browse" search={{ q: "", page: 1, sort: "new", category: "all" }} className="text-sm text-primary">
              All live games
            </Link>
          </div>
          {data.newest.length === 0 ? (
            <Empty label="The newest rail fills itself the moment a game goes live." />
          ) : (
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
              {data.newest.map((g) => (
                <GameCard key={g.id} game={g} />
              ))}
            </div>
          )}
        </section>
      </main>
    </Shell>
  );
}

function Empty({ label }: { label: string }) {
  return <p className="rounded-2xl border border-dashed border-border bg-surface/60 p-8 text-muted">{label}</p>;
}
