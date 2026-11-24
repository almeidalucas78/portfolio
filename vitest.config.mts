import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  resolve: {
    // Mesmo alias do tsconfig: "@/lib/metrics" aponta para "src/lib/metrics".
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
  test: {
    // jsdom simula o navegador (document, window) para testar componentes.
    environment: "jsdom",
    include: ["src/**/*.test.{ts,tsx}"],
  },
});
