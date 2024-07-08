import Vue from 'vue'
import VueRouter from "vue-router";
import Dog from './components/Dog.vue'
import Cat from './components/Cat.vue'
import store from '../src/store/index'
import Home from './pages/Home.vue'
import { isMicroApp, mountMicroApp } from './micro-apps';
import { loadMicroApp, prefetchApps } from 'qiankun';


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home',
    children: [
      {
        name: 'Dog',
        path: '/dog',
        component: Dog
      },
      {
        name: 'Cat',
        path: '/cat',
        component: Cat
      }
    ]
  },
  {
    name: 'Home',
    path: '/home',
    component: Home
  }
]


/**
 * 将 routes 配置展平
 * @param {*} routes
 * @returns {{}}
 */
const flattenRoutes = (routes) => {
  const flattenRoutes = []
  const dfs = (parentPath, routes) => {
    routes.forEach(route => {
      const path = route.path.startsWith('/') ? route.path : parentPath + '/' + route.path
      if (route.children?.length) {
        dfs(path, route.children)
      } else {
        flattenRoutes.push({
          ...route,
          path
        })
      }
    })
  }
  dfs('', routes)
  return flattenRoutes
}

const router = new VueRouter({
  mode: 'history',
  routes: [{ path: '/', redirect: '/home' }, ...flattenRoutes(routes)],
})

router.afterEach((to) => {
  const { fullPath } = to
  if (isMicroApp(fullPath)) {
    mountMicroApp(fullPath)
    return
  }
  if (to.matched.length) {
    const allTabs = store.getters.allTabs
    if (!allTabs.find(tab => tab.fullPath === fullPath)) {
      store.dispatch('put', { tab: to })
    }
    store.dispatch('setCurrentTab', { tab: to })
  }
})


export default router
export {
  routes
}