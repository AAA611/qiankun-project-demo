import Vue from 'vue'
import VueRouter from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'

Vue.use(VueRouter)

const routes = [
    { path: '/', redirect: '/hello' },
    { name: 'App2 Hello', path: '/hello', component: HelloWorld }
]

const flattenRoutesFn = (routes) => {
    const flattenRoutes = []
    const dfs = (parentPath, routes) => {
        routes.forEach(route => {
            const path = parentPath + (route.path.startsWith('/') ? '' : '/') + route.path
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

const cleanPath = (path) => {
    return path.replace(/\/(?:\s*\/)+/g, '/')
}

let router = null
const createRouter = () => {
    router = new VueRouter({
        base: window.__POWERED_BY_QIANKUN__ ? '/app2/' : '/',
        mode: 'history',
        routes: flattenRoutesFn(routes),
    })

    router.afterEach((to) => {
        console.log("🚀App2 ~ router.afterEach ~ to:", to)
        if (to.matched.length) {
            const allTabs = Vue.prototype.$mainApp.store.getters.allTabs
            if (!allTabs.find(tab => tab.fullPath === to.fullPath)) {
                Vue.prototype.$mainApp.store.dispatch('put', { tab: { ...to, fullPath: cleanPath(router.options.base + to.fullPath) } })
            }
            Vue.prototype.$mainApp.store.dispatch('setCurrentTab', { tab: { ...to, fullPath: cleanPath(router.options.base + to.fullPath) } })
        }
    })

    return router
}

const destroyRouter = () => {
    router = null
}

export {
    createRouter,
    destroyRouter,
    cleanPath
}