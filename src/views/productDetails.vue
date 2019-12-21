<template>
  <div>
    <div
      class="product_detile"
      v-loading="loadingProduct"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
    >
      <div class="pro-nav">
        <i class="el-icon-arrow-left" id="iconBack" @click="tobackPage"></i>
      </div>
      <div class="img">
        <img :src="thatGoodsIfo.goods_image" alt width="100%" />
      </div>
      <div class="section">
        <div class="price">
          <span class="points">{{thatGoodsIfo.goods_points}}</span>
          <span>积分</span>
        </div>
        <div class="special-price">
          价格
          <span class="false-price">￥{{thatGoodsIfo.goods_price}}</span>
        </div>
        <p class="title">{{thatGoodsIfo.goods_title}}</p>
        <p class="desc">{{thatGoodsIfo.goods_desc}}</p>
        <div class="details-container" v-html="thatGoodsIfo.goods_details"></div>
      </div>
      <div class="comment">
        <div class="comment-item" v-for="(item,i) in thatgoodsComment" :key="i">
          <div class="comment-header">
            <span>
              <img :src="item.user_image" alt width="30" height="30" />
            </span>
            <div class="nickname">{{item.user_name}}</div>
          </div>
          <div class="comment-time">{{item.add_time}}</div>
          <div class="comment-content">{{item.content}}</div>
        </div>
      </div>

      <button id="btn" @click="toShowMask">兑换商品</button>
    </div>
    <div class="goods-mask" v-if="mask">
        <i class="el-icon-close" id="iconX" @click="closeMask"></i> 
      <div class="widgets-content">
        <div class="widgets-header">
          <span class="img">
            <img :src="thatGoodsIfo.goods_image" width="104" height="104"/>
          </span>
          <span class="right">
            <div class="price">￥{{thatGoodsIfo.goods_price}}</div>
            <div class="stock">库存 {{thatGoodsIfo.goods_storage}}件</div>
          </span>
          <div class="close"></div>
        </div>
        <div class="num">
          <span class="left">购买数量</span>
          <span class="right">
            <el-input-number v-model="num" @change="numChange" :min="1" :max="+thatGoodsIfo.goods_storage" ></el-input-number>
          </span>
        </div>
        <button @click="toExchangeGoods">确定</button>
      </div>
    </div>
  </div>
</template>

<script>
import {getCookie} from '../api/aboutCookies'
export default {
  props: {},
  data() {
    return {
      thatGoodsIfo: {}, //商品信息 user_name
      thatgoodsComment: [], //商品评论
      loadingProduct: false,
      mask: false, //兑换商品的遮罩层
      num:1,
    };
  },
  methods: {
    getGoodsDetile() {
      //   获取商品详细信息
      let goods_id = this.$route.query.goods_id;
      this.lloadingProduct = true;
      this.$http.getgoodsDetile(goods_id).then(res => {
        window.console.log(res, goods_id);
        if (res.data.code == 200) {
          this.lloadingProduct = false;
          this.thatGoodsIfo = res.data.data.goodsInfo;
          this.thatgoodsComment = res.data.data.goodsComment;
        }
      });
    },
    tobackPage() {
      //返回上一页
      this.$router.go(-1);
    },
    toShowMask() {
      //点击显示遮罩层
      window.console.log("兑换商品~~");
      this.mask=true;
    },
    numChange(){
     //点击增加或减少商品的时候
    },
    closeMask(){
        //点击隐藏遮罩层
        this.mask=false;
    },
    toExchangeGoods(){
      //点击发起兑换请求
      let params={
        goods_id:this.$route.query.goods_id,
        member_token:getCookie('token'),
        num:this.num
      }
      this.$http.getgoodsExchange(params).then(res=>{
          window.console.log(res,'兑换提示');
          if(res.data.code==200){
               this.$notify({
          title: '提示',
          type:"success",
          message: '兑换成功!',
          position: 'bottom-left',
      		duration:2000,//设置0的话的则不会关闭
         });
         }else{
              this.$notify({
          title: '兑换失败',
          type:"warning",
          message: res.data.msg,
          position: 'bottom-left',
      		duration:2000,//设置0的话的则不会关闭
        });
         }
      })
    }
  },
  computed: {},
  created() {},
  mounted() {
    this.getGoodsDetile();
  },
  watch: {},
  components: {}
};
</script>

<style>
.goods-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
}
.goods-mask #iconX{
   z-index: 1;
    color: #000;
    padding-top: 4px;
    text-align: center;
    position: absolute;
    bottom: 189px;
    right: 5px;
    font-size: 23px;
    border-radius: 50%;   
}
.product_detile {
  position: relative;
}
.product_detile .pro-nav #iconBack {
  border-radius: 26px;
  background-color: #ccc;
  z-index: 1;
  color: #fff;
  padding-top: 4px;
  text-align: center;
  position: fixed;
  top: 0px;
  left: 5px;
  font-size: 35px;
  opacity: 0.5;
}
.product_detile #btn {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  color: #fff;
  border: none;
  background-color: #ff9500;
  font-size: 16px;
  padding: 12px;
}
.product_detile .section {
  padding: 2px 15px;
  background-color: #fff;
}
.product_detile .section .price {
  color: #ff5000;
  font-size: 25px;
  margin: 15px 0 0;
}
.product_detile .section .special-price {
  font-size: 12px;
  color: #999;
  margin-bottom: 15px;
}
.product_detile .section .special-price .false-price {
  text-decoration: line-through;
}
.product_detile .section .title {
  line-height: 23px;
  font-size: 18px;
  font-weight: 600;
}
.product_detile .section .desc {
  line-height: 20px;
  margin-bottom: 15px;
  padding: 0;
}
.product_detile .section .details-container {
  font-size: 16px;
}
.product_detile .comment {
  padding-top: 15px;
  padding-left: 15px;
  margin-bottom: 70px;
}
.product_detile .comment .comment-item .comment-header {
  font-size: 16px;
}
.product_detile .comment .comment-item .comment-header img {
  border: 1px solid #ccc;
  border-radius: 50%;
}
.product_detile .comment .comment-item .comment-time {
  margin: 8px 0;
  font-size: 12px;
  color: #999;
}
.product_detile .comment .comment-item .comment-content {
  line-height: 30px;
  font-size: 16px;
}
.product_detile .comment .comment-item .comment-header .nickname {
  display: inline-block;
  text-indent: 10px;
}
 .goods-mask .widgets-content{
     padding: 15px 15px 48px;
    background-color: #fff;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
 }
 .goods-mask .widgets-content .num{
    overflow: hidden;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    padding: 20px 7px;
    line-height: 40px;
 }
 .goods-mask .widgets-content .num .right{
  float: right;
 }
 .goods-mask .widgets-content .widgets-header{
    overflow: hidden;
    height: 80px; 
 }
 .goods-mask .widgets-content .widgets-header .img{
    padding: 1px;
    height: 100px;
    width: 100px;
    display: inline-block;
    position: absolute;
    top: -35px;
    left: 15px;
    border: 1px solid #a7a7a7;
    -webkit-box-shadow: none;
    box-shadow: none;
    background-color: #fff;
    overflow: hidden;
 }
 .goods-mask .widgets-content .widgets-header .right{
    padding-top: 10px;
    width: calc(100% - 115px);
 }
 .goods-mask .widgets-content .widgets-header .right .price{
    margin-top: 15px;
    color: #f60;
    font-size: 16px;
    padding-left: 120px;
 }
 .goods-mask .widgets-content .widgets-header .right .stock{
    padding-left: 120px;  
    line-height: 25px; 
 }
 .goods-mask .widgets-content button{
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    background-color: #f60;
    border: none;
    color: #fff;
    padding: 10px;
 }
</style>
