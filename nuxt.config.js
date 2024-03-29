import colors from 'vuetify/es5/util/colors'

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,
  // ssr: true,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',
  // target: 'server',

  // 開発環境（Docker環境）用設定
  server: {
    port: 3000,
    host: '0.0.0.0'
  },

  router: {
    extendRoutes(routes) {
      // 自動生成のルーティングを編集する
      routes.forEach(route => {
        if (route.name === 'index') {
          route.props = true;
        }
      })
      // routes.push({
      //   path: '/',
      //   component: resolve(__dirname, 'pages/index.vue'),
      //   name: 'indexx',
      //   props: true,
      // })
    }
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - PAORG',
    title: 'PAORG',
    htmlAttrs: {
      lang: 'ja'
    },
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: ''},
      {name: 'format-detection', content: 'telephone=no'}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.png'},
      {
        rel: 'stylesheet',
        href: 'https://use.fontawesome.com/releases/v5.0.13/css/all.css'
      }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'firebaseui/dist/firebaseui.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    '@nuxt/typescript-build'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/firebase',
    'nuxt-webfontloader'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // baseURL: 'http://localhost:8080/'
    // 開発環境用APIのURL
    baseURL: 'http://192.168.1.5:8080/'
  },

  firebase: {
    config: {
      apiKey: 'AIzaSyBntL8B-NMDtpydcj_rnxM-ujFddwHC_YU',
      authDomain: 'paorg-d443d.firebaseapp.com',
      projectId: 'paorg-d443d',
      storageBucket: 'paorg-d443d.appspot.com',
      messagingSenderId: '164516699291',
      appId: '1:164516699291:web:af2ed308cb2741e6e7fa3e',
      measurementId: 'G-QCNH8J27SL'
    },
    services: {
      auth: {
        initialize: {
          // onAuthStateChangedAction: 'onAuthStateChanged',
        }
      }
    }
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    treeShake: true,
    theme: {
      themes: {
        light: {
          primary: '#6de85a',
          accent: '#e85a6d',
          secondary: '#5a6de8',
        },
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  webfontloader: {
    // google: {
    //   families: ['Noto+Sans:400,700&display=swap', 'Noto+Sans+JP:400,700&display=swap']
    // }
    custom: {
      families: [
        'Noto+Sans:n4,n7',
        'Noto+Sans+JP:n4,n7'
      ],
      urls: [
        // for each Google Fonts add url + options you want
        // here add font-display option
        'https://fonts.googleapis.com/css?family=Noto+Sans:400,700&display=swap',
        'https://fonts.googleapis.com/css?family=Noto+Sans+JP:400,700&display=swap'
      ]
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {}
}
