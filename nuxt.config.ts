export default defineNuxtConfig({
  modules: ['@nuxt/ui', '@nuxtjs/tailwindcss'],
  devServer: {
    port: 3001,
  },
  ssr: true,
  pages: true,
  runtimeConfig: {
    public: {
      apiBaseUrl:
        (import.meta.env.NUXT_PUBLIC_API_BASE_URL as string)
        || 'http://localhost:3000',
    },
  },
})
