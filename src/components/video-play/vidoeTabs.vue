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
        <chart-room v-show="thistab=='interactive'"></chart-room>  
       <me v-show="thistab=='me'"></me>   
        <record v-if="thistab=='record'"></record>     
        <paytheme v-show="thistab=='mogao'"></paytheme>  
        <rank-list v-if="thistab=='inviteRankList'"></rank-list>
        <brand v-if="thistab=='origin'"></brand>                                            
      </div>
   
    </div>
</template>


<script>
import {http} from '../../http/http';
import chartRoom from './videoTabsChat';
import me from './videoTabsMe';
import record from './videoTabsRecord';
import paytheme from './videoTabsPaytheme';
import rankList from './videoTabsRanklist';
import brand from './videoTabsBrand';
export default {
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
      additionalX:0,
      }, 
       thistab:'interactive',         
        }
    },
    methods: {
        headTitle(item,index){
            window.console.log(item,index);
            this.thistab=item.column_api
        }
        
    },
    created() {
     http.roomtabs(this.$route.params.id).then(res=>{
        
         if(res.data.code==200) {
             this.tabsArr = res.data.data;
              window.console.log(this.tabsArr)
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
    line-height: 4px;
    }
    .tab-content {
    
    box-sizing: border-box;
    position: absolute;
    width: 100%;
    height: 62%;
    border: 6px rgba(241, 241, 239, 0.836) solid;
    }
</style>