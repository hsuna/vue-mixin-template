<template>
  <div id="app">
    <el-row>
      <h1>主页面</h1>
    </el-row>
    <el-row>
        <el-button type="primary" @click="toPageByName('single_page')">跳转到单页面</el-button>
        <el-button type="primary" @click="toPageByName('multiple_page')">跳转到多页面</el-button>
    </el-row>
<<<<<<< HEAD
    <el-row>
      <i class="icon icon-success"></i>
      <i class="icon icon-error"></i>
    </el-row>
=======
>>>>>>> ddf8f93690e1ad734e9eef3256becec8b2669b11
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
<<<<<<< HEAD
@import 'assets/styles/sprites/_sp-message.scss';
@include sprites(($icon-error, $icon-success));
.icon{
  display: inline-block;
}
=======
>>>>>>> ddf8f93690e1ad734e9eef3256becec8b2669b11
.el-row {
  padding: 10px;
}
</style>