<template>
    <div>
     <div class="login-header">
         <h3 class="user-id">用户ID</h3>
         <div class="nav-personal-img">
             <img src="http://5b0988e595225.cdn.sohucs.com/images/20181110/3bd84dc925d64943aadeeda6d9ab1741.jpeg" alt="" width="50" height="50">
         </div>
         <button class="topersonal" @click="toPersonalCenter">前往个人中心 >></button>
         </div>  
     <div class="login-naviga">
         <ul class="nav-message">
             <li>
                 <span class="num">231</span>
                 <div class="text">当前积分</div>
                 </li>
             <li>
                 <span class="num">0.00</span>
                 <div class="text">消费金额</div>
              </li>
             <li>
               <span class="num">0.00</span>
               <div class="text">收益金额</div>  
             </li>
           </ul>
              <ul class="nav-menu">
            <li>
                 <i class="iconfont icon-jiangpin"></i>
                <span>有奖任务</span>
                <p class="first">0</p>
             </li> 
            <li>
               <i class="iconfont icon-xinfeng"></i> 
                <span>未读信息</span>   
                 <p class="senond">0</p>
                </li> 
            <li>
                <i class="iconfont icon-lingdang"></i>
                <span>待处理事物</span>
                 <p  class="tired">0</p>
                </li> 
             </ul>     
         </div>    
      <div class="box-mybuy">
            <div class="buy-about">
              <div class="buy-about-item">
                 <div class="inner one">
                  <div class="buy-number">
                      <span>0</span> 
                      <h4>件</h4> 
                     </div>
                      <p class="buy-prize">我的奖品</p>  
                       <p class="buy-detile">进入详细</p>  
                    </div> 
                  </div>      
              <div class="buy-about-item">
                 <div class="inner two" >
                  <div class="buy-number">
                      <span>0</span> 
                      <h4>件</h4> 
                     </div>
                      <p class="buy-prize">我的奖品</p>  
                       <p class="buy-detile">进入详细</p>  
                    </div> 
                  </div>      
              <div class="buy-about-item">
                 <div class="inner three">
                  <div class="buy-number">
                      <span>0</span> 
                      <h4>件</h4> 
                     </div>
                      <p class="buy-prize">我的奖品</p>  
                       <p class="buy-detile">进入详细</p>  
                    </div> 
                  </div>      
              <div class="buy-about-item">
                 <div class="inner four">
                  <div class="buy-number">
                      <span>0</span> 
                      <h4>件</h4> 
                     </div>
                      <p class="buy-prize">我的奖品</p>  
                       <p class="buy-detile">进入详细</p>  
                    </div> 
                  </div>      
                
            </div>

          </div>   
        <ads></ads>
   
    </div>
</template>

<script>
import {http} from '../../http/http';
import ads from './login-child/ad'
export default {
    props: {

    },
    data() {
        return {

        };
    },
    methods: {
     toPersonalCenter(){
         let roomId =this.$route.params.id
         window.console.log('个人中心',roomId);
         this.$router.push({ name: 'personalCenter', params: { id: roomId }}); //编程式导航
     },   
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
        ads
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
   .login-naviga {

   }
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
    .box-mybuy .buy-about {

    }
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
</style>
