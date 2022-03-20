export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: "static",

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "城堡移民",
    htmlAttrs: {
      lang: "zh-cn"
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "GiiBee CMS" },
      { name: "format-detection", content: "telephone=no" },
      { name: "theme-color", content: "#009bb1" }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/images/favicon.png" }],
    script: [
      {src:'js/jquery.js'},
      {src:'js/bootstrap.min.js'},
      {src:'js/jquery.appear.js'},
      {src:'js/owl.carousel.min.js'},
      {src:'js/slick.js'},
      {src:'js/jquery.nice-select.min.js'},
      {src:'js/swiper-bundle.min.js'},
      {src:'js/TweenMax.min.js'},
      {src:'js/lightcase.js'},
      {src:'js/jquery.plugin.min.js'},
      {src:'js/jquery.countdown.min.js'},
      {src:'js/jquery.easing.1.3.js'},
      {src:'js/jquery.shuffle.min.js'},
      {src: 'js/theme.js', body: true,}
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    {
      src: "~/assets/css/bootstrap.css",
      rel: "stylesheet"
    },{
      src: "~/assets/css/font-awesome.min.css",
      rel: "stylesheet"
    },{
      src: "~/assets/css/elegant-icons.css",
      rel: "stylesheet"
    },{
      src: "~/assets/css/themify-icons.css",
      rel: "stylesheet"
    },{
      src: "~/assets/css/animate.css",
      rel: "stylesheet"
    },{
      src: "~/assets/css/owl.carousel.min.css",
      rel: "stylesheet"
    },{
      src: "~/assets/css/owl.theme.default.min.css",
      rel: "stylesheet"
    },{
      src: "~/assets/css/slick.css",
      rel: "stylesheet"
    },{
      src: "~/assets/css/nice-select.css",
      rel: "stylesheet"
    },{
      src: "~/assets/css/swiper-bundle.min.css",
      rel: "stylesheet"
    },{
      src: "~/assets/css/lightcase.css",
      rel: "stylesheet"
    },{
      src: "~/assets/css/preset.css",
      rel: "stylesheet"
    },{
      src: "~/assets/css/theme.css",
      rel: "stylesheet"
    },{
      src: "~/assets/css/responsive.css",
      rel: "stylesheet"
    }
    
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ["~/plugins/http"],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ["@nuxtjs/style-resources"],
  styleResources: {
    less: "./assets/css/*.less"
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    "@nuxt/http",
    "@nuxtjs/style-resources"
  ],

  http: {
    // debug: true,
    baseURL: "http://localhost:3000/" // Used as fallback if no runtime config is provided
  },

  server: {
    port: "3001"
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
};
