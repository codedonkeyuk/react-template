import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import siteConfig from "./site-config.json" with { type: "json" };
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,json}"],
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        skipWaiting: true,
        navigateFallback: "index.html",
      },
      manifest: {
        name: siteConfig.appName,
        short_name: siteConfig.shortName,
        theme_color: siteConfig.themeColor,
        background_color: siteConfig.backgroundColor,
        display: "standalone",
        start_url: "/",
      },
      pwaAssets: {
        disabled: false,
        config: true,
      },
    }),
    {
      name: "native-html-transform",
      transformIndexHtml(html) {
        return html
          .replace(/<%- title %>/g, siteConfig.appName)
          .replace(/<%- metaDescription %>/g, siteConfig.metaDescription)
          .replace(/<%- publicSiteAddress %>/g, siteConfig.publicSiteAddress);
      },
    },
  ],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.tsx",
  },
});
