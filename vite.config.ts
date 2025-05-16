import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { configDefaults } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // ✅ Enables `describe`, `test`, and `expect`
    setupFiles: "./tests/setup.ts", // ✅ Load Testing Library matchers
    environment: "jsdom", // ✅ Simulates the browser for React tests
    exclude: [...configDefaults.exclude, "node_modules/**"],
    include: ['**/*.test.tsx']  // basic default,
  },
  build: {
    outDir: 'dist' // Should be relative to project root, NOT inside src/
  }
});




