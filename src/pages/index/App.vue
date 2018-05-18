<template>
  <div id="app">
    <el-row>
      <h1>主页面</h1>
    </el-row>
    <el-row>
        <el-button type="primary" @click="toPageByName('single_page')">跳转到单页面</el-button>
        <el-button type="primary" @click="toPageByName('multiple_page')">跳转到多页面</el-button>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    toPageByName(page) {
      window.location.href = "/" + page + '.html';
    }
  },
  components: {}
};
</script>

<style lang="scss">
.el-row {
  padding: 10px;
}
</style>