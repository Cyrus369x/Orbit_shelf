import { o as __toESM } from "../_runtime.mjs";
import { S as require_jsx_runtime, Y as require_react, x as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as publishLive, c as studioBoard, i as ownerHint, o as removeGame, s as setGameState } from "./arcade.functions-D54SBQxw.mjs";
import { t as Shell } from "./shell-DWiRlH28.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/studio-oqXMRgiw.js
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
function Studio() {
	const router = useRouter();
	const [key, setKey] = (0, import_react.useState)("");
	const [unlocked, setUnlocked] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)("");
	const [page, setPage] = (0, import_react.useState)(1);
	const [board, setBoard] = (0, import_react.useState)(null);
	const [title, setTitle] = (0, import_react.useState)("");
	const [blurb, setBlurb] = (0, import_react.useState)("");
	const [developer, setDeveloper] = (0, import_react.useState)("");
	const [category, setCategory] = (0, import_react.useState)("arcade");
	const [embedUrl, setEmbedUrl] = (0, import_react.useState)("");
	const [featured, setFeatured] = (0, import_react.useState)(false);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const load = async (k, p) => {
		const next = await studioBoard({ data: {
			key: k,
			page: p
		} });
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-3xl space-y-8 px-4 py-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-semibold uppercase tracking-[0.2em] text-primary",
				children: "Command"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-4xl font-extrabold",
				children: "Studio"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-muted",
				children: "You approve what the public sees. The shelf pages 24 games at a time, so a thousand titles stay browsable."
			})
		] }), !board ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "space-y-3 rounded-2xl border border-border bg-surface p-5",
			onSubmit: async (e) => {
				e.preventDefault();
				setBusy(true);
				try {
					await load(key.trim(), 1);
				} catch (err) {
					setError(err instanceof Error ? err.message : "Could not unlock.");
				} finally {
					setBusy(false);
				}
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					className: "block text-sm font-semibold",
					htmlFor: "key",
					children: "Owner key"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					id: "key",
					value: key,
					onChange: (e) => setKey(e.target.value),
					className: "h-11 w-full rounded-xl border border-border bg-bg px-3 outline-none",
					autoComplete: "off"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-muted",
					children: ["Key for this station: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-fg",
						children: ownerHint
					})]
				}),
				error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-danger",
					children: error
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					disabled: busy,
					className: "h-11 rounded-full bg-primary px-5 text-sm font-semibold text-primary-ink",
					children: "Unlock"
				})
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-3 gap-3 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Live",
						value: board.live
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Pending",
						value: board.pending
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Hidden",
						value: board.hidden
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "space-y-3 rounded-2xl border border-border bg-surface p-5",
				onSubmit: async (e) => {
					e.preventDefault();
					setBusy(true);
					setError("");
					try {
						await publishLive({ data: {
							key: unlocked,
							title,
							blurb,
							developer,
							category,
							embedUrl,
							featured
						} });
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
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl font-bold",
						children: "Put a game live"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Title",
						value: title,
						onChange: setTitle
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Developer or studio",
						value: developer,
						onChange: setDeveloper
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block text-sm font-semibold",
						children: ["Description", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
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
							children: CATS.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: c,
								children: c
							}, c))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Embed URL (https, optional)",
						value: embedUrl,
						onChange: setEmbedUrl
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex items-center gap-2 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							checked: featured,
							onChange: (e) => setFeatured(e.target.checked)
						}), "Pin on the home viewport"]
					}),
					error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-danger",
						children: error
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						disabled: busy,
						className: "h-11 rounded-full bg-primary px-5 text-sm font-semibold text-primary-ink",
						children: "Publish live"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "font-display text-xl font-bold",
						children: [
							"Catalog · page ",
							board.page,
							"/",
							board.pages
						]
					}),
					board.rows.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "No rows yet."
					}),
					board.rows.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						game: g,
						onChange: async (patch) => {
							await setGameState({ data: {
								key: unlocked,
								id: g.id,
								...patch
							} });
							await refresh();
						},
						onRemove: async () => {
							await removeGame({ data: {
								key: unlocked,
								id: g.id
							} });
							await refresh();
						}
					}, g.id)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2 pt-2",
						children: [board.page > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "h-10 rounded-full border border-border px-4 text-sm",
							onClick: () => load(unlocked, board.page - 1),
							children: "Previous"
						}), board.page < board.pages && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "h-10 rounded-full border border-border px-4 text-sm",
							onClick: () => load(unlocked, board.page + 1),
							children: "Next"
						})]
					})
				]
			})
		] })]
	}) });
}
function Stat({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl border border-border bg-surface p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-display text-2xl font-bold text-accent",
			children: value
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs uppercase tracking-wide text-muted",
			children: label
		})]
	});
}
function Field({ label, value, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block text-sm font-semibold",
		children: [label, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			value,
			onChange: (e) => onChange(e.target.value),
			className: "mt-1 h-11 w-full rounded-xl border border-border bg-bg px-3 font-normal outline-none"
		})]
	});
}
function Row({ game, onChange, onRemove }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border border-border bg-surface px-3 py-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-baseline justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-semibold",
					children: game.title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs uppercase text-muted",
					children: [
						game.status,
						" · ",
						game.category
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: game.developer
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-2 flex flex-wrap gap-2",
				children: [
					game.status !== "live" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "h-10 rounded-full border border-border px-3 text-sm",
						onClick: () => onChange({ status: "live" }),
						children: "Set live"
					}),
					game.status !== "hidden" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "h-10 rounded-full border border-border px-3 text-sm",
						onClick: () => onChange({ status: "hidden" }),
						children: "Hide"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "h-10 rounded-full border border-border px-3 text-sm",
						onClick: () => onChange({ featured: !game.featured }),
						children: game.featured ? "Unpin" : "Feature"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "h-10 rounded-full border border-danger/50 px-3 text-sm text-danger",
						onClick: () => onRemove(),
						children: "Remove"
					})
				]
			})
		]
	});
}
//#endregion
export { Studio as component };
