<template>
    <div class="search-content">
            <!-- <p>搜索详细页</p>
            <button @click="closeSearch">关闭</button> -->
            <i class="el-icon-arrow-left" @click="closeSearch" id="iconBack"></i>
      <div class="search-bar">
             <input type="text" placeholder="请输入搜索关键字" v-model="searchKeys"> 
             <button @click="toSearch" class=" iconfont icon-fangdajing">搜索</button>
         </div>  
         <div class="search-body">           
             <p class="no-result" v-if="showTips">未查询到相关结果</p>
          <div class="homelive" v-for="(items,i) in searchResultList" :key="i">
            <div class="homelive-title"><span>{{items.cate_name}}</span></div>
            <div class="homelive-content">
                <div class="room-item" v-for="(item,i) in items.live_list" :key="i" @click="searchtoLivingroom(item.room_id,item.room_pv)">
                    <div class="room-itemshow">
                         <div class="room-itemShowImg"><img :src="item.room_cover" alt="">
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
    </div>
</template>

<script>
export default {
    props: {

    },
    data() {
        return {
          showTips:false,//查询未果的显示  
          searchKeys:'',
          searchResultList:[]
        };
    },
    methods: {
      closeSearch(){
        //向父组件传值
          this.$emit('topassSreachVal',false);
      },
      toSearch(){
       //搜索结果
        window.console.log('结果');
       
        let params={
         keyword:this.searchKeys,
         cate_id:''   
        };
        this.$http.getSearchResult(params).then(res=>{
             this.showTips=false;
            window.console.log(res);
            if(res.data.code==200){
             let reasult=res.data.data.hot_list ;
            let obj={}
                obj.live_list=reasult;
                obj.cate_name="搜索结果";
                obj.cate_id=666;
                this.searchResultList.push(obj)

                 window.console.log( this.searchResultList,'777777777'); 
            }else{
                 this.showTips=true;
            }
        })
      },
      searchtoLivingroom(roomId,num){
           this.$router.push({ name: 'room', params: { id: roomId }}); //编程式导航
    //    window.localStorage.setItem('peoples',num)
      }   
    },
    computed: {

    },
    created() {

    },
    mounted() {

    },
    watch: {

    },
    components: {

    },
};
</script>

<style>
.search-content {
    padding-top: 10px;
    position: fixed;
    top: 0px;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #fff;
    z-index: 2000;
}
.search-content #iconBack{
   position: absolute;
   font-size: 26px;
   color: #ccc;
   z-index: 20;
}
.search-content .search-bar{
  position: relative;  
  padding-left: 10%;
}
.search-content .search-bar input{
    border: none;
    background-color: #f8f8f8;
    border-radius: 15px;
    height: 30px;
    width: 66%;
    padding-left: 40px;
}
@media (min-width: 640px) and (max-width: 1300px) {
  .search-content .search-bar input{
        width: 85%;  
  }  
}
.search-content .search-bar button{
    font-size: 15px;
    line-height: 28px;
    float: right;
    outline: none;
    border: none;
    background-color: #fff;
}
.search-content .search-body .no-result{
    text-align: center;
    color: #aaa;
    line-height: 410px; 
}
</style>
