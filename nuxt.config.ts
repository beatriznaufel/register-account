export default defineNuxtConfig({
  modules: ["@nuxt/ui", "@nuxtjs/tailwindcss"],
  devServer: {
    port: 3001,
  },
  ssr: true,
  pages: true,
  devtools: { enabled: true },
  compatibilityDate: "2025-01-17",
  runtimeConfig: {
    public: {
      apiBaseUrl:
        process.env.NUXT_PUBLIC_API_BASE_URL || "http://localhost:3000",
    },
  },
});
