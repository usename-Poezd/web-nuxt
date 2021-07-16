export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Breeder Zone',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: 'https://breeders-zone.s3.us-east-2.amazonaws.com/static/icons/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    // SCSS file in the project
    '@fortawesome/fontawesome-svg-core/styles.css',
    '@/assets/scss/main.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/api.ts',
    '~/plugins/fontawesome.ts',
    '~plugins/vue-js-modal.ts',
    '~plugins/vue-select.ts',
    '~/plugins/local-storage',
    '~/plugins/vee-validate',
    '~/plugins/mask',
    '~/plugins/vue-textarea-autosize',
    '~/plugins/vuescroll',
    {
      src: '~/plugins/vue2-datepicker',
      ssr: false
    },
    {
      src: '~/plugins/vue-awesome-swiper',
      ssr: false
    },
    {
      src: '~/plugins/vue-js-toggle-button.ts',
      ssr: false
    },
    {
      src: '~plugins/vue-slider-component.ts',
      ssr: false
    }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: {
    dirs: [
      '~/components',
      '~/components/Headers'
    ]
  },

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/device',
    '@nuxtjs/composition-api/module',
    'nuxt-lazysizes'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/firebase',
  ],

  firebase: {
    config: {
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      databaseURL:  process.env.FIREBASE_DATABASE_URL,
      projectId: process.env.FIREBASE_PROJECT_ID,
      storageBucket:  process.env.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.FIREBASE_APP_ID,
    },
    services: {
      auth: true, // Just as example. Can be any other service.
      database: true
    }
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseUrl: process.env.DOCKER_API_BASE_PATH,
    browserBaseURL: process.env.API_BASE_PATH
  },

  formulate: {
    configPath: '~/formulate.config.js'
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [
      "vee-validate/dist/rules",
      "vue-currency-input"
    ],
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {},

    babel:{
      plugins: [
        ['@babel/plugin-proposal-private-methods', { loose: true }]
      ]
    }
  },

  publicRuntimeConfig: {
    api: process.env.API_BASE_PATH,
    authApi: process.env.AUTH_API_BASE_PATH,
    dockerApi: process.env.API_BASE_PATH,
    dockerAuthApi: process.env.AUTH_API_BASE_PATH,
    DEBUG: process.env.DEBUG ? 'nuxt:*' : false,
  },

  privateRuntimeConfig: {
    api: process.env.API_BASE_PATH,
    authApi: process.env.AUTH_API_BASE_PATH,
    dockerApi: process.env.DOCKER_API_BASE_PATH,
    dockerAuthApi: process.env.DOCKER_AUTH_API_BASE_PATH,
    DEBUG: process.env.DEBUG ? 'nuxt:*' : false,
  },
}
