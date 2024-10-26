import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "src/",

  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        post: resolve(__dirname, "src/post.html"),
        search: resolve(__dirname, "src/search.html"),
        favorites: resolve(__dirname, "src/favorites.html"),
      },
    },
  },
});
