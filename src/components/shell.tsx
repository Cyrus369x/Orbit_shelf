import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Search } from "lucide-react";

export function Shell({ children }: { children: React.ReactNode }) {
  const [q, setQ] = useState("");
  const nav = useNavigate();

  return (
    <div className="min-h-screen bg-bg/80 text-fg">
      <header className="sticky top-0 z-30 border-b border-border bg-bg/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
          <Link to="/" className="flex items-center gap-2 font-display text-lg font-extrabold tracking-wide text-primary">
            <img src="/art/emblem.jpg" alt="" className="size-8 rounded-full object-cover" />
            Orbit Shelf
          </Link>
          <form
            className="ml-auto flex min-w-0 flex-1 max-w-md items-center gap-2 rounded-full border border-border bg-surface px-3"
            onSubmit={(e) => {
              e.preventDefault();
              nav({ to: "/browse", search: { q: q.trim(), page: 1, sort: "new", category: "all" } });
            }}
          >
            <Search className="size-4 shrink-0 text-muted" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search the shelf"
              className="h-11 w-full bg-transparent text-sm outline-none placeholder:text-muted"
              aria-label="Search games"
            />
          </form>
          <Link to="/studio" className="hidden h-11 items-center rounded-full bg-primary px-4 text-sm font-semibold text-primary-ink sm:inline-flex">
            Studio
          </Link>
        </div>
      </header>
      {children}
      <footer className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-10 text-sm text-muted">
        <span>Orbit Shelf · a station for browser games</span>
        <span className="flex gap-4">
          <Link to="/publish" className="text-primary">
            Submit a game
          </Link>
          <Link to="/studio" className="text-primary sm:hidden">
            Studio
          </Link>
        </span>
      </footer>
    </div>
  );
}
