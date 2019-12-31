<template>
    <div class="about-me">
    <registered v-if="showreg" @close="close" :wechatData="wechatData"></registered>  
   
    <login  v-if="showlogin"></login>  
    
    
    </div>
</template>

<script>
import registered from '../me/registered';
import login from '../me/login';
import {getCookie,delCookie} from '../../api/aboutCookies';
export default {
   name: 'videoTabsMe',
   props: ['wechatData'],
    components:{
    registered,
    login
    },
    data(){
        return {
         showreg:true,
         showlogin:false,   
        }
    },
    methods: {
      close(data){
        this.showreg=data.value;
        this.showlogin=!data.value;
      }  ,
      //判断当前koten是否有效
    async iftokeEle(){
     let {data} = await  this.$http.userIfourl(getCookie('token'));
     window.console.log('这个token是否有效==>',data)
     if(data.code==501){
        window.localStorage.setItem('token',0);
        delCookie('token')
        this.$notify({
                title: '未注册或身份过期,请重新登陆',
                position: "bottom-left",
                duration: 3000 //设置0的话的则不会关闭
              }); 
              //是否显示登陆框和登录后界面
           this.showreg=true;
        this.showlogin=false; 
      }else{
         this.showreg=false;
        this.showlogin=true;
      }

      }
    },
    created(){

    },
    mounted() {
      // window.setTimeout(()=>{
         this.iftokeEle();
      // },1000)
     
      // if(window.localStorage.getItem('token')){
      //    this.showreg=false;
      //   this.showlogin=true;
      // }else{
      //   this.showreg=true;
      //   this.showlogin=false; 
      // }
  
    },
}
</script>
<style>
    .about-me{
    position: relative;
    overflow-y: auto;
    height: 21rem;
    }
      @media (min-width: 767px) and (max-width: 1300px) {
    .about-me{
      height: 13rem;
      }
       }
      @media (min-height: 810px) and (max-height: 830px) {
    .about-me{
      height: 29rem;
      }
       }
</style>