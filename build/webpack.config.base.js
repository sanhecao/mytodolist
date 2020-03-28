const path = require('path');
const vueLoaderOption =require('./vue-loader.config');
const isDev = process.env.NODE_ENV === 'development';
const config = {
  target: 'web',
  //入口， __dirname 是当前文件所在目录
  entry: path.join(__dirname, '../client/index.js'),
  //输出
  output: {
    filename: 'bundle.[hash:8].js',
    path: path.join(__dirname, '../dist')
  },
  //webpack原生只支持js文件类型，只支持ES5语法，我们使用以.vue文件名结尾的文件时，需要为其指定loader
  module: {
    rules: [{
        test: /\.vue$/,
        loader: 'vue-loader'
      },      
      {
        test: /\.jsx$/,
        loader: 'babel-loader'
      },
      // {
      //   test: /\.js$/,
      //   loader: 'babel-loader',
      //   exclude:/node_modules/
      // },
      //将小于1024d的图片转为base64，减少http请求
      {
        test: /\.(gif|jpg|jpeg|png|svg)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 1024,
            name: 'resource/[path][name].[hash:8].[ext]',
            //outputPath: 'assets/img/'
          }
        }]
      }
    ]
  },
  optimization: {
    splitChunks: {
      chunks(chunk) {
        // exclude `my-excluded-chunk`
        return chunk.name !== 'my-excluded-chunk';
      }
    }
  }
}
module.exports = config