// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  css: ["@/assets/styles/main.scss"],

  modules: ["@nuxtjs/supabase"],

  supabase: {
    types: "~~/types/supabase.ts",
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "@/assets/styles/_functions.scss" as globalFunctions;
            @use "@/assets/styles/_variables.scss" as globalVariables;
            @use "@/assets/styles/_mixins.scss" as globalMixins;
            @use "@/assets/styles/_breakpoints.scss" as globalBreakpoints;
          `,
        },
      },
    },
  },
});
