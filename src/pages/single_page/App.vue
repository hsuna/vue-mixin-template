<template>
  <div id="app">
    <el-row>
        <h1>这是一个单页面</h1>
    </el-row>
    <el-row>
        <el-button type="primary" @click="$router.push({path:'page1'})">页面1</el-button>
        <el-button type="primary" @click="$router.push({path:'page2'})">页面2</el-button>
    </el-row>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {};
  },
  methods: {},
  components: {}
};
</script>

<style lang="scss">
.el-row{
  padding: 10px;
}
</style>