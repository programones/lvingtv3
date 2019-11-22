import Vue from 'vue'
// 导入路由
import VueRouter from 'vue-router'
Vue.use(VueRouter)
// 准备规则
import home from '../views/home.vue'
import room from '../views/room.vue'
import search from "../views/search.vue"
import personalCenter from "../views/personalCenter.vue"
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
     path:'/personalCenter/:id',
     component:personalCenter,
     name:"personalCenter"
   },
  ]
  const router = new VueRouter({
  routes
})
export default router;