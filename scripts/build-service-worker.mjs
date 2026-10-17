import { createHash } from "node:crypto";
import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const development = process.argv.includes("--development");

async function listFiles(directory) {
	const entries = await readdir(directory, { withFileTypes: true });
	const files = await Promise.all(entries.map(async (entry) => {
		const filename = path.join(directory, entry.name);
		return entry.isDirectory() ? listFiles(filename) : [filename];
	}));
	return files.flat().sort();
}

const toPublicUrl = (filename, directory) =>
	"/" + path.relative(directory, filename).split(path.sep).join("/");

const publicDirectory = path.join(root, "public");
const staticDirectory = path.join(root, ".next", "static");
const staticFiles = development ? [] : (await listFiles(staticDirectory)).filter((filename) => !filename.endsWith(".map"));
const icons = await listFiles(path.join(publicDirectory, "icons"));
const audioFiles = await listFiles(path.join(publicDirectory, "audio"));
const template = await readFile(path.join(root, "scripts", "service-worker.js"), "utf8");
const buildId = development ? "development" : (await readFile(path.join(root, ".next", "BUILD_ID"), "utf8")).trim();

// A new cache for every deployment; audio survives deployments until its files change.
const versionHash = createHash("sha256").update(buildId).update(template);
for (const filename of icons) versionHash.update(await readFile(filename));
const audioHash = createHash("sha256");
for (const filename of audioFiles) {
	audioHash.update(toPublicUrl(filename, publicDirectory)).update(await readFile(filename));
}

const config = {
	development,
	version: versionHash.digest("hex").slice(0, 16),
	audioVersion: audioHash.digest("hex").slice(0, 16),
	pages: development ? [] : ["/home", "/the-science", "/alternatives"],
	assets: development ? [] : [
		"/manifest.webmanifest",
		"/favicon.ico",
		...icons.map((filename) => toPublicUrl(filename, publicDirectory)),
		...staticFiles.map((filename) => "/_next/static" + toPublicUrl(filename, staticDirectory)),
	],
	sounds: audioFiles.map((filename) => toPublicUrl(filename, publicDirectory)),
};

const worker = template.replace("/* PWA_BUILD_CONFIG */", `const CONFIG = ${JSON.stringify(config)};`);
await writeFile(path.join(publicDirectory, development ? "sw-dev.js" : "sw.js"), worker);
console.log(`Generated offline worker ${config.version}: ${config.pages.length} pages, ${config.assets.length} assets, ${config.sounds.length} optional sounds.`);
