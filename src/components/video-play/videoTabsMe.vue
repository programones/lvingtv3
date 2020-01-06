<template>
    <div class="about-me">
    <registered v-if="showreg" @close="close" :wechatData="wechatData"></registered>  
   
    <login  v-if="showlogin"></login>  
    
    
    </div>
</template>

<script>
import registered from '../me/registered';
import login from '../me/login';
import {setCookie,getCookie,delCookie} from '../../api/aboutCookies';
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
         isWeixin:false,
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
          if(this.isWeixin) {
            //已经注册的用户自动登陆
            window.console.log('进入token失效自动登陆状态')
            let paramsList = {
              auth_id:getCookie('openid'),
              type:"wechat"
            }
            this.$http.getLoginOther(paramsList).then(res=>{
              window.console.log('有openid的情况下自动登陆获取的数据=>',res)
              if(res.data.code == 200) {
                setCookie('token',res.data.data.token,7);
                window.localStorage.setItem('token',res.data.data.token)
                setCookie('uid',res.data.data.uid,7);
                // if(!+window.localStorage.getItem('token')){
                     window.setTimeout(()=>{
                  //自动登陆
                  window.location.reload()
                },50)
                // }
               
                  
              }
            })

          }
      }else{
         this.showreg=false;
        this.showlogin=true;
      }

      }
    },
    created(){

    },
    mounted() {
      // 判断是否是微信浏览器
        let ua = navigator.userAgent.toLowerCase();
        this.isWeixin = ua.indexOf('micromessenger') != -1;
      window.setTimeout(()=>{
         this.iftokeEle();
      },1000)
     
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