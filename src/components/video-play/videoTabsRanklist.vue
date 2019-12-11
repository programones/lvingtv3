<template>
  <div class="rank-list">
    <p class="rank-title">粉丝邀请排行榜</p>
    <p class="no-rank-data" v-if="rList.length==0">暂时没有数据💁‍♀️</p>
    <ul class="rank-content">
      <li :data-ranking="i+1" class="rank-item" v-for="(item,i) in rList" :key="i">
        <span class="header-image">
          <img
            :src="item.headimgurl" width="25" height="25"/>
        </span>
        <span class="nickname">{{item.nickname}}</span>
        <span class="rank-num">{{item.count}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
        rList:[],//邀请排行的数组
    };
  },
  methods: {
     rankList(){
     this.$http.getRankList(this.$route.params.id).then(res=>{
       window.console.log(res);
       if(res.data.code==200){
         this.rList = res.data.data
       }
       
          }
          )
      }
  },
  computed: {},
  created() {},
  mounted() {
      this.rankList()
  },
  watch: {},
  components: {}
};
</script>

<style>
.rank-list {
  padding-bottom: 10px;
  height: 100%;
  background-color: #fff;
  border-radius: 4px;
  overflow-y: auto;
  position: relative;
}
.rank-list .no-rank-data{
    font-size: 16px;
    line-height: 130px;
    text-align: center;
}
.rank-list .rank-title {
  margin: 10px 0 15px 35%;
  display: inline-block;
  padding: 4px 10px;
  font-size: 14px;
  line-height: 20px;
  background-color: #64b3de;
  border-radius: 4px;
  color: #fff;
}
.rank-list .rank-content {
  overflow-y: auto;
  text-align: left;
}
.rank-list .rank-content li[data-ranking="1"]:before{
  background-image:url('../../assets/no_1.png');
    border-radius: 50%;
    color: transparent;
    transform:rotate(-30deg)
}
.rank-list .rank-content li[data-ranking="2"]:before{
  background-image:url('../../assets/no_2.png');
    border-radius: 50%;
    color: transparent;
    transform:rotate(-30deg)
}
.rank-list .rank-content li[data-ranking="3"]:before{
  background-image:url('../../assets/no_3.png');
    border-radius: 50%;
    color: transparent;
    transform:rotate(-30deg)
}
.rank-list .rank-content li::before{
     content: "";
    margin-right: 0;
    background-color: transparent;
    height: 20px;
    width: 20px;
     margin-right: 4px;
    height: 15px;
    width: 15px;
    padding-left: 7px;
    content: attr(data-ranking);
    background: no-repeat 50%/25px;
    /* display: inline-block; */
    float: left;
    
}
.rank-list .rank-content .rank-item {
  padding: 8px;
  border-bottom: 1px solid #ddd;
  overflow: hidden;
}
.rank-list .rank-content .rank-item .header-image{
    float: left;
    height: 19px;
    width: 19px;
    border-radius:50%;
    overflow: hidden; 
    vertical-align: middle;
}
.rank-list .rank-content .rank-item .nickname{
    color: #333;
    font-size: 14px;
    margin-left: 10px;
    float: left;
}
.rank-list .rank-content .rank-item .rank-num{
    float: right;
    font-size: 10px;
    vertical-align: middle;
    height: 100%;
    color: #f39c12;
}

</style>
