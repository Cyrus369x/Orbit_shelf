import { o as __toESM } from "../_runtime.mjs";
import { S as require_jsx_runtime, Y as require_react, b as useNavigate, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as Search } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/shell-DWiRlH28.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Shell({ children }) {
	const [q, setQ] = (0, import_react.useState)("");
	const nav = useNavigate();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-bg/80 text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "sticky top-0 z-30 border-b border-border bg-bg/85 backdrop-blur",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-6xl items-center gap-3 px-4 py-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/",
							className: "flex items-center gap-2 font-display text-lg font-extrabold tracking-wide text-primary",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: "/art/emblem.jpg",
								alt: "",
								className: "size-8 rounded-full object-cover"
							}), "Orbit Shelf"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							className: "ml-auto flex min-w-0 flex-1 max-w-md items-center gap-2 rounded-full border border-border bg-surface px-3",
							onSubmit: (e) => {
								e.preventDefault();
								nav({
									to: "/browse",
									search: {
										q: q.trim(),
										page: 1,
										sort: "new",
										category: "all"
									}
								});
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-4 shrink-0 text-muted" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: q,
								onChange: (e) => setQ(e.target.value),
								placeholder: "Search the shelf",
								className: "h-11 w-full bg-transparent text-sm outline-none placeholder:text-muted",
								"aria-label": "Search games"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/studio",
							className: "hidden h-11 items-center rounded-full bg-primary px-4 text-sm font-semibold text-primary-ink sm:inline-flex",
							children: "Studio"
						})
					]
				})
			}),
			children,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
				className: "mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-10 text-sm text-muted",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Orbit Shelf · a station for browser games" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "flex gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/publish",
						className: "text-primary",
						children: "Submit a game"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/studio",
						className: "text-primary sm:hidden",
						children: "Studio"
					})]
				})]
			})
		]
	});
}
//#endregion
export { Shell as t };
