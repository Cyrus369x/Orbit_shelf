import { S as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/game-card-B4M1Imzu.js
var import_jsx_runtime = require_jsx_runtime();
function GameCard({ game }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/play/$slug",
		params: { slug: game.slug },
		className: "group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface transition hover:-translate-y-0.5 hover:border-primary/60",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative aspect-[16/10] bg-surface-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: "/art/hangar.jpg",
				alt: "",
				className: "h-full w-full object-cover opacity-70"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "absolute bottom-3 left-3 rounded-full bg-bg/80 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-primary",
				children: game.category
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-1 p-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-baseline justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display text-base font-bold leading-tight",
					children: game.title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "shrink-0 text-xs text-muted",
					children: [game.plays, " plays"]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "line-clamp-2 text-sm text-muted",
				children: game.blurb
			})]
		})]
	});
}
//#endregion
export { GameCard as t };
