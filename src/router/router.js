import Vue from 'vue'
// 导入路由
import VueRouter from 'vue-router'
Vue.use(VueRouter)
// 准备规则
// import home from '../views/home.vue'
// import room from '../views/room.vue'
// import search from "../views/search.vue"
// import personalCenter from "../views/personalCenter.vue"
// import mogaoDetails from "../views/mogaoDetails.vue"
// import moreCommodity from "../views/moreCommodity.vue"
// import productDetails from "../views/productDetails.vue"
// import questionform from "../views/questionForm.vue"
const routes = [
  
  { path: "/", 
	redirect:"/home"
  },
  {
   path:"/home",
   component: ()=> import('../views/home.vue'),
   name:"home"
  },
   {
     path:"/search",
     component: ()=> import('../views/search.vue'),
     name:"search"
   },
   {
     path:'/room/:id',
     component:()=> import('../views/room.vue'),
     name:"room"
   },
   {
     //个人中心
     path:'/personalCenter/:id',
     component:()=> import('../views/personalCenter.vue'),
     name:"personalCenter"
   },
   {
     path:'/mogaoDetails/:id',
     component:()=> import('../views/mogaoDetails.vue'),
     name:"mogaoDetails"
   },
   {
     //更多商品列表
     path:'/moreCommodity/:id',
     component:()=> import('../views/moreCommodity.vue'),
     name:"moreCommodity"
   },
   {
     //商品详细
     path:'/productDetails/:id',
     component:()=> import('../views/productDetails.vue'),
     name:"productDetails"
   },
   {
     //调查问卷
     path:'/questionform/:id',
     component:()=> import('../views/questionForm.vue'),
     name:"questionform"
   },
   {
    path: '*',
    name: 'noF',
    component:()=> import('../views/notFound.vue')
  },
  ]
  const router = new VueRouter({
  routes,
  mode: 'history',
 
})
export default router;