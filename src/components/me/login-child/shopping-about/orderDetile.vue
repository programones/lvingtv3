<template>
    <div class="order-detile">
         <i class="el-icon-close" id="iconX" @click="toCloseOrderDetile"></i>
         <div class="order-list">
           <li  v-for="(item,i) in orderList" :key="i" @click="toDetile(item)">
                  <p class="tit" v-if="item.extension == 'goods'">商品订单</p>
                  <p class="tit" v-if="item.extension == 'video'">节目订单</p>
                  <p class="tit" v-if="item.extension == 'live'">直播间付费订单</p>  
                 <div class="content">
                      <div class="left">
                          <img :src="item.goods_image" />
                      </div>
                      <div class="left dt">
                          <p class="title">{{item.goods_name}}</p>
                          <span class="desc">{{item.order_type == "1" ? '实体订单' : '虚拟订单'}}</span>
                      </div>
                      <div class="left total">
                          <p class="price">￥{{item.goods_price}}</p>
                          <span class="num">×{{item.goods_num}}</span>
                      </div>
                 </div>
                 <p class="summary">共{{item.goods_num}}件商品  合计：￥{{item.money}}</p>
                  <div class="btn-content">
                    <button v-if="item.state == 0">未付款</button>
                    <button v-if="item.state == 1">未发货</button>
                    <button v-if="item.state == 2">已发货</button>
                    <button v-if="item.state == 3 && item.is_comment == 0" @click="comment(item)">立即评价</button>
                </div>                         
               </li>  
          </div>
        <!-- <p>我的订单详细</p>
        <button @click="toCloseOrderDetile">关闭</button> -->
    <p class="no-order" v-if="orderList.length==0">暂时没有订单哦~~</p>
    </div>
</template>

<script>
import {http} from '../../../../http/http'
export default {
    name:'orederDetile',
    props: {

    },
    data() {
        return {
          orderList:[
            //   {
            //    extension:'goods',
            //     goods_image:'https://gju3.alicdn.com/tps/i3/O1CN01xOmEqI1hi1XwSbydo_!!0-juitemmedia.jpg_400x400Q90.jpg_.webp',
            //     goods_name:'爆甜！云南冰糖橙10斤大果（每个ID限购5件）',
            //     order_type:1,
            //     goods_price:29.8,
            //     goods_num:10,
            //     money:20,
            //     state:0,
            //     is_comment:1
            //   },
            //   {
            //    extension:'goods',
            //     goods_image:'https://gju3.alicdn.com/tps/i3/O1CN01xOmEqI1hi1XwSbydo_!!0-juitemmedia.jpg_400x400Q90.jpg_.webp',
            //     goods_name:'爆甜！云南冰糖橙10斤大果（每个ID限购5件）',
            //     order_type:1,
            //     goods_price:29.8,
            //     goods_num:10,
            //     money:20,
            //     state:0,
            //     is_comment:1
            //   },
            //   {
            //    extension:'goods',
            //     goods_image:'https://gju3.alicdn.com/tps/i3/O1CN01xOmEqI1hi1XwSbydo_!!0-juitemmedia.jpg_400x400Q90.jpg_.webp',
            //     goods_name:'爆甜！云南冰糖橙10斤大果（每个ID限购5件）',
            //     order_type:1,
            //     goods_price:29.8,
            //     goods_num:10,
            //     money:20,
            //     state:0,
            //     is_comment:1
            //   },
          ],
         pagenumbers:1,//开始请求的页数
        };
    },
    methods: {
     toCloseOrderDetile(){
        //点击关闭按钮事件
        let fatherBox = document.querySelector('.about-me');
        fatherBox.setAttribute('style','overflow-y:auto');
        window.console.log('orederDetile');
        this.$emit('topassThatVal',false);   
      },
      toDetile(){
        //点击显示细节信息  
      },
      getOrderList(){
            let params={
              member_token:"8b65f4b89c5082c8c968d1cdfb59ba7049947",
              page:this.pagenumbers  
            }
          http.getorderDetileList(params).then(res=>{
              window.console.log(res);
              if(res.data.code==200){
                this.orderList=res.data.data.data;  
              }
          })
      }
    },
    computed: {

    },
    created() {
      
    },
    mounted() {
    this.getOrderList();
    },
    watch: {

    },
    components: {

    },
};
</script>

<style>
    .order-detile{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #fff;
    z-index: 100;  
    }
    .order-detile #iconX{
    color: #aaa;
    padding-top: 4px;
    text-align: center;
    height: 28px;
    width: 28px;
    position: absolute;
    top: 5px;
    right: 5px;
    border: 1px solid #aaa;
    border-radius: 50%;
    box-sizing: border-box;
    font-size: 20px;    
    }


     .order-detile .order-list {
      overflow: auto;
       height: 100%;
       padding: 15px 15px 0;
    }
    .order-detile .order-list li {
        border: 1px solid #ccc;
        background-color: #fff;
        padding: 10px;
        font-size: 14px;
        border-radius: 10px;
        margin-bottom: 15px;
    }
    .order-detile .order-list li .tit {
        margin-bottom: 10px;
        font-size: 16px;
    }
    .order-detile .order-list li .content {
        overflow: hidden;
        margin: 10px 0;
    }
    .order-detile .order-list li .left{
      float: left;
    }
    .order-detile .order-list li .content img {
        margin-right: 10px;
        width: 100px;
        height: 100px;
    }
    .order-detile .order-list li .content .dt {
        float: right;
        line-height: 26px;
        width: calc(100% - 112px);
    }
    .order-detile .order-list li .content .dt p {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 4;
        overflow: hidden;
    }
    .order-detile .order-list li .content .dt .desc {
        padding: 2px 4px;
        border-radius: 4px;
        background-color: rgba(255, 102, 0, .2);
        color: #f60;
    }
    .order-detile .order-list li .content .total {
        color: red;
        line-height: 17px;
        margin-left: 10px;
        width: 50px;
    }
    .order-detile .order-list li .content .total .num{
       color: #aaa;
    }
    .order-detile .order-list li .summary {
        text-align: right;
        margin: 10px 0;
    }
    .order-detile .order-list li .btn-content {
        text-align: right;
    }
    .order-detile .order-list li button {
        border: 1px solid #f60;
        padding: 4px 8px;
        background-color: transparent;
        color: #f60;
        border-radius: 15px;
    }


    .order-detile .no-order{
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translateX(-50%) translateY(-50%);
        font-size: 14px;
        color: #333;   
      }
</style>
