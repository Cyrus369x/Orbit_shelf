import { Link } from "@tanstack/react-router";
import type { GameRow } from "@/lib/arcade.functions";

export function GameCard({ game }: { game: GameRow }) {
  return (
    <Link
      to="/play/$slug"
      params={{ slug: game.slug }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface transition hover:-translate-y-0.5 hover:border-primary/60"
    >
      <div className="relative aspect-[16/10] bg-surface-2">
        <img src="/art/hangar.jpg" alt="" className="h-full w-full object-cover opacity-70" />
        <span className="absolute bottom-3 left-3 rounded-full bg-bg/80 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
          {game.category}
        </span>
      </div>
      <div className="space-y-1 p-3">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="font-display text-base font-bold leading-tight">{game.title}</h3>
          <span className="shrink-0 text-xs text-muted">{game.plays} plays</span>
        </div>
        <p className="line-clamp-2 text-sm text-muted">{game.blurb}</p>
      </div>
    </Link>
  );
}
