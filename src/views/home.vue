<template>
    <div>
        <!-- 头部标题部分 -->
       <div class="header">
           <div class="header-logo">
               <!-- logo栏 -->
               <div class="homehead-logo"><img src="../assets/logo.954b7a4e.png" alt="" width="100%" height="100%"></div>
               <!-- 搜索栏(跳转页面) -->
               <div class="header-search" @click="toFind"><i class=" iconfont icon-fangdajing"></i><span>搜索</span>
             
               </div>
           </div>
           <div class="header-title">
               <div class="header-ul">              
                   <ly-tab
                        v-model="selectedId"
                        :items="headLists"
                        :options="options"
                        @change="headTitle"
                         >
                     </ly-tab>
               </div>            
           </div>
       </div>
        <!--直播间内容展示  -->
        <div class="homepage-bottom"  ref="contentRoom">
           <div class="homelive" v-for="(items,i) in cateList" :key="i">
            <div class="homelive-title"><span>{{items.cate_name}}</span></div>
            <div class="homelive-content">
                <div class="room-item" v-for="(item,i) in items.live_list" :key="i" @click="toLivingroom(item.room_id,item.room_pv)">
                    <div class="room-itemshow">
                         <div class="room-itemShowImg"><img :src=item.room_cover alt="">
                          </div>
                         <div class="room-itemShowHot"><i class="iconfont icon-fire"></i> {{item.room_pv}}
                         </div>
                         <div class="room-itemShowSmallTitle"><i class="iconfont icon-touxiang"></i><span>{{item.room_title}}</span></div>
                     </div>
                    <div class="room-itemTitle">{{item.room_desc}}</div>                   

                 </div>
             </div>
         </div>     
         </div>
        <footer-ele :boxContent="boxheight"></footer-ele>
    </div>
</template>
<script>
import {http} from '../http/http';
import footerEle from '../components/home-about/footer.vue';
// import { log } from 'util'

export default {
    components :{
    footerEle
    },
     data(){
    return {
      current:1,
      selectedId: 0,
      headLists: [],//导航栏名称列表
      options: {
      activeColor: '#48c8d6',
      // 可在这里指定labelKey为你数据里文字对应的字段
      labelKey:'name',
      additionalX:0,
      },
        hotList:[],//热门列表
       cateList:[],//分类列表包括热门
       allList:[],//总分类列表
       boxheight:'',//列表的高度     
        }
    },
    methods:{
        //切换头部tab栏时候触发的点击事件  
      headTitle(item,index){
         this.cateList=[]
         if(index==0){
          this.cateList=this.allList 
         }else{
          this.cateList[0]=this.allList[index];
         }
    //   this.boxheight=index
       setTimeout(()=>{
           this.boxheight=this.$refs.contentRoom.offsetHeight
        //    window.console.log(this.boxheight);
       },0)
      },
      toFind(){
          //搜索点击触发事件
       alert(1111);
    //    this.$router.push('search')
      },
      toLivingroom(roomId,num){
    //    window.console.log(roomId);  
       this.$router.push({ name: 'room', params: { id: roomId }}); //编程式导航
       window.localStorage.setItem('peoples',num)
      }
    },
    created(){
        http.headList().then(res=>{//获取Hand数据
            // window.console.log(res);
            var firstPage = {
                id:0,
                name:'首页'
            }
            var resData = res.data.data
           resData.unshift(firstPage)
          this.headLists=resData         
        }),
        http.livingTvList().then(res=>{
             window.console.log(res);
             this.cateList=res.data.data.cate_list    
             let emptyObj = {}
             this.hotList=res.data.data.hot_list
            emptyObj.cate_id=0;
            emptyObj.cate_name="热门";
            emptyObj.live_list=this.hotList;
            emptyObj.live_num=this.hotList.length        
             this.cateList.unshift(emptyObj);
             this.allList=JSON.parse(JSON.stringify(this.cateList));//深拷贝处理后的列表
             window.console.log(this.cateList);
            
        })
    },
}
</script>
<style>
  .header{
    background-color: #fff;
    position: fixed;
     z-index: 100;
     top: 0;
     width: 100%;
     height: 100px;
     font-size: 16px;
  }
  .header .header-logo{
   position: absolute;
   height:54px;
   width: 100%;
   top: 0;
   padding: 10px;
   box-sizing: border-box;
  }
   .header .header-logo .homehead-logo {
       float: left;
       width: 76px;
       height: 34px;
   }
   .header .header-logo .header-search span {
       padding-left: 8px;
       font-size: 15px;
   }
   .header .header-title .ly-tabbar{
       box-shadow: 0 0px 6px 1px #fff;
       border-bottom: 1px solid #f2f2f2;
   }
   .header .header-logo .header-search {
       float: left;
       margin-left: 10px;
       width: 12.5rem;
       height: 28px;
       background-color: #f2f2f2;
       padding: 3px;
       border-radius: 15px;
       padding-left: 10px;
       box-sizing: border-box;
   }
    .header .header-logo .header-search i {
        font-size: 20px
    }
  .header .header-ul {
      width: 100%;
      position: absolute;
      bottom: 0;
    float: left;
  }
 
  .header .ly-tab-active-bar{
    display: none;
 }
  .header .header-icon {
      float: right;
      height:40px;
      width: 41px;
      /* border-left: 1px #ccc solid; */
      padding: 10px;
      box-sizing: border-box;
  
  }
   .header .header-icon i {
     vertical-align: middle;
       font-size: 20px;
   }
   .homepage-bottom {
       margin-top: 100px;
        width: 100%;
   }
   .homelive {
       width: 100%;
       /* padding: .5rem; */
       box-sizing: border-box;
       
   }
    .homelive .homelive-title {
        width: 100%;
        height: 42px;
        font-size: 15px;
        text-indent: 30px;
        line-height: 42px;
    }
     .homelive .homelive-content {
         margin-top: .625rem;
     }
      .homelive .homelive-content .room-item{
         position: relative;
         width: 9.5rem;
         height: 9.8rem;
         display: inline-block;
         margin-left: .3125rem;
     }
     .homelive .homelive-content .room-item .room-itemshow { 
        overflow: hidden;
        border-radius: 3px;
        height: 8.4375rem;
        position: relative;
     }
    .homelive .homelive-content .room-item .room-itemshow .room-itemShowImg img {
        width: 100%; 
        height: 8.4375rem;
    }
     .homelive .homelive-content .room-item .room-itemTitle{
         width: 100%;
         overflow: hidden;
         white-space: nowrap;    
         text-overflow: ellipsis;    
     }
     .homelive .homelive-content .room-item .room-itemshow .room-itemShowHot {
         position: absolute;
         width: 100%;
         top: 0;
         color: #fff;
         text-align: right;
          background: linear-gradient(transparent,rgba(0,0,0,.1));  
     }
     .homelive .homelive-content .room-item .room-itemshow .room-itemShowSmallTitle{
         position: absolute;
         bottom: 0;
         color: #fff;
         line-height: 17px;
         width: 100%; 
         background: linear-gradient(transparent,rgba(0,0,0,.8));
         overflow: hidden;
         white-space: nowrap;
         text-overflow: ellipsis;
     }
     .homelive .homelive-content .room-item .room-itemTitle {
         position: absolute;
         bottom: .425rem;
     }
</style>