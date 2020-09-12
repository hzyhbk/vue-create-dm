const packageName = require('./package.json').name;
const ManifestPlugin = require('webpack-manifest-plugin');

module.exports = {
  publicPath:
    process.env.NODE_ENV === 'production'
      ? 'http://localhost:8091'
      : 'http://localhost:8091',

  configureWebpack: (config) => {
    config.output.libraryTarget = 'umd';
    config.output.library = packageName;
    config.output.jsonpFunction = `webpackJsonp_${packageName}`;

    config.optimization.splitChunks.cacheGroups = {};

    // 外部依赖，通用包从root模块加载
    config.externals = ['vue-router', 'vuex'];
    config.plugins.push(
      new ManifestPlugin({
        fileName: 'manifest-initial.json',
        filter: function (option) {
          return option.isInitial;
        },
      })
    );
  },

  devServer: {
    headers: {
      // 子应用如果与root应用不在同一个域名下，需要devops配置允许跨域
      'Access-Control-Allow-Origin': '*',
    },
  },

  css: {
    extract: false,
  },

  // filenameHashing: false
};
