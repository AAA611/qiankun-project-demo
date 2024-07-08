<template>
  <div class="basic-layout">
    <div>
      <Menu />
    </div>
    <div>
      <Tabs />
      <KeepAlive>
        <RouterView />
      </KeepAlive>
      <!-- microApps -->
      <div v-for="microApp in microApps" :id="microApp.container.slice(1)" :key="microApp.name"></div>
    </div>
  </div>
</template>

<script>
import { RouterView } from 'vue-router'
import Menu from './Menu.vue'
import Tabs from './Tabs'
import microApps from '../micro-apps';
export default {
  name: 'BasicLayout',
  components: {
    RouterView,
    Menu,
    Tabs
  },
  data() {
    return {
      microApps
    }
  },
  methods: {

  },
  created() {

  }
}
</script>
<style scoped>
.basic-layout {
  display: flex;
  height: 100vh;
}
</style>