import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: ["react-redux"], // Add react-redux here
    },
  },
  optimizeDeps: {
    include: ["react-redux"],
  },
  server: {
    fs: {
      allow: [".."],
    },
  },
});
