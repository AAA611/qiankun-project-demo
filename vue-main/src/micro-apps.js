import { loadMicroApp } from "qiankun"
import store from "./store/index"

const microApps = [
  {
    name: 'vue-app',
    entry: '//localhost:3001',
    container: '#container1',
    activeRule: '/app1',
  },
  {
    name: 'vue-app2',
    entry: '//localhost:3002',
    container: '#container2',
    activeRule: '/app2',
  },
]

const activeMicroAppMap = {}

export const isMicroApp = (fullPath) => {
  return microApps.some((app) => {
    return fullPath.startsWith(app.activeRule)
  })
}

export const tryGetMicroApp = (fullPath) => {
  if (isMicroApp(fullPath)) {
    return microApps.find((app) => {
      return fullPath.startsWith(app.activeRule)
    })
  }
}

export const mountMicroApp = (fullPath) => {
  const app = tryGetMicroApp(fullPath)
  if (app) {
    const instance = activeMicroAppMap[app.name]
    if (instance) {
      // 
    } else {
      activeMicroAppMap[app.name] = loadMicroApp({ ...app, props: { store } }, {
        sandbox: { strictStyleIsolation: true }
      })
    }
  }
}

export const unmountMicroApp = (allTabs) => {
  const allTabPaths = allTabs.map(tab => tab.fullPath)
  for (const name in activeMicroAppMap) {
    const app = microApps.find(app => {
      return app.name === name
    })
    if (!allTabPaths.some(path => path.startsWith(app.activeRule))) {
      console.log('unmount', app);
      activeMicroAppMap[name].unmount()
      delete activeMicroAppMap[name]
    }
  }
}



export default microApps