<template>
  <div class="hello">
    <h1>Hello App1</h1>
    <el-button type="primary">App1 Element Button</el-button>
    <img :src="logo" alt="">
  </div>
</template>

<script>
import logo from '../assets/logo.png'
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      logo
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
