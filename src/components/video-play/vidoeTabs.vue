<template>
    <div>
      <h1 class="tabs-title">直播播放标签tab栏切换</h1>  
      <div class="columnUrl">
            <ly-tab
              v-model="selectedId"
              :items="tabsArr"
              :options="options"
              @change="headTitle"
               >
           </ly-tab>
      </div>
      <div class="tab-content">
          <transition-group name="component-fade" mode="in-out">
        <chart-room v-if="thistab=='interactive'" key="one"></chart-room>  
        <me v-show="thistab=='me'" key="two" :wechatData="wechatData"></me>   
        <record v-if="thistab=='record'" key="three"></record>     
        <paytheme v-show="thistab=='mogao'" key="four"></paytheme>  
        <rank-list v-if="thistab=='inviteRankList'" key="five"></rank-list>
        <brand v-if="thistab=='origin'" key="six"></brand> 

         </transition-group>                                              
      </div>
        
    </div>
</template>


<script>
// import {http} from '../../http/http';
import chartRoom from './videoTabsChat';
import me from './videoTabsMe';
import record from './videoTabsRecord';
import paytheme from './videoTabsPaytheme';
import rankList from './videoTabsRanklist';
import brand from './videoTabsBrand';
export default {
    name:"videoTabs",
    props: ['wechatData'],
    components:{
        chartRoom,
        me,
        record,
        paytheme,
        rankList,
        brand
    },
    data(){
        return {
        selectedId: 0,    
       tabsArr:[],//获取到的tab栏数组
       options: {
      activeColor: '#00ccfe',
      // 可在这里指定labelKey为你数据里文字对应的字段
      labelKey:'column_name',
      additionalX:10,
      }, 
       thistab:'interactive',         
        }
    },
    methods: {
        headTitle(item,index){
            // window.console.log(item,index);
            this.thistab=item.column_api
        //     if(item.column_api=='me'){
        //         // window.console.log(212121);
        //          window.setTimeout(()=>{
        //     if(!+window.localStorage.getItem("token") && this.isWeixin) {
        //     //已经注册的用户自动登陆
        //     let paramsList = {
        //       auth_id:this.wechatData.openid,
        //       type:"wechat"
        //     }
        //     this.$http.getLoginOther(paramsList).then(res=>{
        //       window.console.log('有openid的情况下自动登陆获取的数据=>',res)
        //       if(res.data.code == 200) {
        //         setCookie('token',res.data.data.token,7);
        //         window.localStorage.setItem('token',res.data.data.token)
        //         setCookie('uid',res.data.data.uid,7);
        //         // if(!+window.localStorage.getItem('token')){
        //         //      window.setTimeout(()=>{
        //         //   //自动登陆
        //         //   window.location.reload()
        //         // },50)
        //         // }
               
                  
        //       }
        //     })

        //   }
        //  },1000)
        //     }
        },
        
    },
    created() {
     this.$http.roomtabs(this.$route.params.id).then(res=>{
        
         if(res.data.code==200) {
             this.tabsArr = res.data.data;
            //   window.console.log(this.tabsArr)
         }
     })  
    },
    mounted(){

    }
}
</script>
<style>
    .tabs-title {
       opacity: 0;
    line-height: 6px;
    }
    .tab-content {
    overflow: auto;    
    box-sizing: border-box;
    position: absolute;
    width: 100%;
    height: 61%;
    border: 6px rgba(241, 241, 239, 0.836) solid;
    }
    .component-fade-enter-active, .component-fade-leave-active {
     transition: all .4s ease;
    }
    .component-fade-enter, .component-fade-leave-to {
     opacity: 0;
    transform: translate(600px,00px);
     }
     @media (min-width: 767px) and (max-width: 1300px) { 
         .tab-content{
              height: 50%;
         }
     }
    @media (min-width: 310px) and (max-width: 320px){
       .tab-content{
              height: 60%;
         }   
    }
      @media (min-height: 810px) and (max-height: 820px){
         .tab-content{
              height: 68%;
         }   
      }
</style>