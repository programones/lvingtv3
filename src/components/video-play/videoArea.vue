<template>
  <div class="video-area">
    <div id="the-player">
      <!-- 视频渲染区域 -->
      <div id="PlayerVideo" class="player-video" ref="playerVideo"></div>
      <!-- 左上角小图标 -->
      <div class="PlayerLogo PlayerLogoPos1 PlayerLogoSize2">
        <img src />
      </div>

      <!-- 状态 -->
      <div class="live-status" v-if="videostatus" @click="showTips">{{statusTag}}</div>
      <!-- 人数 -->
      <div class="pv-num" @click="closePeopoleNum">
        <i class="iconfont icon-touxiang"></i>
        {{peoples}}
      </div>
      <!-- 倒计时 -->
      <div class="cutdowm-mask" v-if="ifShowCutdowmMask">
        <span class="time-day">{{day}}</span>天
        <span class="time-hours">{{hour}}</span>时
        <span class="time-min">{{min}}</span>分
        <span class="time-second">{{sec}}</span>秒
      </div>
        <!-- 密码支付框  -->
      <div class="pwd-mask" v-if="showPWDmask">
        <div class="mask-container">
            <p class="title">
              <!-- <i class="el-icon-close" id="close-pwd" @click="closePwdMask" ></i> -->
               输入密码</p>
            <div class="content">
            <input type="password" v-model="isPassword" @keyup.enter="sendIsPwd">
            </div>
            <button type="button" @click="sendIsPwd">确定</button>
        </div>
    </div>
    </div>
  </div>
</template>

<script>
import { http } from "../../http/http";
import bus from "../../eventBus";
import {getCookie,setCookie,delCookie} from '../../api/aboutCookies'
import { parse } from 'path';
export default {
   name:"videoArea",
  data() {
    return {
      videoInfoData: {}, //直播间信息
      wxuInfoData: {}, //个人用户信息
      player: "", //播放器实例化属性
      isWeixin: "", //判断是否在微信浏览器环境
      statusTag: "loading", //视频播放的类型 直播中,为开播,回放中
      splashCutdown: "", //引导他倒计时
      videoplayer: null, //储存播放器播放对象
      videostatus: true, //直播状态的显示
      peoples: "loading", //直播观看的热度
      historyvideo: {}, //历史视频记录
      day: 0, // 倒计时的天数
      hour: "00", // 倒计时的小时
      min: "00", // 倒计时的分钟
      sec: "00" ,// 是否在播放
      ifShowCutdowmMask:false,//是否显示倒计时层
      showPWDmask:false,//是否显示密码输入层
      isPassword:"",
      coverUrl:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1575693743908&di=32dff5302e8ef44fb149178ee2c21d67&imgtype=0&src=http%3A%2F%2Fg.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2Fc83d70cf3bc79f3d6e7bf85db8a1cd11738b29c0.jpg',//未付费背景图片
      targe:true,//点击是否显示人数
    };
  },
  methods: {
    getRoomIfo() {
      //获取直播间的详细信息  
      let params = {
        room_id: this.$route.params.id,
        member_token:window.localStorage.getItem('token')||'',
        ip: localStorage.getItem("Ip"),
        iploc: localStorage.getItem("cityname"),
        history: this.$route.query.history || "",
        lesson: this.$route.query.lesson || ""
      };
      http.livingRoom(params).then(res => {
        if (res.data.code == 200) {
          window.console.log(res);
          // 直播间信息
          this.videoInfoData = res.data.data.videoinfo;
          //直播间人数
          this.peoples = this.videoInfoData.group_num
          // 用户登录信息
          this.wxuInfoData = res.data.data.wxuinfo;
          window.console.log(this.videoInfoData);
           document.title = this.videoInfoData.title
          this.toChange();
          //在localstorage 存储 这个视频的是否付费信息
          // window.console.log('=======================')
          // let thatVIfo = {};
          // thatVIfo.amount =  this.videoInfoData.amount;
          // thatVIfo.is_pay_vod = this.videoInfoData.is_pay_vod;
          // window.localStorage.setItem('thatVIfo',JSON.stringify(thatVIfo))
          if(+ this.videoInfoData.amount && ! this.videoInfoData.is_pay_vod){
            this.$notify({
              title: '温馨提示',
              message: this.videoInfoData.delay?`此视频为收费视频试看${this.videoInfoData.delay}秒,请付费后观看`:`此视频为收费视频,请付费后观看`,
              position: 'bottom-left',
              type:"warning",
      	    	duration:8000,//设置0的话的则不会关闭
               }); 
          }
              

        }else if(res.data.code == 500){
          this.$router.push({name:"noF"})
          this.statusTag = '错误';
          let videobgc = document.querySelector(".video-area"); //没有播放时的设置封面
          videobgc.style.background = `url(https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1577342046601&di=ca3cc3fd7c5cafff43959217ad40eb52&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fq_70%2Cc_zoom%2Cw_640%2Fimages%2F20180803%2Ff743f4550f2749d18732124ecfa4b885.jpeg)  no-repeat center center / 100% 100%`;
          this.$notify({
          title: '房间不存在',        
          position: 'bottom-left',
      		duration:3000,//设置0的话的则不会关闭
        });
        }
      });
    },
    startTcpPalyer(url, cover) {
      this.videoplayer = new TcPlayer("PlayerVideo", {
        m3u8: url,
        autoplay: true,
        coverpic: "",
        width: "100%",
        height: "100%",
        // "posterImage": true,
        preload: "meta",
        loop: true,
        poster: cover,
        live: true,
        wording: {
          2: "网络错误!",
          3: "视频解码错误。",
          4: "当前系统不支持播放该视频格式。",
          5: "当前系统不支持播放该视频格式!",
          13: "主播已离开，请稍后再来!",
          1002: "获取视频失败，请检查播放链接是否有效。",
          2048: "无法加载视频文件，跨域访问被拒绝。"
        }
      });
    },
    //输入密码框
    sendIsPwd(){
      let params = {
        password:this.isPassword,
        room_id:this.$route.params.id
      }
      this.$http.checkedVideo(params).then(res=>{
        if(res.data.code == 200){
            this.$notify({
          title: '密码正确',      
          position: 'bottom-left',
      		duration:3000,//设置0的话的则不会关闭
        });
        this.showPWDmask = false;
        this.isPassword ='';
        this.statusTag = "播放中";
         this.isLive();
        }else{
             this.$notify({
          title: '密码错误',      
          position: 'bottom-left',
      		duration:3000,//设置0的话的则不会关闭
        }); 
        this.isPassword ='';
        }
      })
    },
    //点击小叉叉关闭输入密码支付
    closePwdMask(){
      this.showPWDmask = false;
    },
    //观看领取积分
     getPoints(){
       if(window.localStorage.getItem('token') || getCookie('token')){
         let params = {
           room_id:this.$route.params.id,
           room_title:this.videoInfoData.title,
           member_token:getCookie('token') || window.localStorage.getItem('token')
         }
         setTimeout(()=>{
           
          this.$http.getpoint(params).then(res=>{
           if(res.code == 501){
          this.$notify({
          title: '请登陆',
          position: 'bottom-left',
      		duration:3000,//设置0的话的则不会关闭
          }); 
           }else if(res.code == 200){
          this.$notify({
           title: res.msg,
           position: 'bottom-left',
      	   duration:3000,//设置0的话的则不会关闭
          });  
         }
          }) 
         },this.videoInfoData.watch_time_points*1000)
       }
     },
     // 倒计时
       isCountdownFn(){
         if(this.videoInfoData.dateshow && this.videoInfoData.dateshow > new Date().getTime()/1000){
                // 有倒计时
                this.ifShowCutdowmMask = true;
                this.countdownFn();
            }else {
                // 无倒计时
             this.ifShowCutdowmMask = false;
            } 
       },
        countdownFn(){
            // 开始倒计时
            let startInterval = window.setInterval(() => {
                let nowTime = parseInt(new Date().getTime()/1000),  // 获取当前时间
                    endTime = this.videoInfoData.dateshow,          // 获取倒计时终点事件
                    t = endTime - nowTime > 0 ? endTime - nowTime : 0;                          // 前两者的时间差  秒
                this.day = Math.floor( t/86400 );                   // 获取天
                this.hour=Math.floor( (t/3600)%24 );                // 获取时
                this.min=Math.floor( (t/60)%60 );                   // 获取分
                this.sec=Math.floor( t%60 );                        // 获取秒

                this.hour = this.hour < 10 ? "0" + this.hour : this.hour;   // 判断天数, 小于10, 为0 + hour   大于10, hour
                this.min = this.min < 10 ? "0" + this.min : this.min;       // 判断天数, 小于10, 为0 + min   大于10, min
                this.sec = this.sec < 10 ? "0" + this.sec : this.sec;       // 判断天数, 小于10, 为0 + sec   大于10, sec
                if(t>0){
                    if(this.day > 0){
                        // 天数大于0
                        [this.day, this.hour, this.min, this.sec] = [this.day, this.hour, this.min, this.sec];
                    }
                    if(this.day <= 0 && this.hour > 0 ){
                        // 天数不够, 小时大于0
                        [this.day, this.hour, this.min, this.sec] = [0, this.hour, this.min, this.sec];
                    }
                    if(this.day <= 0 && this.hour <= 0 && this.min > 0){
                        // 小时不够, 分大于0
                        [this.day, this.hour, this.min, this.sec] = [0, 0, this.min, this.sec];
                    }
                    if(this.day <= 0 && this.hour <= 0 && this.min <= 0){
                        // 分不够, 秒大于0
                        [this.day, this.hour, this.min, this.sec] = [0, 0, 0, this.sec];
                    }
                }else {
                    [this.day, this.hour, this.min, this.sec] = [0, 0, 0, 0];
                    window.clearInterval(startInterval);
                    this.ifShowCutdowmMask = false;
                    let params = {
                      room_id:this.$route.params.id,
                      member_token:this.getCookie('token'),
                      ip:localStorage.getItem('Ip'),
                      iploc:localStorage.getItem('cityname'),
                      history:"",
                      lesson:""
                    }
                    this.$http.livingRoom(params).then((Response) => {
                        if (Response.data.code == 200) {
                            this.videoInfoData = Response.data.data.videoinfo;
                            this.wxuInfoData = Response.data.data.wxuinfo;
                            this.isLive();
                        }
                    });
                }
            }, 1000);
        },

    isLive() {
      //判断直播间是否为实时直播
      if (
        this.videoInfoData.room_livestatus == 1 &&
        this.videoInfoData.stream_live
      ) {
        this.statusTag = "直播中";
        window.setTimeout(() => {
          //3秒后视频状态消失
          this.videostatus = false;
        }, 3000);
        window.setTimeout(() => {
          this.newPlayer(
            this.videoInfoData.stream_live,
            this.videoInfoData.cover
          );
          // this.getTeaserData();
        }, 1000);
        this.getPoints();
      } else if (this.videoInfoData.room_livestatus == 0) {
        //未开播
        this.statusTag = "未开播";
        this.isCountdownFn();
        // 有无预告
        if (this.videoInfoData.stream_prevue) {
          window.console.log("0");
          window.setTimeout(() => {
            this.newPlayer(
              this.videoInfoData.stream_prevue,
              this.videoInfoData.cover
            );
          }, 1000);
         this.getPoints(); 
        } else {
          window.console.log("1");
          let videobgc = document.querySelector(".video-area"); //没有播放时的设置封面
          videobgc.style.background = `url(${this.videoInfoData.cover})  no-repeat center center / 100% 100%`;
        }

      } else if (
        this.videoInfoData.room_livestatus == 2 &&
        this.videoInfoData.stream_vod
      ) {
        // 回放中
        this.statusTag = "回放中";
        window.setTimeout(() => {
          //3秒后视频状态消失
          this.videostatus = false;
        }, 3000);
        window.setTimeout(() => {
          this.newPlayer(
            this.videoInfoData.stream_vod,
            this.videoInfoData.cover
          );
        }, 1000);
        window.console.log("2上方");
         this.getPoints();
      } else {
        window.console.log("2", this.videoInfoData);
        this.newPlayer(
          this.videoInfoData.stream_prevue,
          this.videoInfoData.cover
        );
         this.isCountdownFn();
      }
    },
    // 点击未付费时显示支付框
      showTips(){
        if(+this.videoInfoData.amount && !this.videoInfoData.is_pay_vod){
      //  bus.$emit('showPayMask',true) ;
      this.$parent._data.showPayMask=true;
      //  window.console.log( this.$parent._data)
        
       window.setTimeout(()=>{
       bus.$emit('payVideoDatas',this.videoInfoData);
      },)   
         if(!getCookie('token')){
           this.$notify({
             title: '请先登陆',
             position: "bottom-left",
             duration: 3000 //设置0的话的则不会关闭
              });   
       }
       } else if(this.statusTag =="显示密码框"){
         this.showPWDmask = true;
       } 
      
      },
    //判断直播间是否为收费直播间
    toChange() {
      // 判断是否有付费价格 !this.videoInfoData.is_pay_vod
      if (+this.videoInfoData.amount && !this.videoInfoData.is_pay_vod) {//没有付费的情况
        
      //  bus.$emit('showPayMask',true)
      //   window.localStorage.setItem('showPayMask',true)
      
    //       let paramsData = {
    //         member_token:window.localStorage.getItem('token'),
    //         history:this.$route.query.history
    //       }
    //  this.$http.ifpayVideo(paramsData).then(res=>{
    //    if(res.data.data){
    //       this.isLive();
    //    }
    //  });
       
      window.setTimeout(()=>{
        //传递房间信给payMask
       bus.$emit('payVideoDatas',this.videoInfoData);
          
      },1)
     
      
         if(this.videoInfoData.delay){//几秒的播放试看
           this.isLive();
            window.setTimeout(()=>{
               this.statusTag = "点我支付";
                this.videostatus=true;//显示视频状态
            },4000)
          
           window.setTimeout(()=>{
             
          let videoArea = document.querySelector("#PlayerVideo");
          videoArea.innerHTML = ""; //清空播放画面
           let videobgc = document.querySelector(".video-area"); //没有播放时的设置封面
           videobgc.style.background = `url(${this.coverUrl})  no-repeat center center / 100% 100%`;
          bus.$emit('showPayMask',true)
          window.localStorage.setItem('showPayMask',true)
         
           },this.videoInfoData.delay*1000)
      }else{
          bus.$emit('showPayMask',true)
        window.localStorage.setItem('showPayMask',true) 
        // 处理视频收费逻辑业务
         let videobgc = document.querySelector(".video-area"); //没有播放时的设置封面
         videobgc.style.background = `url(${this.coverUrl})  no-repeat center center / 100% 100%`;
  
              window.setTimeout(()=>{
               this.statusTag = "点我支付";
                this.videostatus=true;//显示视频状态
            },4000)
            
      }
      
     
          //处理视频收费逻辑业务
        //  let videobgc = document.querySelector(".video-area"); //没有播放时的设置封面
        //  videobgc.style.background = `url(${this.coverUrl})  no-repeat center center / 100% 100%`;
        //    this.statusTag = "点我支付";
        window.console.log('需要付费~~')

        return true;
      }else if(this.videoInfoData.is_password){
        //直播间需要输入密码等入时
          window.console.log('需要密码')
          this.showPWDmask = true;
         this.statusTag = "显示密码框";  
      }else{ //已经付费或是免费
        this.isLive();
         window.setTimeout(()=>{
               this.statusTag = "录播";
                this.videostatus=true;//显示视频状态
            },4000)
      }
      // if (this.videoInfoData.is_pay_live || !this.videoInfoData.is_pay_vod) {
      //   if (parseFloat(this.videoInfoData.delay) != 0) {

      //     // this.isLive();
      //   } else {
      //     window.console.log("没有观看时长!");
      //   }

      // } else {
      //   //不收费
      //   this.isLive();
      // }
    },

    newPlayer(url, img) {
      // 实例化TCPlayerLite
      this.player = this.startTcpPalyer(url, img);

      let video = document.querySelector("video");

      video.setAttribute("x5-playsinline", "");
      video.setAttribute("playsinline", "");
      video.setAttribute("webkit-playsinline", "");
      video.setAttribute("poster", "");
      video.setAttribute("x-webkit-airplay", "allow");
      video.setAttribute("preload", "auto");
      video.play(); //自动播放

      // this.weixinPlay(() => {
      // this.player.video.el.play();
      // });
    },
    //     weixinPlay(fn) {
    //   //微信播放器中的方法
    //     if (!this.isWeixin) {    // 非微信中直接执行，支不支持就交给浏览器本身了
    //         fn();
    //     } else {
    //         if (window.WeixinJSBridge) {
    //             WeixinJSBridge.invoke("getNetworkType", {}, fn);   // 这句话是在微信中可以自动播放的核心
    //  } else {
    //    document.addEventListener("WeixinJSBridgeReady",function () {
    //           WeixinJSBridge.invoke("getNetworkType", {}, fn);
    //             });
    //         }
    //     }
    // },

    //从videoTabsChats中获取的服务器主动直播推送服务
    getChatVideoPlay() {
      bus.$on("VideopayerData", data => {
        let videoArea = document.querySelector("#PlayerVideo");
        videoArea.innerHTML = ""; //初始化播放器
        this.newPlayer(data.play_link, data.cover);
        this.videostatus = true;
        this.statusTag = "直播中";
        window.setTimeout(() => {
          //3秒后视频状态消失
          this.videostatus = false;
        }, 3000);
      });
    },
    // getRecordOrLessonVidoe(){
    //   let params = {
    //     room_id: this.$route.params.id,
    //     member_token: this.getCookie('token'),
    //     ip:localStorage.getItem('Ip'),
    //     iploc:localStorage.getItem('cityname'),
    //     history:this.$route.query.history || '',
    //     lesson:this.$route.query.lesson || ''//可以有,不必要参数
    //   }
      
    // }
    closePeopoleNum(){
    let num=  document.querySelector('.pv-num');
    // window.console.log(num);
    // let targe = true
    if(this.targe){
      num.setAttribute('style','opacity:0');
      this.targe=false
    }else{
     num.setAttribute('style','opacity:1') ;
      this.targe=true 
    }
    
    },
  },

  mounted() {
    //取读直播的人数
    // this.peoples = window.localStorage.getItem("peoples");
    
    // 判断是否属于微信端浏览器
    let ua = navigator.userAgent.toLowerCase();
    this.isWeixin = ua.indexOf("micromessenger") != -1;
    this.getRoomIfo();
    bus.$on("passvalue", val => {
      //获取videoTabsRecord传递过来的视频播放数据
   
      // this.historyvideo = val;
      // let videoArea = document.querySelector("#PlayerVideo");
      // videoArea.innerHTML = ""; //初始化播放器
      // this.newPlayer(val.videoUrl, val.coverUrl);
      // this.videostatus = true;
      // this.statusTag = "回放中";
      // window.setTimeout(() => {
      //   //3秒后视频状态消失
      //   this.videostatus = false;
      // }, 3000);
      // window.console.log(this.historyvideo,"兄弟组件传过来的值",videoArea)
    });
    bus.$on("paytheme", val => {
      //获取videoTabsPaytheme传递过来的视频播放数据

      this.historyvideo = val;
      let videoArea = document.querySelector("#PlayerVideo");
      videoArea.innerHTML = ""; //初始化播放器
      this.newPlayer(val.videoUrl, val.coverUrl);
      this.videostatus = true;
      this.statusTag = "回放中";
      window.setTimeout(() => {
        //3秒后视频状态消失
        this.videostatus = false;
      }, 3000);
    });
    //信息发送框中主动推送的直播链接
    this.getChatVideoPlay();
 
  }
};
</script>

<style>
.root-video {
  width: 100%;
  height: 100%;
}
.video-area {
  width: 100%;
  height: 11rem;
  background-color: #000;
  border-radius: 4px 0 0 4px;
  /* overflow-x: hidden; */
  position: relative;
  text-align: left;
}
.video-area .live-status {
  position: absolute;
  background-color: hsla(0, 0%, 98%, 0.3);
  color: #fff;
  bottom: 5px;
  right: 10px;
  width: 60px;
  line-height: 19px;
  text-align: center;
  border-radius: 3px;
}
.video-area .pv-num {
  position: absolute;
  background-color: hsla(0, 0%, 98%, 0.3);
  color: #fff;
  right: 8px;
  top: 10px;
  max-width:70px;
  line-height: 19px;
  text-align: center;
  border-radius: 3px;
  padding-right: 5px;
} 
.video-area .cutdowm-mask {
    color:#00ccfe;
    transform: translate(-50% , -50%);
    top: 50%;
    position: absolute;
    padding: 10px;
    z-index: 100;
    left: 50%;
     font-size: 15px;
    border-radius: 5px;
    background-color: rgba(0, 0, 0, 0.4);
}
.video-area .pwd-mask {
 position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: rgba(0,0,0,.3);
  z-index: 100;
}
.video-area .pwd-mask .mask-container{
 position: absolute;
	padding-bottom: 10px;
	top: 15%;
	left: 50%;
	-webkit-transform: translateY(-50%) translateX(-50%);
	transform: translateY(-50%) translateX(-50%);
	background-color: #fff;
	border-radius: 10px;
	width: 70%;
	text-align: center

}
.video-area .pwd-mask .mask-container #close-pwd{
 text-indent: 5px;
    float: left;
    font-size: 20px;

}
.video-area .pwd-mask .mask-container .title{

padding: 8px 0;
	text-align: center
}
.video-area .pwd-mask .mask-container .title{
    font-size: 16px;
    padding: 12px 0;
    text-align: center;
}
.video-area .pwd-mask .mask-container .content{
padding: 0 8px;
	min-height: 80px;
	text-align: center;
	line-height: 80px;
	font-size: 24px
}
.video-area .pwd-mask .mask-container button{
width: 80%;
	border: none;
	background: -webkit-gradient(linear,left top,right top,from(#f7421c),color-stop(80%),to(#f89f46));
	background: linear-gradient(90deg,#f7421c,80%,#f89f46);
	height: 30px;
	color: #fff;
	border-radius: 50px;
  outline: none;
}
.video-area .pwd-mask .mask-container input{
padding-left: 4px;
	width: 100%;
	-webkit-box-sizing: border-box;
	box-sizing: border-box;
	border: 1px solid #aaa;
	height: 30px;
	border-radius: 4px
}

</style>