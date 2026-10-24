import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { Shell } from "@/components/shell";
import {
  ownerHint,
  publishLive,
  removeGame,
  setGameState,
  studioBoard,
  type GameRow,
} from "@/lib/arcade.functions";

const CATS = [
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
] as const;

export const Route = createFileRoute("/studio")({
  component: Studio,
});

function Studio() {
  const router = useRouter();
  const [key, setKey] = useState("");
  const [unlocked, setUnlocked] = useState("");
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [board, setBoard] = useState<Awaited<ReturnType<typeof studioBoard>> | null>(null);
  const [title, setTitle] = useState("");
  const [blurb, setBlurb] = useState("");
  const [developer, setDeveloper] = useState("");
  const [category, setCategory] = useState<(typeof CATS)[number]>("arcade");
  const [embedUrl, setEmbedUrl] = useState("");
  const [featured, setFeatured] = useState(false);
  const [busy, setBusy] = useState(false);

  const load = async (k: string, p: number) => {
    const next = await studioBoard({ data: { key: k, page: p } });
    setBoard(next);
    setPage(p);
    setUnlocked(k);
    setError("");
  };

  const refresh = async () => {
    if (!unlocked) return;
    await load(unlocked, page);
    router.invalidate();
  };

  return (
    <Shell>
      <main className="mx-auto max-w-3xl space-y-8 px-4 py-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Command</p>
          <h1 className="font-display text-4xl font-extrabold">Studio</h1>
          <p className="mt-2 text-muted">
            You approve what the public sees. The shelf pages 24 games at a time, so a thousand titles stay browsable.
          </p>
        </div>

        {!board ? (
          <form
            className="space-y-3 rounded-2xl border border-border bg-surface p-5"
            onSubmit={async (e) => {
              e.preventDefault();
              setBusy(true);
              try {
                await load(key.trim(), 1);
              } catch (err) {
                setError(err instanceof Error ? err.message : "Could not unlock.");
              } finally {
                setBusy(false);
              }
            }}
          >
            <label className="block text-sm font-semibold" htmlFor="key">
              Owner key
            </label>
            <input id="key" value={key} onChange={(e) => setKey(e.target.value)} className="h-11 w-full rounded-xl border border-border bg-bg px-3 outline-none" autoComplete="off" />
            <p className="text-sm text-muted">
              Key for this station: <span className="text-fg">{ownerHint}</span>
            </p>
            {error && <p className="text-sm text-danger">{error}</p>}
            <button disabled={busy} className="h-11 rounded-full bg-primary px-5 text-sm font-semibold text-primary-ink">
              Unlock
            </button>
          </form>
        ) : (
          <>
            <div className="grid grid-cols-3 gap-3 text-center">
              <Stat label="Live" value={board.live} />
              <Stat label="Pending" value={board.pending} />
              <Stat label="Hidden" value={board.hidden} />
            </div>

            <form
              className="space-y-3 rounded-2xl border border-border bg-surface p-5"
              onSubmit={async (e) => {
                e.preventDefault();
                setBusy(true);
                setError("");
                try {
                  await publishLive({
                    data: { key: unlocked, title, blurb, developer, category, embedUrl, featured },
                  });
                  setTitle("");
                  setBlurb("");
                  setDeveloper("");
                  setEmbedUrl("");
                  setFeatured(false);
                  await load(unlocked, 1);
                  router.invalidate();
                } catch (err) {
                  setError(err instanceof Error ? err.message : "Publish failed.");
                } finally {
                  setBusy(false);
                }
              }}
            >
              <h2 className="font-display text-xl font-bold">Put a game live</h2>
              <Field label="Title" value={title} onChange={setTitle} />
              <Field label="Developer or studio" value={developer} onChange={setDeveloper} />
              <label className="block text-sm font-semibold">
                Description
                <textarea value={blurb} onChange={(e) => setBlurb(e.target.value)} className="mt-1 h-24 w-full rounded-xl border border-border bg-bg px-3 py-2 font-normal outline-none" />
              </label>
              <label className="block text-sm font-semibold">
                Deck
                <select value={category} onChange={(e) => setCategory(e.target.value as (typeof CATS)[number])} className="mt-1 h-11 w-full rounded-xl border border-border bg-bg px-3 font-normal">
                  {CATS.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </label>
              <Field label="Embed URL (https, optional)" value={embedUrl} onChange={setEmbedUrl} />
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)} />
                Pin on the home viewport
              </label>
              {error && <p className="text-sm text-danger">{error}</p>}
              <button disabled={busy} className="h-11 rounded-full bg-primary px-5 text-sm font-semibold text-primary-ink">
                Publish live
              </button>
            </form>

            <section className="space-y-2">
              <h2 className="font-display text-xl font-bold">
                Catalog · page {board.page}/{board.pages}
              </h2>
              {board.rows.length === 0 && <p className="text-sm text-muted">No rows yet.</p>}
              {board.rows.map((g) => (
                <Row
                  key={g.id}
                  game={g}
                  onChange={async (patch) => {
                    await setGameState({ data: { key: unlocked, id: g.id, ...patch } });
                    await refresh();
                  }}
                  onRemove={async () => {
                    await removeGame({ data: { key: unlocked, id: g.id } });
                    await refresh();
                  }}
                />
              ))}
              <div className="flex gap-2 pt-2">
                {board.page > 1 && (
                  <button type="button" className="h-10 rounded-full border border-border px-4 text-sm" onClick={() => load(unlocked, board.page - 1)}>
                    Previous
                  </button>
                )}
                {board.page < board.pages && (
                  <button type="button" className="h-10 rounded-full border border-border px-4 text-sm" onClick={() => load(unlocked, board.page + 1)}>
                    Next
                  </button>
                )}
              </div>
            </section>
          </>
        )}
      </main>
    </Shell>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-4">
      <p className="font-display text-2xl font-bold text-accent">{value}</p>
      <p className="text-xs uppercase tracking-wide text-muted">{label}</p>
    </div>
  );
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="block text-sm font-semibold">
      {label}
      <input value={value} onChange={(e) => onChange(e.target.value)} className="mt-1 h-11 w-full rounded-xl border border-border bg-bg px-3 font-normal outline-none" />
    </label>
  );
}

function Row({
  game,
  onChange,
  onRemove,
}: {
  game: GameRow;
  onChange: (patch: { status?: "live" | "hidden" | "pending"; featured?: boolean }) => Promise<void>;
  onRemove: () => Promise<void>;
}) {
  return (
    <div className="rounded-xl border border-border bg-surface px-3 py-3">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <p className="font-semibold">{game.title}</p>
        <p className="text-xs uppercase text-muted">
          {game.status} · {game.category}
        </p>
      </div>
      <p className="text-sm text-muted">{game.developer}</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {game.status !== "live" && (
          <button type="button" className="h-10 rounded-full border border-border px-3 text-sm" onClick={() => onChange({ status: "live" })}>
            Set live
          </button>
        )}
        {game.status !== "hidden" && (
          <button type="button" className="h-10 rounded-full border border-border px-3 text-sm" onClick={() => onChange({ status: "hidden" })}>
            Hide
          </button>
        )}
        <button type="button" className="h-10 rounded-full border border-border px-3 text-sm" onClick={() => onChange({ featured: !game.featured })}>
          {game.featured ? "Unpin" : "Feature"}
        </button>
        <button type="button" className="h-10 rounded-full border border-danger/50 px-3 text-sm text-danger" onClick={() => onRemove()}>
          Remove
        </button>
      </div>
    </div>
  );
}
