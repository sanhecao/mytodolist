//const docsLoader=require.resolve('./doc-loader');
module.exports=(isDev)=>{
  return{
    preserveWhitepace:true,//清除空格
    extractcss: !isDev,//将vue中的样式单独打包
    cssModules:{},
  //  hotReload:false
   // loaders:{
  //    'docs': docsLoader
   // }
     //多次解析
     preLoader:{

     }
  }

}