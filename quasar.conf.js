// Configuration for your app

module.exports = function (ctx) {
  const package = require('./package.json')

  return {
    // Quasar looks for *.js files by default
    sourceFiles: {
      router: 'src/router/index.ts',
      store: 'src/store/index.ts'
    },
    // app boot file (/src/boot)
    // --> boot files are part of "main.js"
    boot: [
      'vue-function-api.js'
    ],

    css: [
      'app.styl'
    ],

    extras: [
      'roboto-font',
      'material-icons' // optional, you are not bound to it
      // 'ionicons-v4',
      // 'mdi-v3',
      // 'fontawesome-v5'
      // 'eva-icons'
    ],

    framework: {
      // all: true, // --- includes everything; for dev only!

      components: [
        'QAvatar',
        'QBadge',
        'QBtn',
        'QBtnGroup',
        'QCard',
        'QCardActions',
        'QCardSection',
        'QCarousel',
        'QCarouselSlide',
        'QChip',
        'QCheckbox',
        'QDialog',
        'QDrawer',
        'QHeader',
        'QIcon',
        'QImg',
        'QInput',
        'QItem',
        'QItemLabel',
        'QItemSection',
        'QLayout',
        'QList',
        'QPage',
        'QPageContainer',
        'QPageSticky',
        'QPagination',
        'QScrollArea',
        'QSelect',
        'QSeparator',
        'QSpace',
        'QToggle',
        'QToolbar',
        'QToolbarTitle'
      ],

      directives: [
        'ClosePopup',
        'Ripple'
      ],

      // Quasar plugins
      plugins: [
        'Notify'
      ]

      // iconSet: 'ionicons-v4'
      // lang: 'de' // Quasar language
    },

    supportIE: false,

    build: {
      scopeHoisting: true,
      // vueRouterMode: 'history',
      // vueCompiler: true,
      // gzip: true,
      // analyze: true,
      // extractCSS: false,
      env: {
        APP_NAME: JSON.stringify(package.productName),
        APP_VERSION: JSON.stringify(package.version)
      },

      extendWebpack (cfg) {
        cfg.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /node_modules/
        })
      }
    },

    devServer: {
      // https: true,
      // port: 8080,
      open: true // opens browser window automatically
    },

    // animations: 'all', // --- includes all animations
    animations: [
      'slideInDown',
      'slideOutUp'
    ],

    ssr: {
      pwa: false
    },

    pwa: {
      // workboxPluginMode: 'InjectManifest',
      // workboxOptions: {}, // only for NON InjectManifest
      manifest: {
        // name: 'Quasar App',
        // short_name: 'Quasar-PWA',
        // description: 'Best PWA App in town!',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#ffffff',
        theme_color: '#027be3',
        icons: [
          {
            'src': 'statics/icons/icon-128x128.png',
            'sizes': '128x128',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-192x192.png',
            'sizes': '192x192',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-256x256.png',
            'sizes': '256x256',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-384x384.png',
            'sizes': '384x384',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-512x512.png',
            'sizes': '512x512',
            'type': 'image/png'
          }
        ]
      }
    },

    cordova: {
      // id: 'org.cordova.quasar.app'
      // noIosLegacyBuildFlag: true // uncomment only if you know what you are doing
    },

    electron: {
      bundler: 'builder', // or 'packager'

      extendWebpack (cfg) {
        // do something with Electron main process Webpack cfg
        // chainWebpack also available besides this extendWebpack
      },

      packager: {
        // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options

        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',

        // Window only
        // win32metadata: { ... }
      },

      builder: {
        // https://www.electron.build/configuration/configuration

        appId: 'com.example.quasar-flash-games',
        extraResources: [
          {
            // eslint-disable-next-line no-template-curly-in-string
            from: 'src-electron/ppapi-flash-plugin/${os}/${arch}',
            to: 'PepperFlash',
            filter: [
              '**/*'
            ]
          }
        ],
        win: {
          target: [
            'nsis',
            'portable'
          ]
        },
        nsis: {
          allowToChangeInstallationDirectory: true,
          language: 1046,
          oneClick: false,
          perMachine: true
        },
        linux: {
          category: 'Education',
          executableName: 'quasar-flash-games',
          packageCategory: 'education',
          synopsis: 'SWF game repository',
          vendor: 'Laércio de Sousa',
          target: [
            'AppImage',
            'deb'
          ]
        }
      }
    }
  }
}
