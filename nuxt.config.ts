export default {
  modules: [
    '@pinia/nuxt',
    '@unocss/nuxt'
  ],
  
  css: [
    '@/assets/css/main.css'
  ],
  
  pinia: {
    autoImports: [
      'defineStore',
      'storeToRefs'
    ]
  },
  
  unocss: {
    attributify: true,
    uno: true
  },
  
  app: {
    head: {
      title: '中医馆管理系统',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ]
    }
  },
  
  runtimeConfig: {
    public: {
      apiBaseURL: '/api'
    }
  }
}
