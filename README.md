# vue-mixin-template

基于 vue-cli 的混合页面模板

---

## 启动

1.  `git clone https://github.com/hsuna/vue-mixin-template.git`
2.  安装依赖：`npm i`
3.  开发：`npm run dev`
4.  打包：`npm run build`

## 模板结构

```
./vue-mixin-template
├── build                       // 构建目录
├── config                      // 配置目录
├── src                         // 项目目录
│   ├── api                     // API目录
│   ├── assets                  // 动态资源目录
│   │   ├── icons               // 图标，处理雪碧图
│   │   ├── images              // 图片
│   │   └── styles              // 样式
│   ├── components              // 公共组件
│   ├── filters                 // 过滤器|管道器
│   ├── mixin                   // 混合器
│   ├── modules                 // 模块目录
│   │   ├── general             // 通用模块
│   │   └── module1             // 其他模块
│   ├── pages                   // 页面
│   ├── plugins                 // 插件，框架
│   └── utils                   // 工具库
├── static                      // 静态资源目录，不参与打包
└── package.json                // 项目配置信息
```

## 模板说明

### 1.混合式搭建页面，多页面打包模块

* 多页面结构在 src/pages，创建一个目录 index，生成对应名字的 html，例：

```
./
├── src
│   └── pages                     // 建立需要生成html名的文件夹
│       ├── index/
│       ├── multiple_page/
│       └── single_page/
│
└── dist                         // 对应文件名的html
│   ├── index.html
│   ├── multiple_page.html
│   └── single_page.html
```

在文件夹内创建 index.js 和 App.vue，如下

```js
//index.js
import Vue from "vue";

import App from "./App";
new Vue({
  el: "#app",
  components: { App },
  template: "<App/>"
});
```

```vue
//App.vue
<template>
  <div id="app">
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {},
  components: {}
};
</script>
<style lang="scss">
</style>
```

剩下的就可以按 vue 正常开发模式进行开发

* 单页面结构

```
./src/pages
└── single_page
    ├── router                     // 路由表
    ├── views                      // 内嵌页面
    │   ├── page1.vue
    │   └── page2.vue
    ├── App.vue
    └── index.js
```

在 App.vue 内添加 router-view，

```html
<template>
  <div id="app">
    <router-view />
  </div>
</template>
```

index.js 添加 vue-router

```js
import VueRouter from "vue-router";
Vue.use(VueRouter);

/**添加路由配置 */
import routes from "./routes";
const router = new VueRouter({
  routes
});
```

则生成出来的 single_page.html 就是一个单页面结构

* 分页面打包模块

原本的 vendor 是将页面 node_modules 进行提取合并的，但是这里由于是多页面结构，所以需要分类进行打包。

```js
//config/vendor.js

module.exports = {
  files: {
    /**
     * vendor是默认加载的文件，这个不能删除
     * 所有页面都会加载vendor，所以添加打包模块时，应该确保模块是所有页面都会加载的
     * 像vue，vue-resource，如果是公共的ui框架，也可以往这个地方加
     */
    vendor: ["vue", "vue-resource"],
    /** 单页面引用到的路由器，并非所有页面都有当页面结构，所以这里可以分开打包*/
    vendor1: ["vue-router"],
    /**
     * 需要加载的模块，引入按需加载的模式，而非直接引入模块
     * 像element-ui，应该引入"@/plugins/element-ui"，而非"element-ui"
     * 否则打包的模块会是整个element-ui
     */
    vendor2: ["@/plugins/element-ui"]
    vendor3: ["vue-router", "@/plugins/element-ui"]
  },
  pages: {
    index: {
      title: "主页",//页面的title
      vendor: ["vendor2"]//页面的按需引入
    },
    single_page: {
      title: "单页面",
      vendor: ["vendor1", "vendor2"]//可以引入多个，也可以不引用
    },
    multiple_page: {
      title: "多页面",
      vendor: ["vendor2"]
    }
  }
};
```

### 2.大框架的按需加载

这里以 element-ui 为例，

```js
/*plugins.element-ui.js*/

import { Button, MessageBox, Row } from "element-ui";

export default {
  component: [Button, MessageBox, Row],
  prototype: {
    $msgbox: MessageBox,
    $alert: MessageBox.alert,
    $confirm: MessageBox.confirm,
    $prompt: MessageBox.prompt
  }
};
```

```js
/*index.js*/

// 按需引入部分组件
import Plugin from "plugins/element-ui";
Plugin.component.forEach(comp => {
  Vue.component(comp.name, comp);
});
Object.keys(Plugin.prototype).forEach(key => {
  Vue.prototype[key] = Plugin.prototype[key];
});
```

注意，一定要在.babelrc中，加上需要按需加载的模块，否则是不处理的，打包出来的文件还是整模块的。

```
/**.babelrc */

"plugins": [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
```

### 3.icons 文件夹，雪碧图处理(webpack-spritesmith)

在 src/assets/icons，创建一个名为 message 的目录，则编译时会自动将该文件夹的 png 图片自动合并成雪碧图，分别生成 src/assets/images/sprites/sp-message.png 和
src/assets/styles/sprites/\_sp-message.scss 文件。如果合并的图标为其他格式，例 jpg 格式，则目录名是以-jpg 为后缀，如："message-jpg"，分别生成 sp-message.jpg 和\_sp-message.jpg.scss 文件

```
./src/assets
├── icons                           // 图标资源目录
│   ├── message                     // png图标目录
│   │   └── *.png
│   └── message-jpg                 // jpg图标目录
│       └── *.jpg
│
├── images
│   └── sprites                     // 根据文件名和后缀，生成的雪碧图
│       ├── sp-message.png
│       └── sp-message.jpg
│
└── styles
    └── sprites                     // 根据文件名和后缀，生成的scss
        ├── _sp-message.scss        // 通用模块
        └── _sp-message.jpg.scss
```

使用生成的雪碧图：

```scss
@include sprites(($icon-error, $icon-success));

//或

.icon-success {
  @include sprite($icon-success);
}
.icon-error {
  @include sprite($icon-error);
}

//对应的css

.icon-success {
  background-image: url(/static/img/sp-message.f3fa2ba.png);
  background-position: -83px 0px;
  width: 83px;
  height: 83px;
}
.icon-error {
  background-image: url(/static/img/sp-message.f3fa2ba.png);
  background-position: 0px 0px;
  width: 83px;
  height: 83px;
}
```

### 4.移动端使用单位转化，px 转 rem

添加 px2rem 配置参数，修改 config/index.js：

```javascript
common: {
  px2remOption: {
    //px转rem
    remUnit: 20; //750px->37.5rem
  }
}
```

在对应的 js 文件，添加动态响应的 scss：

```scss
@import "assets/styles/modules/_re-mobile.scss";
@include mobileResponsive();

/**
 * 移动端动态计算
 * @param $remUnit:20 rem比例
 * @param $designSize:750 设计稿尺寸
 */
@mixin mobileResponsive($remUnit: 20, $designSize: 750) {
  //...
}
```
