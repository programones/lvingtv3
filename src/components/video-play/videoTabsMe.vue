<template>
    <div class="about-me">
    <registered v-if="showreg" @close="close" :wechatData="wechatData"></registered>  
   
    <login  v-if="showlogin"></login>  
    
    
    </div>
</template>

<script>
import registered from '../me/registered';
import login from '../me/login';
import {getCookie} from '../../api/aboutCookies';
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
      }  
    },
    created(){

    },
    mounted() {
      if(getCookie('token')){
         this.showreg=false;
        this.showlogin=true;
      }else{
        this.showreg=true;
        this.showlogin=false; 
      }
  
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
      height: 14rem;
      }
       }
      @media (min-height: 810px) and (max-height: 830px) {
    .about-me{
      height: 26rem;
      }
       }
</style>