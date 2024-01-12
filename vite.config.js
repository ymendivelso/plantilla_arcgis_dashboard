import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const config = {
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1500
  },
  server: {
    open: true
  },
  esbuild: {
    jsxFactory: "React.createElement",
    jsxFragment: "React.Fragment",
  },
};

export default defineConfig(config);
