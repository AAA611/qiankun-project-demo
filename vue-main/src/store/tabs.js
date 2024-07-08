import { unmountMicroApp } from "@/micro-apps"

const lruMap = new Map()

export default {
  state: {
    max: 2,
    allTabs: [],
    currentTab: null
  },
  mutations: {
    setAllTabs(state, tabs) {
      state.allTabs = tabs
      unmountMicroApp(state.allTabs)
    },
    setCurrentTab(state, tab) {
      state.currentTab = tab
    }
  },
  actions: {
    put({ state, commit }, { tab }) {
      const isExists = state.allTabs.find(item => item.fullPath === tab.fullPath)
      if (isExists) {
        commit('setCurrentTab', isExists)
        return
      }
      const nextAllTabs = [...state.allTabs, tab]
      if (state.allTabs.length === state.max) {
        const oldestKey = lruMap.keys().next().value
        lruMap.delete(oldestKey)
        nextAllTabs.splice(nextAllTabs.findIndex(({ fullPath }) => fullPath === oldestKey), 1)
      }
      lruMap.set(tab.fullPath, tab)
      commit('setAllTabs', nextAllTabs)
    },
    get(tab) {
      const key = tab.fullPath
      if (lruMap.has(key)) {
        lruMap.delete(key)
        lruMap.set(key, tab)
      }
    },
    setCurrentTab({ commit, dispatch }, { tab }) {
      commit('setCurrentTab', tab)
      dispatch('get', tab)
    }
  },
  getters: {
    allTabs: state => state.allTabs,
    currentTab: state => state.currentTab
  }
}