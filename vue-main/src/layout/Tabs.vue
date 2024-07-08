<template>
  <div>
    <el-tabs v-if="currentTab" :value="currentTab.fullPath" closable type="card" @tab-remove="handleTabRemove">
      <el-tab-pane v-for="tab in allTabs" :label="tab.name" :name="tab.fullPath">
        <span slot="label" @click="() => handleClickTab(tab)">
          {{ tab.name }}
        </span>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: 'Tabs',
  data() {
    return {

    }
  },
  computed: {
    allTabs() {
      return this.$store.state.tabs.allTabs
    },
    currentTab() {
      return this.$store.state.tabs.currentTab
    }
  },
  methods: {
    handleClickTab(tab) {
      this.$router.push(tab.fullPath)
    },
    handleTabRemove(tabPath) {
      const allTabs = [...this.allTabs]
      const findIndex = allTabs.findIndex(tab => tab.fullPath === tabPath)
      if (findIndex > -1) {
        allTabs.splice(findIndex, 1)
        this.$store.commit('setAllTabs', allTabs)
        if (!allTabs.length) {
          this.$router.push('/')
        } else {
          this.$router.push(allTabs[allTabs.length - 1].fullPath)
        }
      }
    }
  },
  created() {

  }
}
</script>
<style lang="scss" scoped></style>