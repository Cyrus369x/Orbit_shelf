import { S as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as Route } from "./router-BNAmZ3lm.mjs";
import { t as Shell } from "./shell-DWiRlH28.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/play._slug-BCna_CBx.js
var import_jsx_runtime = require_jsx_runtime();
function PlayPage() {
	const { game, related } = Route.useLoaderData();
	if (!game) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-3xl px-4 py-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl font-bold",
				children: "Not on the shelf"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-muted",
				children: "That title is hidden, still pending, or the link is wrong."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/browse",
				search: {
					q: "",
					category: "all",
					sort: "new",
					page: 1
				},
				className: "mt-4 inline-flex text-primary",
				children: "Back to the shelf"
			})
		]
	}) });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto grid max-w-6xl gap-8 px-4 py-6 lg:grid-cols-[minmax(0,1fr)_280px]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-semibold uppercase tracking-[0.2em] text-primary",
					children: game.category
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-4xl font-extrabold",
					children: game.title
				}),
				game.embed_url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
					title: game.title,
					src: game.embed_url,
					className: "aspect-video w-full rounded-2xl border border-border bg-surface",
					allow: "fullscreen; autoplay"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex aspect-video flex-col items-start justify-end rounded-2xl border border-border bg-surface p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: "/art/hangar.jpg",
							alt: "",
							className: "mb-4 h-24 w-40 rounded-xl object-cover"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-xl font-bold",
							children: "No embed yet"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 max-w-md text-sm text-muted",
							children: "This listing is on the shelf, but it has no playable URL. Add an https embed from the studio when the build is ready."
						})
					]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "space-y-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: game.blurb
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
					className: "text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							k: "Developer",
							v: game.developer
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							k: "Plays",
							v: String(game.plays)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							k: "Status",
							v: "Live"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-lg font-bold",
					children: "Same deck"
				}),
				related.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "No neighbors in this category yet."
				}) : related.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/play/$slug",
					params: { slug: g.slug },
					className: "block text-sm text-primary",
					children: g.title
				}, g.id))
			]
		})]
	}) });
}
function Row({ k, v }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex justify-between border-b border-border py-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
			className: "text-muted",
			children: k
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: v })]
	});
}
//#endregion
export { PlayPage as component };
