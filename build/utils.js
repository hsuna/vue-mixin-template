'use strict'
const path = require('path')
const config = require('../config');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const packageConfig = require('../package.json')
const SpritesmithPlugin = require('webpack-spritesmith');
const CleanWebpackPlugin = require('clean-webpack-plugin');

// glob是webpack安装时依赖的一个第三方模块，还模块允许你使用 *等符号, 例如lib/*.js就是获取lib文件夹下的所有js后缀名的文件
const glob = require('glob')

exports.assetsPath = function (_path) {
  const assetsSubDirectory = process.env.NODE_ENV === 'production' ?
    config.build.assetsSubDirectory :
    config.dev.assetsSubDirectory

  return path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = function (options) {
  options = options || {}

  const cssLoader = {
    loader: 'css-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  const px2remLoader = {
    loader: 'px2rem-loader',
    options: {
      remUnit: 20
    }
  }

  // generate loader string to be used with extract text plugin
  function generateLoaders(loader, loaderOptions) {
    const loaders = options.usePostCSS ? [cssLoader, postcssLoader, px2remLoader] : [cssLoader]

    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader'
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', {
      indentedSyntax: true
    }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  const output = []
  const loaders = exports.cssLoaders(options)

  for (const extension in loaders) {
    const loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }

  return output
}

exports.createNotifierCallback = () => {
  const notifier = require('node-notifier')

  return (severity, errors) => {
    if (severity !== 'error') return

    const error = errors[0]
    const filename = error.file && error.file.split('!').pop()

    notifier.notify({
      title: packageConfig.name,
      message: severity + ': ' + error.name,
      subtitle: filename || '',
      icon: path.join(__dirname, 'logo.png')
    })
  }
}

// 多入口配置
exports.entries = () => {
  let entryFiles = glob.sync(config.common.pagePath + '/*/*.js');
  let map = {
    vendor: ['vue', 'vue-resource'],
  };
  entryFiles.forEach(filePath => {
    map[path.basename(path.dirname(filePath))] = filePath;
  })
  return map
}

//多页面输出配置
exports.exits = (conf) => {
  let entryHtml = glob.sync(config.common.pagePath + '/*/*.js');
  return entryHtml.map(filePath => {
    let filename = path.basename(path.dirname(filePath));
    return Object.assign({
      title: config.common.pageTitle[filename] || '3k游戏',
      // 模板来源
      template: config.common.pagePath + '/index.html',
      // 文件名称
      filename: filename + '.html',
      // 页面模板需要加对应的js脚本，如果不加这行则每个页面都会引入所有的js脚本
      chunks: ['manifest', 'vendor', filename]
    }, conf);
  });
}

//处理雪碧图
exports.spritesmith = (conf = {}) => {
  let icondirs = glob.sync(config.common.iconPath + '/*/');
  return icondirs.map(dirPath => {
    let dirname = path.basename(dirPath);
    let [name, suffix = 'png'] = dirname.split('.');
    suffix = '.' + suffix;
    return Object.assign({
      src: {
        cwd: dirPath, //准备合并成sprit的图片存放文件夹
        glob: '*' + suffix //哪类图片
      },
      target: {
        image: path.resolve(__dirname, '../src/assets/images/sprites/sp-' + name + suffix), // sprite图片保存路径
        css: path.resolve(__dirname, '../src/assets/styles/sprites/_sp-' + dirname + '.scss') // 生成的sass保存在哪里
      },
      apiOptions: {
        cssImageRef: "~assets/images/sprites/sp-" + name + suffix //css根据该指引找到sprite图
      }
    }, conf);
  })
}

//清理文件
exports.clearfiles = function (matchs = []) {
  matchs = [
    //删除旧的雪碧图
    'src/assets/images/sprites',
    'src/assets/styles/sprites',
    ...matchs
  ]
  return new CleanWebpackPlugin(matchs, {
    root: path.resolve(__dirname, '..'), //根目录
    verbose: false,//开启在控制台输出信息
    dry: false,　　　//启用删除文件　　　　　　　 
  });
}
