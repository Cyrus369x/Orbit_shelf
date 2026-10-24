import { S as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as Route$4 } from "./router-BNAmZ3lm.mjs";
import { t as Shell } from "./shell-DWiRlH28.mjs";
import { t as GameCard } from "./game-card-B4M1Imzu.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DHPfhX_E.js
var import_jsx_runtime = require_jsx_runtime();
function Home() {
	const data = Route$4.useLoaderData();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-6xl space-y-10 px-4 py-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid overflow-hidden rounded-3xl border border-border bg-surface lg:grid-cols-[1.3fr_1fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "/art/hangar.jpg",
					alt: "A dark hangar of game cabinets facing a nebula",
					className: "h-64 w-full object-cover lg:h-full"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col justify-center gap-4 p-6 sm:p-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-semibold uppercase tracking-[0.2em] text-primary",
							children: "Station catalog"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-display text-4xl font-extrabold leading-none sm:text-5xl",
							children: "A shelf built for a thousand games."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-muted",
							children: [
								"Categories, search, and pages are ready. The hangar is empty until you publish. ",
								data.live,
								" live",
								data.pending ? ` · ${data.pending} waiting on you` : "",
								"."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/browse",
								search: {
									q: "",
									page: 1,
									sort: "new",
									category: "all"
								},
								className: "inline-flex h-11 items-center rounded-full bg-primary px-5 text-sm font-semibold text-primary-ink",
								children: "Open the shelf"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/studio",
								className: "inline-flex h-11 items-center rounded-full border border-border px-5 text-sm font-semibold",
								children: "Owner studio"
							})]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mb-4 font-display text-2xl font-bold",
				children: "Decks"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 gap-3 md:grid-cols-5",
				children: data.categories.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/browse",
					search: {
						category: c.slug,
						q: "",
						page: 1,
						sort: "new"
					},
					className: "rounded-2xl border border-border bg-surface p-4 hover:border-primary/50",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-lg font-bold",
							children: c.label
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 line-clamp-2 text-sm text-muted",
							children: c.blurb
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-3 text-xs text-accent",
							children: [c.live_count, " live"]
						})
					]
				}, c.slug))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mb-4 font-display text-2xl font-bold",
				children: "Featured"
			}), data.featured.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, { label: "Nothing is pinned to the viewport yet. Mark a game featured from the studio." }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 gap-3 lg:grid-cols-3",
				children: data.featured.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GameCard, { game: g }, g.id))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-4 flex items-end justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl font-bold",
					children: "Just docked"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/browse",
					search: {
						q: "",
						page: 1,
						sort: "new",
						category: "all"
					},
					className: "text-sm text-primary",
					children: "All live games"
				})]
			}), data.newest.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, { label: "The newest rail fills itself the moment a game goes live." }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 gap-3 lg:grid-cols-3",
				children: data.newest.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GameCard, { game: g }, g.id))
			})] })
		]
	}) });
}
function Empty({ label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "rounded-2xl border border-dashed border-border bg-surface/60 p-8 text-muted",
		children: label
	});
}
//#endregion
export { Home as component };
