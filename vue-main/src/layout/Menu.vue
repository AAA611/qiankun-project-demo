<template>
  <div class="menu-wrapper">
    <el-menu class="main-menu" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b"
      :default-active="activeMenu" router @select="handleSelect">
      <el-menu-item index="/dog">
        <span slot="title">Dog</span>
      </el-menu-item>
      <el-menu-item index="/cat">
        <span slot="title">Cat</span>
      </el-menu-item>
      <el-menu-item index="/app1/hello">
        <span slot="title">App1 Hello</span>
      </el-menu-item>
      <el-menu-item index="/app2/hello">
        <span slot="title">App2 Hello</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'Menu',
  components: {},
  data() {
    return {
      activeMenu: this.$route.path
    }
  },
  watch: {
    $route(to) {
      this.activeMenu = to.path;
    }
  },
  methods: {
    handleSelect(key) {
      this.activeMenu = key;
    }
  },
  created() {

  }
}
</script>
<style scoped>
.menu-wrapper {
  min-width: 200px;
  height: 100%;
}

.main-menu {
  height: 100%;
}
</style>