// node-pty macOS prebuilds ship spawn-helper without the exec bit
// (upstream microsoft/node-pty#850, pi-web issue #4). Without +x,
// opening a terminal fails with a posix_spawnp error. Runs on every
// install; safe no-op on other platforms or when the file is absent.
import { chmodSync, existsSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";

try {
	if (process.platform !== "darwin") process.exit(0);
	const require = createRequire(import.meta.url);
	const root = dirname(require.resolve("node-pty/package.json"));
	const helper = join(root, "prebuilds", `${process.platform}-${process.arch}`, "spawn-helper");
	if (existsSync(helper)) {
		chmodSync(helper, 0o755);
		console.log(`[postinstall] +x ${helper}`);
	}
} catch (error) {
	console.warn(`[postinstall] skip node-pty spawn-helper fix: ${error?.message ?? error}`);
}
