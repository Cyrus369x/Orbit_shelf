import { o as __toESM } from "../_runtime.mjs";
import { S as require_jsx_runtime, Y as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { l as submitPending } from "./arcade.functions-D54SBQxw.mjs";
import { t as Shell } from "./shell-DWiRlH28.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/publish-JvP5DfSa.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var CATS = [
	"action",
	"arcade",
	"puzzle",
	"racing",
	"sports",
	"adventure",
	"strategy",
	"io",
	"girls",
	"casual"
];
function Publish() {
	const [title, setTitle] = (0, import_react.useState)("");
	const [blurb, setBlurb] = (0, import_react.useState)("");
	const [developer, setDeveloper] = (0, import_react.useState)("");
	const [category, setCategory] = (0, import_react.useState)("arcade");
	const [embedUrl, setEmbedUrl] = (0, import_react.useState)("");
	const [msg, setMsg] = (0, import_react.useState)("");
	const [err, setErr] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-xl space-y-4 px-4 py-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-semibold uppercase tracking-[0.2em] text-primary",
				children: "Developers"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-4xl font-extrabold",
				children: "Request a berth"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted",
				children: "Send a title and an https embed. It stays pending until the station owner sets it live. Nothing here plays until that happens."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "space-y-3 rounded-2xl border border-border bg-surface p-5",
				onSubmit: async (e) => {
					e.preventDefault();
					setBusy(true);
					setErr("");
					setMsg("");
					try {
						await submitPending({ data: {
							title,
							blurb,
							developer,
							category,
							embedUrl
						} });
						setMsg("Received. It is in the owner queue, not on the public shelf yet.");
						setTitle("");
						setBlurb("");
						setDeveloper("");
						setEmbedUrl("");
					} catch (error) {
						setErr(error instanceof Error ? error.message : "Could not submit.");
					} finally {
						setBusy(false);
					}
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lab, {
						label: "Title",
						value: title,
						onChange: setTitle
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lab, {
						label: "Studio name",
						value: developer,
						onChange: setDeveloper
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block text-sm font-semibold",
						children: ["What it is", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							value: blurb,
							onChange: (e) => setBlurb(e.target.value),
							className: "mt-1 h-24 w-full rounded-xl border border-border bg-bg px-3 py-2 font-normal outline-none"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block text-sm font-semibold",
						children: ["Deck", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							value: category,
							onChange: (e) => setCategory(e.target.value),
							className: "mt-1 h-11 w-full rounded-xl border border-border bg-bg px-3 font-normal",
							children: CATS.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: c }, c))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lab, {
						label: "https embed",
						value: embedUrl,
						onChange: setEmbedUrl
					}),
					err && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-danger",
						children: err
					}),
					msg && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-primary",
						children: msg
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						disabled: busy,
						className: "h-11 rounded-full bg-primary px-5 text-sm font-semibold text-primary-ink",
						children: "Submit for review"
					})
				]
			})
		]
	}) });
}
function Lab({ label, value, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block text-sm font-semibold",
		children: [label, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			value,
			onChange: (e) => onChange(e.target.value),
			className: "mt-1 h-11 w-full rounded-xl border border-border bg-bg px-3 font-normal outline-none"
		})]
	});
}
//#endregion
export { Publish as component };
