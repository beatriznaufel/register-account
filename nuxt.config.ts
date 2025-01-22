export default defineNuxtConfig({
  modules: ["@nuxt/ui"],
  devServer: {
    port: 3001,
  },
  devtools: { enabled: true },
  compatibilityDate: "2025-01-17",
  runtimeConfig: {
    public: {
      apiBaseUrl:
        process.env.NUXT_PUBLIC_API_BASE_URL || "http://localhost:3000",
    },
  },
});
