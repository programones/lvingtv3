
module.exports = {
    // 打包的根路径 使用的是相对
    // publicPath:'./',
    filenameHashing: false,
    productionSourceMap:false,
    configureWebpack:{
        externals: {
        //    'vue': 'Vue',
        //    'vue-router':'VueRouter',
        //    'axios': 'axios',
        //   'element-ui':"ElEMENT"
        }
      }

}