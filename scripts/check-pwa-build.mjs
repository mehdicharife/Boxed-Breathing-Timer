import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { readFile } from "node:fs/promises";
import { createServer } from "node:net";
import { setTimeout as delay } from "node:timers/promises";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const workerSource = await readFile(new URL("../public/sw.js", import.meta.url), "utf8");
const config = JSON.parse(workerSource.match(/^const CONFIG = (.+);$/m)[1]);
const socket = createServer();
await new Promise((resolve) => socket.listen(0, "127.0.0.1", resolve));
const port = socket.address().port;
await new Promise((resolve) => socket.close(resolve));
const origin = `http://127.0.0.1:${port}`;
const server = spawn(process.execPath, [fileURLToPath(new URL("../node_modules/next/dist/bin/next", import.meta.url)), "start", "--hostname", "127.0.0.1", "--port", String(port)], { cwd: root, stdio: ["ignore", "pipe", "pipe"], windowsHide: true });
let logs = "";
server.stdout.on("data", (data) => { logs = (logs + data).slice(-4000); });
server.stderr.on("data", (data) => { logs = (logs + data).slice(-4000); });

try {
	let ready = false;
	for (let attempt = 0; attempt < 100; attempt++) {
		if (server.exitCode !== null || server.signalCode !== null) throw new Error(`Production server exited: ${logs}`);
		try { ready = (await fetch(`${origin}/home`)).ok; } catch { /* Wait for the owned server to listen. */ }
		if (ready) break;
		await delay(100);
	}
	assert.ok(ready, `Production server did not start: ${logs}`);
	const sw = await fetch(`${origin}/sw.js`);
	assert.equal(sw.status, 200);
	assert.match(sw.headers.get("Content-Type"), /javascript/);
	assert.match(sw.headers.get("Cache-Control"), /no-store/);
	assert.equal(sw.headers.get("Service-Worker-Allowed"), "/");
	assert.equal(await sw.text(), workerSource);

	const manifest = await (await fetch(`${origin}/manifest.webmanifest`)).json();
	assert.equal(manifest.start_url, "/home");
	assert.equal(manifest.scope, "/");
	assert.equal(manifest.display, "standalone");
	assert.ok(manifest.icons.some((icon) => icon.purpose === "maskable"));
	for (const icon of manifest.icons) {
		const bytes = Buffer.from(await (await fetch(origin + icon.src)).arrayBuffer());
		assert.equal(bytes.readUInt32BE(16), Number(icon.sizes.split("x")[0]));
		assert.equal(bytes.readUInt32BE(20), Number(icon.sizes.split("x")[1]));
	}

	// Fetch every precache entry as installation would, checking page resource coverage.
	const precached = new Set([...config.pages, ...config.assets]);
	let totalBytes = 0;
	for (const pathname of precached) {
		const response = await fetch(origin + pathname, { cache: "reload" });
		assert.equal(response.status, 200, `Offline resource must load: ${pathname}`);
		const bytes = await response.arrayBuffer();
		totalBytes += bytes.byteLength;
		if (config.pages.includes(pathname)) {
			assert.match(response.headers.get("Content-Type"), /text\/html/);
			const html = new TextDecoder().decode(bytes);
			for (const [, asset] of html.matchAll(/(?:src|href)="(\/_next\/static\/[^"?]+)/g)) {
				assert.ok(precached.has(asset.replaceAll("&amp;", "&")), `Missing page dependency: ${asset}`);
			}
		}
	}
	for (const pathname of config.sounds) {
		const response = await fetch(origin + pathname, { headers: { Range: "bytes=0-1" } });
		assert.equal(response.status, 206, `Audio must support byte ranges: ${pathname}`);
		assert.match(response.headers.get("Content-Type"), /audio/);
		assert.equal((await response.arrayBuffer()).byteLength, 2);
	}
	console.log(`PWA build passed: manifest and icons, worker headers, ${precached.size} offline resources (${(totalBytes / 1_000_000).toFixed(2)} MB), and ${config.sounds.length} audio URLs.`);
} finally {
	server.kill();
	await new Promise((resolve) => {
		if (server.exitCode !== null || server.signalCode !== null) resolve();
		else server.once("exit", resolve);
	});
}
