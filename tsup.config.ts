import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.tsx"],
  clean: true,
  sourcemap: true,
  minify: true,
  dts: true,
  format: ["cjs", "esm"],
  treeshake: true
});
