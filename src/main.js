import Vue from 'vue'
import App from './App.vue'
//导入element UI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
 //导入自定义路由模块
import router from './router/router.js'
 //导入手机端屏幕适配文件
import './base/rem.js'
// import 'amfe-flexible/index.js'
//导入初始化样式
import './base/base.css'
//导入字体图标
import './base/iconfont.css'
import LyTab from 'ly-tab' //导入滑动插件
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(LyTab);
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
