/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": "/src",
      "@components": "/src/components",
    },
  },
  test: {
    environment: 'jsdom',
    globals: true, 
    css: true,
    setupFiles: './src/test/setup.ts'
  }, 
  build: {
    chunkSizeWarningLimit: 1000
  }
});
