import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  envDir: ".", // Ensure Vite looks for .env in the root directory

  server: {
    fs: {
      strict: false,
    },
  },
  build: {
    outDir: "dist",
  },
});
