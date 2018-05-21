module.exports = {
  files: {
    //需要加载的文件数组不允许为空
    vendor: ['vue', 'vue-resource'], //默认加载的文件，这个不能删除，至少存在一项
    vendor1: ['vue-router'],
    vendor2: ['@/plugins/element-ui']//需要加载的模块，引入按需加载的模式，而非直接引入模块
  },
  pages: {
    index: {
      title: '主页',
      vendor: ['vendor2']
    },
    page1: {
      title: '页面1',
      vendor: ['vendor2']
    },
    page2: {
      title: '页面2',
      vendor: ['vendor2']
    },
    page3: {
      title: '页面3',
      vendor: ['vendor1', 'vendor2']
    },
  }
}
