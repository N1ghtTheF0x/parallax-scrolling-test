import { defineConfig } from "tsup"

export default defineConfig({
    entry: ["source/main.ts"],
    target: "chrome140",
    platform: "browser",
    clean: true,
    publicDir: true,
    sourcemap: true,
    format: "esm"
})