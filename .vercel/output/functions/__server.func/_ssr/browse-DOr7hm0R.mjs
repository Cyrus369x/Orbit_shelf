import { S as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as Route$3 } from "./router-BNAmZ3lm.mjs";
import { t as Shell } from "./shell-DWiRlH28.mjs";
import { t as GameCard } from "./game-card-B4M1Imzu.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/browse-DOr7hm0R.js
var import_jsx_runtime = require_jsx_runtime();
function Browse() {
	const { q, category, sort, page } = Route$3.useSearch();
	const { board, categories } = Route$3.useLoaderData();
	const current = category || "all";
	const sortNow = sort || "new";
	const pageNow = page && page > 0 ? page : 1;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-6xl space-y-6 px-4 py-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-end justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-semibold uppercase tracking-[0.2em] text-primary",
					children: "Shelf"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "font-display text-4xl font-extrabold",
					children: [board.total, " live"]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex gap-2 text-sm",
					children: [
						["new", "Newest"],
						["plays", "Most played"],
						["title", "A–Z"]
					].map(([id, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/browse",
						search: {
							q: q ?? "",
							category: current,
							sort: id,
							page: 1
						},
						className: `rounded-full px-3 py-2 ${sortNow === id ? "bg-primary text-primary-ink" : "border border-border"}`,
						children: label
					}, id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				className: "flex gap-2 overflow-x-auto pb-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
					to: { category: "all" },
					active: current === "all",
					q: q ?? "",
					sort: sortNow,
					children: "All decks"
				}), categories.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
					to: { category: c.slug },
					active: current === c.slug,
					q: q ?? "",
					sort: sortNow,
					children: c.label
				}, c.slug))]
			}),
			q ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-muted",
				children: [
					"Matching “",
					q,
					"”"
				]
			}) : null,
			board.rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "rounded-2xl border border-dashed border-border p-8 text-muted",
				children: "This deck is empty. Publish from the studio, or approve a developer submission."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 gap-3 lg:grid-cols-3",
				children: board.rows.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GameCard, { game: g }, g.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-muted",
					children: [
						"Page ",
						board.page,
						" of ",
						board.pages
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [pageNow > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/browse",
						search: {
							q: q ?? "",
							category: current,
							sort: sortNow,
							page: pageNow - 1
						},
						className: "rounded-full border border-border px-4 py-2",
						children: "Previous"
					}), pageNow < board.pages && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/browse",
						search: {
							q: q ?? "",
							category: current,
							sort: sortNow,
							page: pageNow + 1
						},
						className: "rounded-full border border-border px-4 py-2",
						children: "Next"
					})]
				})]
			})
		]
	}) });
}
function Chip({ children, active, q, sort, to }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: "/browse",
		search: {
			q,
			category: to.category,
			sort,
			page: 1
		},
		className: `h-11 shrink-0 rounded-full px-4 text-sm font-semibold leading-[2.75rem] ${active ? "bg-primary text-primary-ink" : "border border-border bg-surface"}`,
		children
	});
}
//#endregion
export { Browse as component };
