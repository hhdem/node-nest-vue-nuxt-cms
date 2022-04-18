import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _45bc119a = () => interopDefault(import('../pages/about.vue' /* webpackChunkName: "pages/about" */))
const _1712eb26 = () => interopDefault(import('../pages/about-slovak.vue' /* webpackChunkName: "pages/about-slovak" */))
const _05e21440 = () => interopDefault(import('../pages/articles.vue' /* webpackChunkName: "pages/articles" */))
const _6d0a3126 = () => interopDefault(import('../pages/contact.vue' /* webpackChunkName: "pages/contact" */))
const _20a6f2d5 = () => interopDefault(import('../pages/privacy.vue' /* webpackChunkName: "pages/privacy" */))
const _51c0e4bb = () => interopDefault(import('../pages/project1.vue' /* webpackChunkName: "pages/project1" */))
const _51cefc3c = () => interopDefault(import('../pages/project2.vue' /* webpackChunkName: "pages/project2" */))
const _111e296e = () => interopDefault(import('../pages/article/_id.vue' /* webpackChunkName: "pages/article/_id" */))
const _6573ec5f = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/about",
    component: _45bc119a,
    name: "about"
  }, {
    path: "/about-slovak",
    component: _1712eb26,
    name: "about-slovak"
  }, {
    path: "/articles",
    component: _05e21440,
    name: "articles"
  }, {
    path: "/contact",
    component: _6d0a3126,
    name: "contact"
  }, {
    path: "/privacy",
    component: _20a6f2d5,
    name: "privacy"
  }, {
    path: "/project1",
    component: _51c0e4bb,
    name: "project1"
  }, {
    path: "/project2",
    component: _51cefc3c,
    name: "project2"
  }, {
    path: "/article/:id?",
    component: _111e296e,
    name: "article-id"
  }, {
    path: "/",
    component: _6573ec5f,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
