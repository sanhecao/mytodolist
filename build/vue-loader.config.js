//const docsLoader=require.resolve('./doc-loader');
module.exports=(isDev)=>{
  return{
    preserveWhitespace: true, //清除空格
    extractcss: !isDev,//将vue中的样式单独打包
    // cssModules:{
    //   localIdentName:'[path]-[name]-[hash:base64:5]',
    //   comelCase:true
    // },
    
  //  hotReload:false
   // loaders:{
  //    'docs': docsLoader
   // }
     //多次解析
   //  preLoader:{

    // }
  }

}