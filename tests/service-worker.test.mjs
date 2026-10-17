import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import vm from "node:vm";

const template = await readFile(new URL("../scripts/service-worker.js", import.meta.url), "utf8");
const origin = "https://timer.test";
const config = {
	version: "test-v2",
	audioVersion: "sounds-v1",
	pages: ["/home", "/the-science", "/alternatives"],
	assets: ["/_next/static/current.js", "/icons/icon-192.png"],
	sounds: ["/audio/first.mp3", "/audio/second.mp3"],
};

function harness({ active = false, development = false } = {}) {
	const listeners = new Map();
	const stores = new Map();
	const requests = [];
	const failures = new Set();
	let online = true;
	let skipWaitingCalls = 0;
	let claimCalls = 0;
	const key = (request) => new URL(typeof request === "string" ? request : request.url, origin).href;
	const fetchResource = async (request) => {
		const url = new URL(key(request));
		requests.push(url.pathname);
		if (!online || failures.has(url.pathname)) throw new TypeError("Network unavailable");
		if (url.pathname.startsWith("/audio/")) return new Response(Uint8Array.from([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]), { headers: { "Content-Type": "audio/mpeg" } });
		if (request.headers?.get("RSC") === "1") return new Response("route-specific flight data", { headers: { "Content-Type": "text/x-component" } });
		return new Response(`<html>${url.pathname}</html>`, { headers: { "Content-Type": "text/html" } });
	};
	const caches = {
		async open(name) {
			if (!stores.has(name)) stores.set(name, new Map());
			const entries = stores.get(name);
			return {
				async match(request) { return entries.get(key(request))?.clone(); },
				async put(request, response) { entries.set(key(request), response.clone()); },
				async addAll(resources) {
					const responses = await Promise.all(resources.map(fetchResource));
					if (responses.some((response) => !response.ok || response.status === 206)) throw new Error("Precache failed");
					resources.forEach((request, index) => entries.set(key(request), responses[index]));
				},
			};
		},
		async keys() { return [...stores.keys()]; },
		async delete(name) { return stores.delete(name); },
	};
	class WorkerRequest extends Request {
		constructor(input, init) { super(typeof input === "string" ? new URL(input, origin) : input, init); }
	}
	const context = vm.createContext({
		self: {
			location: { origin },
			registration: { active },
			addEventListener: (type, handler) => listeners.set(type, handler),
			skipWaiting: async () => { skipWaitingCalls++; },
			clients: { claim: async () => { claimCalls++; } },
		},
		caches,
		fetch: fetchResource,
		Request: WorkerRequest,
		Response,
		Headers,
		URL,
	});
	vm.runInContext(template.replace("/* PWA_BUILD_CONFIG */", `const CONFIG = ${JSON.stringify({ ...config, development })};`), context);
	async function dispatch(type, extra = {}) {
		let response;
		const pending = [];
		listeners.get(type)({ ...extra, waitUntil: (promise) => pending.push(promise), respondWith: (promise) => { response = promise; } });
		await Promise.all(pending);
		return response;
	}
	return {
		caches, requests, failures,
		setOnline(value) { online = value; },
		get skipWaitingCalls() { return skipWaitingCalls; },
		get claimCalls() { return claimCalls; },
		dispatch,
		async request(pathname, options) {
			return dispatch("fetch", { request: new WorkerRequest(pathname, options) });
		},
		async message(type) {
			const messages = [];
			await dispatch("message", { data: { type }, ports: [{ postMessage: (message) => messages.push(structuredClone(message)) }] });
			return messages;
		},
	};
}

test("first install saves every page and asset, with no audio download", async () => {
	const worker = harness();
	await worker.dispatch("install");
	await worker.dispatch("activate");
	assert.equal(worker.skipWaitingCalls, 1);
	assert.equal(worker.claimCalls, 1);
	assert.equal(worker.requests.filter((url) => url.startsWith("/audio/")).length, 0);
	assert.deepEqual(await worker.message("GET_STATUS"), [{ type: "STATUS", offlineReady: true, soundsReady: false, preview: false }]);
	worker.setOnline(false);
	for (const page of config.pages) assert.match(await (await worker.request(page)).text(), new RegExp(page));
	assert.match(await (await worker.request("/?utm_source=test")).text(), /\/home/);
	assert.equal((await worker.request(config.assets[0])).status, 200);
});

test("RSC responses never overwrite cached HTML and offline client navigation receives HTML", async () => {
	const worker = harness();
	await worker.dispatch("install");
	const online = await worker.request("/alternatives?_rsc=abc", { headers: { RSC: "1", "Next-Router-Prefetch": "1" } });
	assert.equal(online.headers.get("Content-Type"), "text/x-component");
	worker.setOnline(false);
	const offline = await worker.request("/alternatives?_rsc=def", { headers: { RSC: "1" } });
	assert.equal(offline.headers.get("Content-Type"), "text/html");
	assert.match(await (await worker.request("/alternatives")).text(), /<html>/);
});

test("failed update cannot replace the working offline version", async () => {
	const worker = harness({ active: true });
	await (await worker.caches.open("boxed-breathing-app-v1")).put("/home", new Response("working timer"));
	worker.failures.add(config.assets[0]);
	await assert.rejects(worker.dispatch("install"));
	assert.equal(worker.skipWaitingCalls, 0);
	assert.equal(await (await (await worker.caches.open("boxed-breathing-app-v1")).match("/home")).text(), "working timer");
});

test("updates wait for an explicit refresh request", async () => {
	const worker = harness({ active: true });
	await worker.dispatch("install");
	assert.equal(worker.skipWaitingCalls, 0);
	await worker.message("SKIP_WAITING");
	assert.equal(worker.skipWaitingCalls, 1);
});

test("sound downloads resume after failure and become playable offline", async () => {
	const worker = harness();
	await worker.dispatch("install");
	worker.failures.add(config.sounds[1]);
	const failed = await worker.message("DOWNLOAD_SOUNDS");
	assert.equal(failed.at(-1).type, "SOUNDS_ERROR");
	assert.equal((await worker.message("GET_STATUS"))[0].soundsReady, false);
	worker.failures.clear();
	const completed = await worker.message("DOWNLOAD_SOUNDS");
	assert.equal(completed.at(-1).type, "SOUNDS_READY");
	assert.equal(worker.requests.filter((path) => path === config.sounds[0]).length, 1);
	assert.equal((await worker.message("GET_STATUS"))[0].soundsReady, true);
	worker.setOnline(false);
	const sound = await worker.request(config.sounds[0]);
	assert.equal(sound.status, 200);
	assert.equal((await sound.arrayBuffer()).byteLength, 10);
});

test("cached audio handles closed, open, suffix, and invalid range requests", async () => {
	const worker = harness();
	await worker.message("DOWNLOAD_SOUNDS");
	worker.setOnline(false);
	for (const [range, expected, contentRange] of [
		["bytes=0-1", [0, 1], "bytes 0-1/10"],
		["bytes=7-", [7, 8, 9], "bytes 7-9/10"],
		["bytes=-3", [7, 8, 9], "bytes 7-9/10"],
		["bytes=8-999", [8, 9], "bytes 8-9/10"],
	]) {
		const response = await worker.request(config.sounds[0], { headers: { Range: range } });
		assert.equal(response.status, 206);
		assert.equal(response.headers.get("Content-Range"), contentRange);
		assert.equal(response.headers.get("Content-Length"), String(expected.length));
		assert.deepEqual([...new Uint8Array(await response.arrayBuffer())], expected);
	}
	for (const range of ["bytes=10-", "bytes=5-2", "bytes=-0", "bytes=0-1,4-5", "invalid"]) {
		const response = await worker.request(config.sounds[0], { headers: { Range: range } });
		assert.equal(response.status, 416);
		assert.equal(response.headers.get("Content-Range"), "bytes */10");
	}
});

test("activation retains the previous build for other windows and preserves downloaded sounds", async () => {
	const worker = harness({ active: true });
	await worker.caches.open("unrelated-app");
	await worker.caches.open("boxed-breathing-app-ancient");
	await (await worker.caches.open("boxed-breathing-app-previous")).put("/_next/static/previous.js", new Response("previous script"));
	await (await worker.caches.open("boxed-breathing-app-previous")).put("/home", new Response("previous page"));
	await worker.caches.open("boxed-breathing-app-failed-install");
	await worker.caches.open("boxed-breathing-audio-obsolete");
	await worker.message("DOWNLOAD_SOUNDS");
	await worker.dispatch("install");
	await worker.dispatch("activate");
	const names = await worker.caches.keys();
	assert.ok(names.includes("unrelated-app"));
	assert.ok(names.includes("boxed-breathing-app-previous"));
	assert.ok(!names.includes("boxed-breathing-app-ancient"));
	assert.ok(!names.includes("boxed-breathing-app-failed-install"));
	assert.ok(!names.includes("boxed-breathing-audio-obsolete"));
	assert.equal((await worker.message("GET_STATUS"))[0].soundsReady, true);
	worker.setOnline(false);
	assert.equal(await (await worker.request("/_next/static/previous.js")).text(), "previous script");
});

test("external links, writes, analytics, and unrelated paths bypass the worker", async () => {
	const worker = harness();
	for (const [url, options] of [
		["https://paypal.me/mehdicharife", undefined],
		["/home", { method: "POST" }],
		["/_vercel/insights/script.js", undefined],
		["/ownership", undefined],
		["/unknown", undefined],
	]) assert.equal(await worker.request(url, options), undefined);
});

test("development supports sound downloads without caching pages or blocking hot reload", async () => {
	const worker = harness({ active: true, development: true });
	await worker.dispatch("install");
	await worker.dispatch("activate");
	assert.equal(worker.skipWaitingCalls, 1);
	assert.equal(worker.requests.length, 0);
	assert.equal(await worker.request("/home"), undefined);
	assert.equal(await worker.request("/_next/static/current.js"), undefined);
	assert.deepEqual(await worker.message("GET_STATUS"), [{ type: "STATUS", offlineReady: false, soundsReady: false, preview: true }]);
	assert.equal((await worker.message("DOWNLOAD_SOUNDS")).at(-1).type, "SOUNDS_READY");
	worker.setOnline(false);
	assert.equal((await worker.request(config.sounds[0])).status, 200);
	assert.equal((await worker.message("GET_STATUS"))[0].soundsReady, true);
});
