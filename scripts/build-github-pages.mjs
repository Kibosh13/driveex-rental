import { spawnSync } from "node:child_process";
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const repositoryName =
  process.env.GITHUB_REPOSITORY?.split("/").filter(Boolean).at(-1) ??
  "driveex-rental";
const basePath = repositoryName ? `/${repositoryName}` : "";
const nextCli = fileURLToPath(
  new URL("../node_modules/next/dist/bin/next", import.meta.url),
);

const result = spawnSync(process.execPath, [nextCli, "build"], {
  stdio: "inherit",
  env: {
    ...process.env,
    GITHUB_PAGES: "true",
    GITHUB_PAGES_BASE_PATH: basePath,
  },
});

if (result.status !== 0) {
  process.exit(result.status ?? 1);
}

writeFileSync("out/.nojekyll", "");
writeFileSync("out/robots.txt", "User-agent: *\nDisallow: /\n");

console.log(`GitHub Pages export ready in out${basePath || "/"}.`);
