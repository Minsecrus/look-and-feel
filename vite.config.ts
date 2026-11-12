import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";

export default defineConfig({
  base: "/look-and-feel/",
  plugins: [reactRouter()],
  resolve: {
    tsconfigPaths: true,
  },
});
