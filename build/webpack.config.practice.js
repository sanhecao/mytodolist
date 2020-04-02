const path = require('path');
const HTMLPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const webpack = require('webpack');
//const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const baseConfig = require('./webpack.config.base');

const merge = require('webpack-merge'); //合并不同的webpack文件
const devServer = {
  port: 8000,
  host: '0.0.0.0',
  overlay: {
    errors: true
  },
  hot: true
}
const defaultPluins = [
  // make sure to include the plugin for the magic
  new VueLoaderPlugin(),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: '"development"'
    }
  }),
  new HTMLPlugin({
    template:path.join(__dirname,'template.html')
  }),
  //非js的文件单独打包 比如css
  // new MiniCssExtractPlugin({
  //   // Options similar to the same options in webpackOptions.output
  //   // all options are optional
  //   filename: '[name].css',
  //   chunkFilename: '[id].css',
  //   ignoreOrder: false, // Enable to remove warnings about conflicting order
  // })
]

let config
// 开发环境
  config = merge(baseConfig, {
    entry: path.join(__dirname,'../practice/index.js'),
    devtool: '#cheap-module-eval-source-map',
    devServer: devServer,
    resolve:{
      alias:{
        'vue':path.join(__dirname,'../node_modules/vue/dist/vue.esm.js')
      }
    },
    module: {
      rules: [{
        //css预处理器，使用模块化的方式写css代码
        //stylus-loader专门用来处理stylus文件，处理完成后变成css文件，
        //交给css-loader.webpack的loader就是这样一级一级向上传递，
        //每一层loader只处理自己关心的部分
        test: /\.styl/,
        use: [
          'vue-style-loader',
          'css-loader',

          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          },
          'stylus-loader'
        ]
      }]
    },
    plugins: defaultPluins.concat([
      new webpack.HotModuleReplacementPlugin()
      //wevpack弃用 new webpack.NoEmitOnErrorsPlugin()
    ])
  })



module.exports = config