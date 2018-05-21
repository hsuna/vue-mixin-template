<template>
  <div id="app">
    <el-row>
      <h1>主页面</h1>
    </el-row>
    <el-row>
        <el-button type="primary" @click="toPageByName('page1')">页面1</el-button>
        <el-button type="primary" @click="toPageByName('page2')">页面2</el-button>
        <el-button type="primary" @click="toPageByName('page3')">页面3-单页面</el-button>
    </el-row>
    <el-row>
      <i class="icon icon-success"></i>
      <i class="icon icon-error"></i>
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
@import 'assets/styles/sprites/_sp-message.scss';
@include sprites(($icon-error, $icon-success));
.icon{
  display: inline-block;
}
.el-row {
  padding: 10px;
}
</style>