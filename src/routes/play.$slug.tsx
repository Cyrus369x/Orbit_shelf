import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell } from "@/components/shell";
import { getGame } from "@/lib/arcade.functions";

export const Route = createFileRoute("/play/$slug")({
  loader: ({ params }) => getGame({ data: { slug: params.slug } }),
  component: PlayPage,
});

function PlayPage() {
  const { game, related } = Route.useLoaderData();

  if (!game) {
    return (
      <Shell>
        <main className="mx-auto max-w-3xl px-4 py-12">
          <h1 className="font-display text-3xl font-bold">Not on the shelf</h1>
          <p className="mt-2 text-muted">That title is hidden, still pending, or the link is wrong.</p>
          <Link to="/browse" search={{ q: "", category: "all", sort: "new", page: 1 }} className="mt-4 inline-flex text-primary">
            Back to the shelf
          </Link>
        </main>
      </Shell>
    );
  }

  return (
    <Shell>
      <main className="mx-auto grid max-w-6xl gap-8 px-4 py-6 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">{game.category}</p>
          <h1 className="font-display text-4xl font-extrabold">{game.title}</h1>
          {game.embed_url ? (
            <iframe title={game.title} src={game.embed_url} className="aspect-video w-full rounded-2xl border border-border bg-surface" allow="fullscreen; autoplay" />
          ) : (
            <div className="flex aspect-video flex-col items-start justify-end rounded-2xl border border-border bg-surface p-6">
              <img src="/art/hangar.jpg" alt="" className="mb-4 h-24 w-40 rounded-xl object-cover" />
              <p className="font-display text-xl font-bold">No embed yet</p>
              <p className="mt-1 max-w-md text-sm text-muted">This listing is on the shelf, but it has no playable URL. Add an https embed from the studio when the build is ready.</p>
            </div>
          )}
        </div>
        <aside className="space-y-4">
          <p className="text-sm text-muted">{game.blurb}</p>
          <dl className="text-sm">
            <Row k="Developer" v={game.developer} />
            <Row k="Plays" v={String(game.plays)} />
            <Row k="Status" v="Live" />
          </dl>
          <h2 className="font-display text-lg font-bold">Same deck</h2>
          {related.length === 0 ? (
            <p className="text-sm text-muted">No neighbors in this category yet.</p>
          ) : (
            related.map((g) => (
              <Link key={g.id} to="/play/$slug" params={{ slug: g.slug }} className="block text-sm text-primary">
                {g.title}
              </Link>
            ))
          )}
        </aside>
      </main>
    </Shell>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between border-b border-border py-2">
      <dt className="text-muted">{k}</dt>
      <dd>{v}</dd>
    </div>
  );
}
