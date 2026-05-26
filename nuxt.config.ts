// nuxt.config.ts
export default defineNuxtConfig({
  app: {
    head: {
      title: 'Pemilihan Ketua OSIS dan Wakil Ketua OSIS Peeriode 2026/2027',
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        // Jika kamu memakai gambar PNG, ubah menjadi:
        // { rel: 'icon', type: 'image/png', href: '/logo.png' }
      ]
    }
  },

  devtools: { enabled: true },

  nitro: {
    preset: 'vercel'
  },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/supabase',
    '@nuxt/icon',
    '@nuxtjs/google-fonts'
  ],

  googleFonts: {
    families: {
      'Plus+Jakarta+Sans': [400, 500, 600, 700],
      'Fredoka': [400, 500, 600, 700],
    },
    display: 'swap',
  },

  supabase: {
    // Disable default auth redirect since we use a custom token system
    redirect: false,
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_KEY
  },

  // Ensure standard TypeScript behavior
  typescript: {
    strict: true
  }
})
