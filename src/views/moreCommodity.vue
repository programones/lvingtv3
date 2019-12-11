<template>
  <div class="more-commodity">
      <i class="el-icon-arrow-left" id="iconBack" @click="toback"></i>
    <div class="commodity-header">
      <!-- <span class="close">关闭</span> -->
      <span class="search">搜索</span>
    </div>
    <div class="commodity-body">
      <div class="commodity-item" v-for="(item,i) in goodsList" :key="i" @click="toDetile(item)">
        <div class="left">
         <img :src="item.goods_image" alt="" width="100%" height="100%">
        </div>
        <div class="right">
          <p class="title">{{item.goods_title}}</p>
          <div class="desc">{{item.goods_desc}}</div>
          <div class="price">
            <span class="p-price">￥{{item.goods_price}}</span>
            <span class="t-price">￥{{item.goods_marketprice}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:"moreCommodity",
  props: {},
  data() {
    return {
        pageNum:1,//默认请求的页数
        goodsList:[],//商品列表
    };
  },
  methods: {
      getList(){
          //获取更多商品列表
          this.$http.getcommodityList(this.pageNum).then(res=>{
              window.console.log(res);
              this.goodsList=res.data.data.data
          })
      },
      toDetile(val){
          //点击前往商品详细
          window.console.log(val);
            this.$router.push({
            name:"productDetails",
            params:{id:this.$route.params.id},
            query:{"uid":2757,"goods_id":val.goods_id}     
        })
      },
      toback(){
          //返回上一页;
          this.$router.go(-1)
      }
  },
  computed: {},
  created() {},
  mounted() {
       this.getList()
  },
  watch: {},
  components: {}
};
</script>

<style>
.more-commodity #iconBack {
    border: 1px solid;
    z-index: 1;
    color: #ccc;
    padding-top: 4px;
    text-align: center;
    position: fixed;
    top: 0px;
    left: -1px;
    font-size: 35px;
    opacity: 0.5;
}
.more-commodity .commodity-header {
  height: 40px;
  border-bottom: 1px solid #ddd;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: #fff;
}
.more-commodity .commodity-header .search{
 float: right;
}
.more-commodity .commodity-body .commodity-item{
  border-bottom: 1px solid #ddd;
  padding: 15px 10px;
  overflow: hidden;
  background-color: #fff;
}
.more-commodity .commodity-body {
 margin-top: 40px;
}
.more-commodity .commodity-body .commodity-item .left{
    float: left;
    width: 100px;
    height: 100px;
    border: 1px solid #ddd;
}
.more-commodity .commodity-body .commodity-item .right{
    float: right;
    padding-left: 10px;
    width: calc(100% - 102px);
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}
.more-commodity .commodity-body .commodity-item .right .price{
  line-height: 40px;
}
.more-commodity .commodity-body .commodity-item .right .title{
     font-size: 14px;
    font-weight: 600;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    word-wrap: break-word;   
}
.more-commodity .commodity-body .commodity-item .right .desc{
    padding: 0;
    margin: 5px 0;
    color: #999;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis; 
}
.more-commodity .commodity-body .commodity-item .right .p-price{
  color: #f60;
font-size: 18px; 
}
.more-commodity .commodity-body .commodity-item .right .t-price{
    margin-left: 10px;
    font-size: 12px;
    color: #757575;
    text-decoration: line-through;
}

</style>
