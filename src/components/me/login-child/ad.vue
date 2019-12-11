<template>
  <div class="advert">
    <div class="box" v-for="(item,i) in goodsPointsList" :key="i">
      <div class="box-header">
        <span>积分商城</span>
      </div>
      <div class="box-body">
        <div class="box-container" @click="toProuctDetil(item.goods_id)">
          <div class="box-img">
            <img :src="item.goods_image" :alt="item.goods_title" width="100%" height="100%" />
          </div>
          <div class="box-content">
            <p class="goods-title">{{item.goods_title}}</p>
            <p class="goods-config">{{item.goods_desc}}</p>
            <div class="price">
              <p>
                原价¥
                <span>{{item.goods_price}}</span>
              </p>
            </div>
            <div class="price">
              <p>
                积分兑
                <span>{{item.goods_points}}.00</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="box-footer">
        <p @click="toMoreGoods">更多商品</p>
      </div>
    </div>
    <div class="box adboxactive" v-for="(item) in goodsHostList" :key="item.goods_id">
      <div class="box-header">
        <span>限时优惠</span>
      </div>
      <div class="box-body">
        <div class="box-container" @click="toProuctDetil(item.goods_id)">
          <div class="box-img">
            <img :src="item.goods_image" :alt="item.goods_title" width="100%" height="100%" />
          </div>
          <div class="box-content">
            <p class="goods-title">{{item.goods_title}}</p>
            <p class="goods-config">{{item.goods_desc}}</p>
            <div class="price">
              <p>
                原价¥
                <span>{{item.goods_price}}</span>
              </p>
            </div>
            <div class="price">
              <p>
                市场价
                <span>{{item.goods_marketprice}}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="box-footer">
        <p @click="toMoreGoods">更多商品</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      goodsPointsList: [], //积分商城商城列表
      goodsHostList: [] //限时优惠商品列表
    };
  },
  methods: {
    getadListHttp() {
      //获取商品列表
      this.$http.getadList().then(res => {
        window.console.log(res,'AD广告');
        if (res.data.code == 200) {
          this.goodsPointsList = res.data.data.goodsPoints;
          this.goodsHostList = res.data.data.goodsHot;
        }
      });
    },
    toMoreGoods() {
      //点击前往更多商品列表
      this.$router.push({
        name: "moreCommodity",
        params: { id: this.$route.params.id }
      });
    },
    toProuctDetil(thatID){
        this.$router.push({
            name:"productDetails",
            params:{id:this.$route.params.id},
            query:{"uid":2757,"goods_id":thatID}     
        })
    }
  },
  computed: {},
  created() {},
  mounted() {
    // this.$http
    // window.console.log(this.$http.getMoney(),'我的请求方法')
    this.getadListHttp();
  },
  watch: {},
  components: {}
};
</script>

<style>
.box {
  width: 90%;
  margin: 15px auto 0;
  background-color: #fff;
  border-radius: 4px;
  padding: 8px;
  border-top: 3px solid #3c8dbc;
  -webkit-box-shadow: 0 0 5px #8a8989;
  box-shadow: 0 0 5px #8a8989;
}
.box .box-header {
  text-align: center;
  padding-bottom: 8px;
  border-bottom: 1px solid #ddd;
  font-size: 16px;
}
/* .box .box-body {
    
    } */
.box .box-body .box-container {
  padding: 15px 4px;
  overflow: hidden;
  border-bottom: 1px solid #ddd;
}
.box .box-body .box-img {
  width: 40%;
  float: left;
}
.box .box-body .box-content {
  float: right;
  width: calc(60% - 8px);
}
.box .box-body .box-content .goods-title {
  line-height: 20px;
  font-size: 14px;
  font-weight: 500;
}
.box .box-body .box-content .goods-config {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 10px;
  color: #aaa;
}
.box .box-body .box-content .price {
  margin-top: 8px;
}
.box .box-body .box-content .price p {
  display: inline-block;
  border-radius: 4px;
  padding: 2px 4px;
  color: #fff;
  font-size: 12px;
  background-color: #f39c12;
}
.box .box-footer p {
  padding: 8px 0 0;
  color: #3c8dbc;
  font-size: 14px;
  text-align: center;
  display: block;
}
.advert .adboxactive {
  margin-bottom: 30px;
}
</style>
