// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },

  imports: {
    dirs: ["~/composables", "~/composables/**"],
  },

  css: ["@/assets/styles/main.scss"],

  modules: ["@nuxtjs/supabase", "@vueuse/nuxt", "@nuxt/image"],

  supabase: {
    types: "~~/types/supabase.ts",
    redirect: false,
  },

  vite: {
    optimizeDeps: {
      include: ["@mdx-js/react", "@vue/devtools-core", "@vue/devtools-kit"],
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "~~/app/assets/styles/_functions.scss" as globalFunctions;
            @use "~~/app/assets/styles/_variables.scss" as globalVariables;
            @use "~~/app/assets/styles/_mixins.scss" as globalMixins;
            @use "~~/app/assets/styles/_breakpoints.scss" as globalBreakpoints;
          `,
        },
      },
    },
  },
});