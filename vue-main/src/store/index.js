import Vue from 'vue'
import Vuex from 'vuex'
import tabsModule from './tabs'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    tabs: tabsModule
  }
})

export default store