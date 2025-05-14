import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { configDefaults } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // ✅ Enables `describe`, `test`, and `expect`
    setupFiles: "./tests/setupTests.ts", // ✅ Load Testing Library matchers
    environment: "jsdom", // ✅ Simulates the browser for React tests
    exclude: [...configDefaults.exclude, "node_modules/**"],
  },
  build: {
    outDir: 'dist' // Should be relative to project root, NOT inside src/
  }
});
