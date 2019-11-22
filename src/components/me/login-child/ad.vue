<template>
    <div class="advert">
        <div class="box" v-for="i in 3" :key="i">
          <div class="box-header">
              <span>积分商城</span>
              </div>  
          <div class="box-body">
              <div class="box-container">
                  <div class="box-img">
                      <img src="https://bi.psvideo.cn/uploads/goodsImg/20190606/5cf8bb36df0f4.jpg" alt="【测试商品1】2018新款 Apple/苹果 MacBook Pro 13.3英寸四核i" width="100%" height="100%">
                  </div>
                  <div class="box-content">
                    <p class="goods-title">【测试商品1】2018新款 Apple/苹果 MacBook Pro 13.3英寸四核i</p>    
                    <p class="goods-config">四核i5/8G内存/256G固态 带Touch Bar</p>
                    <div class="price">
                        <p>原价¥ <span>13888.00</span></p>
                    </div>
                    <div class="price">
                        <p>积分兑 <span>13888.00</span></p>
                    </div>
                  </div>
              </div>
          </div>
          <div class="box-footer">
              <p>更多商品</p>
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

        };
    },
    methods: {

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
    .box{
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
    .box .box-body {
    
    }
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
     .box .box-footer p{
     padding: 8px 0 0;
    color: #3c8dbc;
    font-size: 14px;
    text-align: center;
    display: block;
       }
</style>
