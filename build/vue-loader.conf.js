'use strict'

const utils = require('./utils');
const config = require('../config');
const isProduction = process.env.NODE_ENV === 'production';
const sourceMapEnabled = isProduction ?
  config.build.productionSourceMap :
  config.dev.cssSourceMap;
const px2remOption = config.common.px2remOption;

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: sourceMapEnabled,
    px2remOption: px2remOption,
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
  postcss: [
    px2remOption && require('postcss-px2rem')(px2remOption)
  ].filter(b => b)
}
