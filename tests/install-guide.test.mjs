import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import ts from "typescript";

const source = await readFile(new URL("../src/utils/install-guide.ts", import.meta.url), "utf8");
const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ES2022 } });
const { detectInstallEnvironment, getInstallGuide } = await import(`data:text/javascript;base64,${Buffer.from(outputText).toString("base64")}`);

const chrome = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/140.0.0.0 Safari/537.36";

test("Edge's Chrome and Safari compatibility tokens do not select Chrome instructions", () => {
	const environment = detectInstallEnvironment({ userAgent: `${chrome} Edg/140.0.0.0` });
	assert.equal(environment.browser, "edge");
	assert.match(getInstallGuide(environment).steps.join(" "), /More tools, then Apps/);
	assert.doesNotMatch(getInstallGuide(environment).steps.join(" "), /Cast, save/);
});

test("Chrome gets its own desktop menu path", () => {
	const environment = detectInstallEnvironment({ userAgent: chrome });
	assert.deepEqual(environment, { browser: "chrome", platform: "windows" });
	assert.match(getInstallGuide(environment).steps.join(" "), /Cast, save, and share/);
});

test("client hints distinguish Edge even when its UA resembles Chrome", () => {
	assert.equal(detectInstallEnvironment({ userAgent: chrome, brands: [{ brand: "Chromium" }, { brand: "Microsoft Edge" }] }).browser, "edge");
});

test("Android Chrome and Edge use phone instructions", () => {
	const android = chrome.replace("Windows NT 10.0; Win64; x64", "Linux; Android 14; Pixel 8");
	const environment = detectInstallEnvironment({ userAgent: android });
	assert.equal(environment.platform, "android");
	assert.match(getInstallGuide(environment).steps.join(" "), /Install and create shortcut/);
	const edge = detectInstallEnvironment({ userAgent: `${android} EdgA/140.0.0.0` });
	assert.equal(edge.browser, "edge");
	assert.doesNotMatch(getInstallGuide(edge).steps.join(" "), /More tools|Cast, save/);
});

test("Safari on Mac and iPad desktop mode get different installation paths", () => {
	const userAgent = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 Version/18.0 Safari/605.1.15";
	const mac = detectInstallEnvironment({ userAgent });
	const ipad = detectInstallEnvironment({ userAgent, maxTouchPoints: 5 });
	assert.match(getInstallGuide(mac).steps.join(" "), /Add to Dock/);
	assert.equal(ipad.platform, "ios");
	assert.match(getInstallGuide(ipad).steps.join(" "), /Add to Home Screen/);
});

test("Chrome and Edge on iPhone show the Safari installation route", () => {
	for (const token of ["CriOS/140.0", "EdgiOS/140.0"]) {
		const environment = detectInstallEnvironment({ userAgent: `Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 ${token} Mobile/15E148 Safari/604.1` });
		assert.equal(environment.platform, "ios");
		assert.match(getInstallGuide(environment).steps[0], /Open this timer’s web address in Safari/);
		assert.doesNotMatch(getInstallGuide(environment).steps.join(" "), /Cast, save|More tools/);
	}
});

test("known non-Chrome browsers do not get mislabeled as Chrome", () => {
	for (const token of ["OPR/120.0", "SamsungBrowser/28.0", "Vivaldi/7.0"]) {
		assert.equal(detectInstallEnvironment({ userAgent: `${chrome} ${token}` }).browser, "other");
	}
});

test("Firefox and unknown browsers have usable fallback guidance", () => {
	const firefox = detectInstallEnvironment({ userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:143.0) Gecko/20100101 Firefox/143.0" });
	assert.match(getInstallGuide(firefox).steps.join(" "), /web apps button/);
	assert.equal(detectInstallEnvironment({ userAgent: "" }).browser, "other");
	assert.match(getInstallGuide({ browser: "other", platform: "desktop" }).note, /bookmark/);
});
