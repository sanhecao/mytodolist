const path=require('path');
const HTMLPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isDev = process.env.NODE_ENV === 'development';
const config = {
    target:'web',
   //入口， __dirname 是当前文件所在目录
    entry: path.join(__dirname, 'src/index.js'),
     //输出
    output: {
       filename: 'bundle.[hash:8].js',
       path: path.join(__dirname, 'dist')
     }, 
     plugins: [
       new webpack.DefinePlugin({
          'process.env':{
            NODE_ENV:isDev ? '"development"' : '"production"'
          }
       }),
       // make sure to include the plugin for the magic
       new VueLoaderPlugin(),
       new HTMLPlugin(),
       //非js的文件单独打包 比如css
       new MiniCssExtractPlugin({
          // Options similar to the same options in webpackOptions.output
          // all options are optional
          filename: '[name].css',
          chunkFilename: '[id].css',
          ignoreOrder: false, // Enable to remove warnings about conflicting order
        }),
     ],
     //webpack原生只支持js文件类型，只支持ES5语法，我们使用以.vue文件名结尾的文件时，需要为其指定loader
    module: {
       rules: [
         {
           test: /\.vue$/,
           loader: 'vue-loader'
         },
        //  {
        //     test:/\.css$/,
        //     use:[
        //       'style-loader',
        //       'css-loader'
        //     ]
        //  },
        //  {
        //    test: /\.styl/,
        //    use: [
        //      'style-loader',
        //      'css-loader',  
        //      {
        //         loader:'postcss-loader',
        //         options:{
        //          sourceMap: true 
        //         }
        //      } ,          
        //      'stylus-loader'
        //    ]
        //   },
         {
           test: /\.jsx$/,
           loader: 'babel-loader'
         },
         //将小于1024d的图片转为base64，减少http请求
         {
           test: /\.(gif|jpg|jpeg|png|svg)$/,
           use: [{
             loader: 'url-loader',
             options: {
               limit: 1024,
               name: '[name].[ext]',
               outputPath: 'assets/img/'
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
// 开发环境
if(isDev){
    config.module.rules.push({
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
    });
  config.devtool='#cheap-module-eval-source-map'
  config.devServer={
    port:8080,
    host:'0.0.0.0',
    overlay:{
      errors:true
    },
    hot:true
  }
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  )

}else{
  config.entry={
    app:path.join(__dirname,'src/index.js'),
    vendor:['vue']
  }
  config.output.filename = '[name].[chunkhash:8].js';
  config.module.rules.push(
      //css预处理器，使用模块化的方式写css代码
      //stylus-loader专门用来处理stylus文件，处理完成后变成css文件，交给css-loader.webpack的loader就是这样一级一级向上传递，每一层loader只处理自己关心的部分
      {
        test: /\.styl/,
        use: [{
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it uses publicPath in webpackOptions.output
              publicPath: './',
              hmr: process.env.NODE_ENV === 'development',
            },
          },
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          },
          'stylus-loader'
        ]
      },
  );
   config.plugins.push(
     new MiniCssExtractPlugin({
       // Options similar to the same options in webpackOptions.output
       // all options are optional
       filename: 'styles.[chunkhash].[name].css',
       chunkFilename: '[id].css',
       ignoreOrder: false, // Enable to remove warnings about conflicting order
     })
   );
}


module.exports=config