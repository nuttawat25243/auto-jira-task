export default defineNuxtConfig({
  devtools: { enabled: false },
  app: {
    head: {
      title: 'Auto Jira Task Board',
      meta: [
        { name: 'description', content: 'Interactive Nuxt 3 dashboard for tracking tasks in an agile workflow.' }
      ]
    }
  },
  css: ['~/assets/css/main.css'],
  typescript: {
    strict: true,
    tsConfig: {
      compilerOptions: {
        types: ['@types/node']
      }
    }
  }
})
