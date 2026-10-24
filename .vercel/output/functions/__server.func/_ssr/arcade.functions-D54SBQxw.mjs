import { n as TSS_SERVER_FUNCTION, r as getServerFnById, t as createServerFn } from "./ssr.mjs";
import { a as object, i as number, n as boolean, o as string, t as _enum } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/arcade.functions-D54SBQxw.js
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var ownerHint = "orbit-key";
var categorySlug = _enum([
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
]);
var getCatalogHome = createServerFn({ method: "GET" }).handler(createSsrRpc("1c01a661c949f4efffe2b767829968ff7effb4f122553fa0723d8014a192dfaa"));
var browseInput = object({
	category: string().optional(),
	q: string().optional(),
	sort: _enum([
		"new",
		"plays",
		"title"
	]).optional(),
	page: number().int().min(1).optional()
});
var browseGames = createServerFn({ method: "GET" }).validator((input) => browseInput.parse(input)).handler(createSsrRpc("1cc556692f0a86e9b86e9661c0f1d3ca6a80adc8436ef138a24f79221f8a89ea"));
var getGame = createServerFn({ method: "GET" }).validator((input) => object({ slug: string().min(1).max(80) }).parse(input)).handler(createSsrRpc("c5e52d9345d051d15ec4eedd02bfa363b2f0a82060a10ed972cc5766dd1283b5"));
var gameDraft = object({
	key: string(),
	title: string().min(2).max(80),
	blurb: string().min(8).max(280),
	developer: string().min(2).max(60),
	category: categorySlug,
	embedUrl: string().max(400).optional(),
	featured: boolean().optional()
});
var publishLive = createServerFn({ method: "POST" }).validator((input) => gameDraft.parse(input)).handler(createSsrRpc("932f60626dd1595e4afb83841da3849e88120e7295960570b5f526386a620df4"));
var submitPending = createServerFn({ method: "POST" }).validator((input) => gameDraft.omit({
	key: true,
	featured: true
}).parse(input)).handler(createSsrRpc("daf2e3a71978319f330c4cf7e46030825fa805c2da5ddbffd7ce024b257f8925"));
var studioBoard = createServerFn({ method: "GET" }).validator((input) => object({
	key: string(),
	page: number().int().min(1).optional()
}).parse(input)).handler(createSsrRpc("5162757694d98342936d6af0568925c860560ad7388d3f5535713d5a28350324"));
var setGameState = createServerFn({ method: "POST" }).validator((input) => object({
	key: string(),
	id: number().int(),
	status: _enum([
		"live",
		"hidden",
		"pending"
	]).optional(),
	featured: boolean().optional()
}).parse(input)).handler(createSsrRpc("32e67315927ea5e250a0b80fdbe6eea0256866cafaf3c1544bde70d10a711fbb"));
var removeGame = createServerFn({ method: "POST" }).validator((input) => object({
	key: string(),
	id: number().int()
}).parse(input)).handler(createSsrRpc("13c3f58cbdb7e4bd7f6743aa3dfa2dd6ed20c1a37f103cf8700fb3362edc4581"));
//#endregion
export { publishLive as a, studioBoard as c, ownerHint as i, submitPending as l, getCatalogHome as n, removeGame as o, getGame as r, setGameState as s, browseGames as t };
