'use strict'
<<<<<<< HEAD
const utils = require('./utils');
const config = require('../config');
const isProduction = process.env.NODE_ENV === 'production';
const sourceMapEnabled = isProduction ?
  config.build.productionSourceMap :
  config.dev.cssSourceMap;
const px2remOption = config.common.px2remOption;
=======
const utils = require('./utils')
const config = require('../config')
const isProduction = process.env.NODE_ENV === 'production'
const sourceMapEnabled = isProduction
  ? config.build.productionSourceMap
  : config.dev.cssSourceMap
>>>>>>> ddf8f93690e1ad734e9eef3256becec8b2669b11

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: sourceMapEnabled,
<<<<<<< HEAD
    px2remOption: px2remOption,
=======
>>>>>>> ddf8f93690e1ad734e9eef3256becec8b2669b11
    extract: isProduction
  }),
  cssSourceMap: sourceMapEnabled,
  cacheBusting: config.dev.cacheBusting,
  transformToRequire: {
    video: ['src', 'poster'],
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  },
<<<<<<< HEAD
  postcss: [
    px2remOption && require('postcss-px2rem')(px2remOption)
  ].filter(b => b)
=======
  postcss:[
    //px转rem，比例750px : 37.5rem
    require('postcss-px2rem')({
      remUnit: 20
    })
  ]
>>>>>>> ddf8f93690e1ad734e9eef3256becec8b2669b11
}
