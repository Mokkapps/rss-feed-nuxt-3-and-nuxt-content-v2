import { defineNuxtConfig } from 'nuxt';

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: ['@nuxt/content'],
  nitro: { prerender: { routes: ['/rss.xml'] } },
  content: {
    // https://content.nuxtjs.org/api/configuration
  },
});
