export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'web-nuxt',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
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
    '@nuxtjs/axios'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

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
  }
}
