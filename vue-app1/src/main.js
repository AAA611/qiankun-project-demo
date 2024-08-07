import './public-path'
import Vue from 'vue'
import ElementUI from 'element-ui'
import App from './App.vue'
import { createRouter, destroyRouter } from './router'
import 'element-ui/lib/theme-chalk/index.css';
import './styles/element-variables.scss'

Vue.config.productionTip = false

Vue.use(ElementUI)

let instance = null
function render(props = {}) {
  const { container } = props
  const router = createRouter()

  instance = new Vue({
    router,
    render: (h) => h(App),
  }).$mount(container ? container.querySelector('#app') : '#app');
}

// 独立运行时
if (!window.__POWERED_BY_QIANKUN__) {
  render();
}

export async function bootstrap() {
  console.log('[vue] vue app bootstraped');
}
export async function mount(props) {
  Vue.prototype.$mainApp = {
    store: props.store
  }
  render(props);
}
export async function unmount() {
  instance.$destroy();
  instance.$el.innerHTML = '';
  instance = null;
  destroyRouter()
}
