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



### 1.icons 文件夹，雪碧图处理(webpack-spritesmith)

在 src/assets/icons，创建一个名为 message 的目录，则编译时会自动将该文件夹的 png 图片自动合并成雪碧图，分别生成 src/assets/images/sprites/sp-message.png 和
src/assets/styles/sprites/\_sp-message.scss 文件。如果合并的图标为其他格式，例 jpg 格式，则目录名是以-jpg 为后缀，如："message-jpg"，分别生成 sp-message.jpg 和\_sp-message.jpg.scss 文件

```
./src/assets
├── icons                           // 图标资源目录
│   ├── message                     // png图标目录
│       └── *.png
│   └── message-jpg                 // jpg图标目录
│       └── *.jpg
├── images
│   └── sprites                     // 根据文件名和后缀，生成的雪碧图
│       ├── sp-message.png
│       └── sp-message.jpg
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

### 1.移动端使用单位转化，px 转 rem

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
@import 'assets/styles/modules/_re-mobile.scss';
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
