import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), svgr()],
  resolve: {
    alias: {
      assets: path.resolve(__dirname, "src/assets"),
      components: path.resolve(__dirname, "src/components"),
      common: path.resolve(__dirname, "src/common"),
      generated: path.resolve(__dirname, "src/generated"),
      hooks: path.resolve(__dirname, "src/hooks"),
      views: path.resolve(__dirname, "src/views"),
    },
  },
});
