import tailwindcss from '@tailwindcss/vite'
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  css: ['~/assets/css/main.css'],
  vite: { plugins: [tailwindcss()] },
  runtimeConfig: { backendUrl: 'http://localhost:3001', public: { siteUrl: 'http://localhost:3000' } },
  app: { head: { htmlAttrs: { lang: 'en' }, link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }], meta: [{ name: 'theme-color', content: '#452637' }] } }
})
