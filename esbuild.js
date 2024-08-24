const esbuild = require("esbuild");

esbuild
  .build({
    entryPoints: ["src/**/*.ts"],
    outdir: "dist",
    outExtension: {
      ".js": ".mjs",
    },
    outbase: "src",
    bundle: true,
    minify: true,
    treeShaking: true,
    sourcemap: true,
    splitting: true,
    platform: "node",
    format: "esm",
    target: "node16.20.2",
    plugins: [],
    banner: {
      js: "import { createRequire } from 'module';const require = createRequire(import.meta.url);",
    },
  })
  .catch(() => process.exit(1));