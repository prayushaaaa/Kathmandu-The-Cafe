import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url)); // Correct way to use __dirname in ESM

export default defineConfig({
  plugins: [react(), tailwindcss()], // Removed @tailwindcss/vite (not needed)
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // Corrected path alias
    },
  },
});
