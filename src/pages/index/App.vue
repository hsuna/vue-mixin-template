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
=======
<<<<<<< HEAD
>>>>>>> ae8456d8c1a71b4b2de5bd2319f5720f358b151c
    <el-row>
      <i class="icon icon-success"></i>
      <i class="icon icon-error"></i>
    </el-row>
<<<<<<< HEAD
=======
=======
>>>>>>> ddf8f93690e1ad734e9eef3256becec8b2669b11
>>>>>>> ae8456d8c1a71b4b2de5bd2319f5720f358b151c
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
=======
<<<<<<< HEAD
>>>>>>> ae8456d8c1a71b4b2de5bd2319f5720f358b151c
@import 'assets/styles/sprites/_sp-message.scss';
@include sprites(($icon-error, $icon-success));
.icon{
  display: inline-block;
}
<<<<<<< HEAD
=======
=======
>>>>>>> ddf8f93690e1ad734e9eef3256becec8b2669b11
>>>>>>> ae8456d8c1a71b4b2de5bd2319f5720f358b151c
.el-row {
  padding: 10px;
}
</style>