<template>
    <div>
     <div class="login-header">
         <h3 class="user-id">{{userIfo.nickname}}</h3>
         <div class="nav-personal-img">
             <img :src="userIfo.headimgurl || NullImg" alt="" width="50" height="50">
         </div>
         <button class="topersonal" @click="toPersonalCenter">前往个人中心 >></button>
         </div>  
     <div class="login-naviga">
         <ul class="nav-message">
             <li @click="toShowpersonalIntegral">
                 <span class="num">{{userIfo.points}}</span>
                 <div class="text">当前积分</div>
                 </li>
             <li @click="toShowConsumeMoney">
                 <span class="num">{{userIfo.consume_money}}</span>
                 <div class="text">消费金额</div>
              </li>
             <li  @click="toShowConsumeMoney">
               <span class="num">{{userIfo.earning_money}}</span>
               <div class="text">收益金额</div>  
             </li>
           </ul>
              <ul class="nav-menu">
            <li @click="haveGift">
                 <i class="iconfont icon-jiangpin"></i>
                <span>有奖任务</span>
                <p class="first">{{userIfo.task_num}}</p>
             </li> 
            <li @click="unReadingmsg">
               <i class="iconfont icon-xinfeng"></i> 
                <span>未读信息</span>   
                 <p class="senond">{{userIfo.msg_num}}</p>
                </li> 
            <li>
                <i class="iconfont icon-lingdang"></i>
                <span>待处理事务</span>
                 <p  class="tired">{{userIfo.transaction_num}}</p>
                </li> 
             </ul>     
         </div>    
      <div class="box-mybuy">
            <div class="buy-about">
              <div class="buy-about-item">
                 <div class="inner one">
                  <div class="buy-number">
                      <span>{{userIfo.trophy_num}}</span> 
                      <h4>件</h4> 
                     </div>
                      <p class="buy-prize">我的奖品</p>  
                       <p class="buy-detile">进入详细</p>  
                    </div> 
                  </div>      
              <div class="buy-about-item">
                 <div class="inner two" >
                  <div class="buy-number">
                      <span>{{userIfo.cart_num}}</span> 
                      <h4>件</h4> 
                     </div>
                      <p class="buy-prize">我的购物车</p>  
                       <p class="buy-detile">进入详细</p>  
                    </div> 
                  </div>      
              <div class="buy-about-item">
                 <div class="inner three" @click="toshoOrder">
                  <div class="buy-number">
                      <span>{{userIfo.goods_order_num}}</span> 
                      <h4>单</h4> 
                     </div>
                      <p class="buy-prize">我的订单</p>  
                       <p class="buy-detile">进入详细</p>  
                    </div> 
                  </div>      
              <div class="buy-about-item">
                 <div class="inner four" @click="toshowBalance">
                  <div class="buy-number">
                      <span>{{userIfo.rp_money}}</span> 
                      <h4>元</h4> 
                     </div>
                      <p class="buy-prize">我的红包</p>  
                       <p class="buy-detile">进入详细</p>  
                    </div> 
                  </div>      
              <div class="buy-about-item">
                 <div class="inner five" @click="toshowPayLive">
                  <div class="buy-number">
                      <span>{{userIfo.live_order_num}}</span> 
                      <h4>个</h4> 
                     </div>
                      <p class="buy-prize">付费直播</p>  
                       <p class="buy-detile">进入详细</p>  
                    </div> 
                  </div>      
              <div class="buy-about-item">
                 <div class="inner six" @click="toshowPayVideo">
                  <div class="buy-number">
                      <span>{{userIfo.vod_order_num}}</span> 
                      <h4>个</h4> 
                     </div>
                      <p class="buy-prize">付费视频</p>  
                       <p class="buy-detile">进入详细</p>  
                    </div> 
                  </div>      
                
            </div>

          </div>   
        <ads></ads>
         <transition-group name="login-fade" mode="in-out">
        <!-- 个人积分模块 -->
        <personal-integral v-if="integral" @topassIntegralValue="thatIntegralValue" key="1"></personal-integral>
        <!-- 消费金额模块&收益金额模块 -->
        <consumemoney v-if="showConMoney" @topassConsume="getConsumeMoneyData"  key="2"></consumemoney>
        <!-- 有奖任务模块 -->
        <prize-task v-if="showPrizeTask" @topassPrizeTask="getprizeData"  key="3"></prize-task>
        <!-- 未读信息模块 -->
        <unread-ifo v-if="showunReadIfo" @topassunreadIfo="getunreadIfo"  key="4"></unread-ifo>
        <!-- 购物相关 -->
           <!-- 我的订单详细 -->
        <order-detile v-if="showOrderDetile" @topassThatVal="getOrderListIfo"  key="5"></order-detile>
           <!-- 我的红包详细 -->
           <balance v-if="showBalance" @topassBalanceVal="getBalanceVal"  key="6"></balance>
           <!-- 购买的直播视频信息 -->
           <live-video v-if="showLiveVideo" @topassLiveVideo="getLiveVideo" key="7"></live-video>
           <!-- 购买的历史视频信息 -->
          <buy-video v-if="showBuyVideo" @toPassBuyVideo="getBuyVideo" key="8"></buy-video>
           </transition-group>
    </div>
</template>

<script>
import ads from './login-child/ad';
import personalIntegral from './login-child/personalIntegral';
import  consumemoney from './login-child/consumeMoney';
import prizeTask from './login-child/prizeTask';
import unreadIfo from './login-child/unreadIfo';
import orderDetile from './login-child/shopping-about/orderDetile';
import balance from './login-child/shopping-about/balance';
import liveVideo from './login-child/shopping-about/liveVideoOrder'
import buyVideo from './login-child/shopping-about/buyVideoList'
import {getCookie} from '../../api/aboutCookies'
export default {
   name:'login',
   components: {
        ads,
        personalIntegral,
        consumemoney,
        prizeTask,
        unreadIfo,
        orderDetile,
        balance,
        liveVideo,
        buyVideo 
    },
    props: {

    },
    data() {
        return {
           integral:false,//个人积分
           showConMoney:false,//消费金额
            showPrizeTask:false,//有奖任务
            showunReadIfo:false,//未读信息
            showOrderDetile:false,//订单详细
            showBalance:false,//红包详细
            showLiveVideo:false,//购买的直播列表
            showBuyVideo:false,//购买的历史视频记录
            userIfo:{},//用户信息
            NullImg:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2829271447,1822842579&fm=26&gp=0.jpg',
        };
    },
    methods: {
     toPersonalCenter(){
       //点击前往个人中心
         let roomId =this.$route.params.id
         window.console.log('个人中心',roomId);
         this.$router.push({ name: 'personalCenter', params: { id: roomId }}); //编程式导航
     }, 
     initAbouMeBox(){
       //初始化about-me盒子
      let fatherBox = document.querySelector('.about-me');  
      fatherBox.setAttribute('style','overflow-y:hidden');
      fatherBox.scrollTop=0; 
     },
      getThatUsrIfo(){
        //获取用户的头像积分相关信息
        let member_token=getCookie("token");
         this.$http.getUserIfo(member_token).then(res=>{
           window.console.log(res,'用户信息');
           this.userIfo=res.data.data;
            window.console.log(this.userIfo,'用户信息111111');
            window.localStorage.setItem('selfName',res.data.data.nickname)
         }) 
      },
     toShowpersonalIntegral(){
       //显示个人积分的盒子
       window.console.log('个人积分');  
          this.initAbouMeBox()
           this.integral=true;
      //  window.console.log(pointBox);
     },
     toShowConsumeMoney(){
       //显示消费金额详细
         this.initAbouMeBox();
         this.showConMoney=true;
        window.console.log('消费金额详细');
     },
     thatIntegralValue(val){
       this.integral=val
        //获取来自Intrgral的传递的值 true or false
     },
      getConsumeMoneyData(val){
        this.showConMoney=val;
        //获取来自consumeMoney 传递的值 true or false
      },
      getprizeData(val){
        //获取来自PrizeTask 传递的值 true or false
       this.showPrizeTask=val;
      },
      getunreadIfo(val){
        //获取来自unreadIfo 传递的值 true or false
        this.showunReadIfo=val;
      },
      getOrderListIfo(val){
        // 获取来自orderDetile  传递的值 true or false
        this.showOrderDetile=val;
      },
      getBalanceVal(val){
        // 获取来自balance  传递的值 true or false;
        this.showBalance=val
      },
      getLiveVideo(val){
        //获取来自liveVideoOrder  传递的值 true or false;
        this.showLiveVideo = val
      },
      getBuyVideo(val){
        //获取来自buyVideolist 传递的值 true or false;
        this.showBuyVideo = val;
      },
      haveGift(){
        //有奖任务点击事件
         this.initAbouMeBox();
         this.showPrizeTask=true;
        
      },
      unReadingmsg(){
        //点击未读信息触发事件
         this.initAbouMeBox();
          this.showunReadIfo=true;
        window.console.log('未读信息');

      },
      toshoOrder(){
        //点击进入订单详细
        this.initAbouMeBox();
          this.showOrderDetile=true;
        window.console.log('订单详细');
      },
       toshowBalance(){
         //点击进入红包详细
            this.initAbouMeBox()
           this.showBalance=true;
        },
        toshowPayLive(){
             this.initAbouMeBox();
             this.showLiveVideo=true; 
          window.console.log('付费直播')
        },
        toshowPayVideo(){
          this.initAbouMeBox()
          this.showBuyVideo=true;
          window.console.log('付费视频信息')
        }

    },
    computed: {

    },
    created() {

    },
    mounted() {
      this.getThatUsrIfo();//获取用户的相关信息
    },
    watch: {

    },
   
};
</script>

<style>
 .login-header {
    width: 100%;
    height: 7.5rem;
    background-color: rgb(151, 106, 106); 
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
   background: url('../../assets/origin.83c55879.jpg') 50%/cover;
   position: relative;
  }
 .login-header .user-id{
    padding-top: 30px;
    padding-left: 20px;
    color: #fff;
    font-size: 17px;
    
  }
  .login-header  .nav-personal-img img{
    display: block;
    margin: 0 auto;
    border-radius: 50%;
  }
  .login-header  .topersonal{
    position: absolute;
    bottom: 4px;
    right: 4px;
    background-color: transparent;
    color: #fff;
    border: 1px solid #fff;
    border-radius: 4px;
    padding: 1px 3px;
  }
   /* .login-naviga {

   } */
     .login-naviga .nav-message {
     display: flex;
     padding: 30px 0 20px;
     text-align: center;
     }
      .nav-message li{
     height: 33px;
     width: 33%;
     border-right: 1px solid #ccc;      
     }
     .login-naviga .nav-message li:last-child{
    
     border-right: 1px solid transparent;      
     }
      .login-naviga .nav-message .num {
          font-size: 16px;
      }
      .login-naviga .nav-message .text {
        line-height: 20px;
      }
      .nav-menu li {
        font-size: 14px;  
        padding-left: 10px;
        height: 40px;
        line-height: 40px;
        border-top: 1px solid #ddd;
        position: relative;  
      }
      .nav-menu i {
       font-size: 25px;
      }
      .nav-menu span {
      margin-left: 5px;
      }
     .nav-menu p {
    display: inline-block;
    position: absolute;
    right: 5px;
    background-color: #00a65a;
    width: 18px;
    height: 33px;
    border-radius: 40%;
    text-align: center;
    margin-top: 3px;
      }
    .nav-menu .senond{
      background-color: #00c0ef;   
      }
    .nav-menu .tired{
      background-color: #dd4b39;   
      }
    .box-mybuy {
    padding: 20px 0 8px;
    background-color: #f5f5f5;
    border-radius: 4px;  
     color: #fff;
      text-align: center;
    }
    /* .box-mybuy .buy-about {

    } */
    .box-mybuy .buy-about .buy-about-item{
         
     margin-bottom: 20px;
     padding: 10px;
     width: 50%;
     height: 100px;
     display: inline-block;
     box-sizing: border-box;
    }
     .box-mybuy .buy-about .buy-about-item .inner{
       border-radius: 5px;   
       
       height: 100px;
     }
     .box-mybuy .buy-about .buy-about-item .one {
       background-color: #00c0ef;
     }
     .box-mybuy .buy-about .buy-about-item .two {
       background-color: #00a65a;
     }
     .box-mybuy .buy-about .buy-about-item .three {
       background-color: #f39c12;
     }
     .box-mybuy .buy-about .buy-about-item .four {
       background-color: #dd4b39;
     }
     .box-mybuy .buy-about .buy-about-item .five {
       background-color: #e4306c;
     }
     .box-mybuy .buy-about .buy-about-item .six {
       background-color: #4144dd;
     }
    .box-mybuy .buy-about .buy-number{
     padding-top: 10px;
    
     font-size: 30px;
     box-sizing: border-box;
    }
     .box-mybuy .buy-about .buy-number h4{
         display: inline-block;
         font-size: 20px;
     }
    .box-mybuy .buy-about  .buy-prize{
            line-height: 35px;
     }
    .box-mybuy .buy-about  .buy-detile{
            line-height: 25px;
            background-color: hsla(0,0%,98%,.3);
     }
      .login-fade-enter-active, .login-fade-leave-active {
     transition: all .2s ease;
    }
    .login-fade-enter, .login-fade-leave-to {
     opacity: 0;
    transform: translate(600px,00px);
     }
</style>
