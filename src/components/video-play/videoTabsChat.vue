<template>
<div>

   
  <div class="chat-border">  
      <ul>
      <li class="chat-li" v-for="(item,i) in chathistory" :key="i">
          <p class="chat-name">{{item.user_name}}</p>
          <img :src="item.user_img" alt="" width="37" height="37" :class="{'imgshow':item.is_own==1}">
          <div class="chat-content" :class="{'magactive':item.is_own==1}">{{item.msg_content}}</div>
      </li>
        </ul>
        <div class="reward" @click="showGifts"></div>    
    </div>  
    <div class="chat-sendmsg">
     <input type="text" id="cont" placeholder="请登陆后参与互动"> <button @click="sendMsg" id="btn">发送</button>   
     </div>
     <div class="reward-content">
         <div class="top" @click="hiddenGifts"> <i class="iconfont icon-jiantou9"></i></div>
            <div class="gitf" v-for="(item,i) in gitlist" :key="i" @click="payGitf(item)">
                <img :src="item.gift_img">
                <p class="gift-name">{{item.gift_title}}</p>
                <p class="gift-currency">{{item.gift_virtual_money}}奖学金</p>
            </div>
         </div>   
  </div>

</template>

<script>
import {http} from '../../http/http';
import { log } from 'util';
import animation from '../../api/animationSlow'
export default {
    data(){
        return {
         chathistory:[],//历史聊天记录
         gitlist:[]     
        }
    },
    methods: {
    
      getchatHistory(){
          //获取聊天信息  
        let params ={
            room_id: this.$route.params.id,
            member_token:'',
            page:1
        }
       http.getchatHistory(params).then(res=>{
           
           if(res.data.code==200) {
               let beforeData =res.data.data
               beforeData.forEach(item=>{
                   if(item.is_own==1) {
                       item.msg_afterIfo=JSON.parse(item.msg_info)
                   }
               })
           this.chathistory = res.data.data ;
        //    window.console.log( beforeData,'聊天信息~~');
           setTimeout(()=>{
           let chatBox= document.querySelector('.chat-border');
        //    window.console.log(chatBox.scrollHeight)  
           chatBox.scrollTop = chatBox.scrollHeight;    
           },)
           
           }
       }) 
      }, 
     
     sendMsg(){
    //点击发上传信息到服务器

     },
     showGifts(){
     //点击展示礼物列表
    //  window.console.log('礼物');
     let giftHeight = document.querySelector('.reward-content');
         animation(giftHeight,{bottom:0,opacity:1})
     },
     getgits(){
         //获取礼物列表
       http.getGift().then(
           res=>{
               window.console.log(res,'礼物列表');
               if(res.data.code==200){
                   this.gitlist=res.data.data
               }
           }
       )   
     },
     hiddenGifts(){
         //隐藏礼物列表
      let giftHeight = document.querySelector('.reward-content');
         animation(giftHeight,{bottom:-500,opacity: 0})    
     },
     payGitf(val){
         //点击相关礼物
        window.console.log(val,'某个礼物');   

     }
      
    },
    created(){},
    mounted(){
    this.getchatHistory();
    this.getgits();

    }
}
</script>
<style>
     .chat-border {
    position: relative;
    overflow-y: auto;
    height: 19rem;
     }
      .chat-border .chat-li {
          padding-left: 5px;
          padding-bottom: 15px;
      }
     .chat-border .chat-name {
     text-indent: 9px;
    line-height: 27px;
    }
     .chat-border img{
         border-radius: 50%;
     }
     .chat-border .reward{
        position: fixed;
       width: 40px;
       height: 40px;
       background-color: blue;
       border-radius: 50%;
       bottom: 3.125rem;
      right: .625rem;
    box-shadow: 0 0 10px #333;
        background: #fff url('../../assets/gift.4f0c37e8.png') no-repeat center 0/40px;
     }
     .chat-content{
           position: relative;
           display: inline-block;      
           padding: 10px;
           margin-left: 10px;
           background: #a0dcf0;
           -moz-border-radius: 12px;
            -webkit-border-radius: 12px;
            border-radius: 6px;
            max-width: 70%;
            word-wrap:break-word;
        }
       .chat-content:before{
        position: absolute;
        content: "";
        width: 0;
        height: 0;
        right: 100%;
        bottom: 5px;
        border-top: 0px solid transparent;
        border-right: 6px solid #a0dcf0;
        border-bottom: 6px solid transparent;   
       }  
    .chat-sendmsg {
    position: fixed;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: gray;
    padding: 5px;
       }
       .chat-sendmsg #cont {
         border: 1px solid #ccc;
         padding: 0 6px;
         width: calc(100% - 75px);
         min-height: 30px;
         font-size: 14px;
         border-radius: 3px;
       }
  .chat-sendmsg #btn {
    height: 30px;
    padding: 0 10px;
    float: right;
  }
   .magactive {
    font-size: 15px;   
    margin-left: 15%;
    margin-top: 10px;
    width: 60%;
       background: #fa9e3d url('') no-repeat 0/60px;
    height: 100px;
    line-height: 100px;
   }
    .imgshow {
        display: none;
    }
    .magactive:before {
      position: absolute;
     content: "";
     width: 0;
     height: 0;
     right: 100%;
     bottom: 5px;
     border-top: 0px solid transparent;
     border-right: 6px solid #fff;
     border-bottom: 6px solid transparent;        
    }
    .reward-content {
    position: fixed;
    left: 0;
    right: 0;
    bottom: -500px;
    background-color: rgba(0,0,0,.8);
    z-index: 100000;
   } 
   .reward-content .top {
    height: 40px;
    color: white;
    font-size: 24px;
    text-align: center;
     }
    
    .reward-content .gitf {
    float: left;
    width: 25%;
    padding: 10px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    text-align: center;
   }
   .reward-content .gitf img {
    width: 100%;
  }
  .reward-content .gitf .gift-name {
    font-size: 14px;
    color: #e2e2e2;
  }
  .reward-content .gitf .gift-currency {
    font-size: 10px;
    color: #aeadad;
   }
</style>