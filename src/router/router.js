import Vue from 'vue'
// 导入路由
import VueRouter from 'vue-router'
Vue.use(VueRouter)
// 准备规则
import home from '../views/home.vue'
import room from '../views/room.vue'
import search from "../views/search.vue"
import personalCenter from "../views/personalCenter.vue"
import mogaoDetails from "../views/mogaoDetails.vue"
import moreCommodity from "../views/moreCommodity.vue"
import productDetails from "../views/productDetails.vue"
import questionform from "../views/questionForm.vue"
const routes = [
  { path: "/", 
	redirect:"/home"
  },
  {
   path:"/home",
   component: home,
   name:"home"
  },
   {
     path:"/search",
     component: search,
     name:"search"
   },
   {
     path:'/room/:id',
     component:room,
     name:"room"
   },
   {
     //个人中心
     path:'/personalCenter/:id',
     component:personalCenter,
     name:"personalCenter"
   },
   {
     path:'/mogaoDetails/:id',
     component:mogaoDetails,
     name:"mogaoDetails"
   },
   {
     //更多商品列表
     path:'/moreCommodity/:id',
     component:moreCommodity,
     name:"moreCommodity"
   },
   {
     //商品详细
     path:'/productDetails/:id',
     component:productDetails,
     name:"productDetails"
   },
   {
     //调查问卷
     path:'/questionform/:id',
     component:questionform,
     name:"questionform"
   },
  ]
  const router = new VueRouter({
  routes
})
export default router;