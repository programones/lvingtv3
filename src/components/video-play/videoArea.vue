<template>
  
  <div class="video-area">

   <div id="the-player">
     <!-- 视频渲染区域 -->
    <div id="PlayerVideo" class="player-video" ref="playerVideo"></div> 
     <!-- 左上角小图标 -->
     <div class="PlayerLogo PlayerLogoPos1 PlayerLogoSize2"><img src=""></div>


   <!-- 状态 -->
  <div class="live-status" v-if="videostatus">{{statusTag}}</div>
  <!-- 人数 -->
  <div class="pv-num"><i class="iconfont icon-touxiang"></i>{{peoples}}</div>





     </div>    
  </div>
  
</template>

<script>
import {http} from '../../http/http';

export default {
  
 data(){
  return {
    videoInfoData:{},//直播间信息
    wxuInfoData:{},//个人用户信息
    player:'',//播放器实例化属性
    isWeixin:'',//判断是否在微信浏览器环境
    statusTag:'loading',//视频播放的类型 直播中,为开播,回放中
    splashCutdown:'',//引导他倒计时
    videoplayer:null,//储存播放器播放对象
    videostatus:true,//直播状态的显示
    peoples:'',//直播观看的热度
  }
 },
 methods:{

  
   getRoomIfo(){
    //获取直播间的详细信息   
  let params={
           room_id:this.$route.params.id,
           member_token:this.getCookie('token'),
           ip: localStorage.getItem('Ip'),
           iploc: localStorage.getItem('cityname'),
           history:this.$route.query.history|| '',
           lesson:this.$route.query.lesson || ''
           }
           http.livingRoom(params).then(res=>{
           
          if(res.data.code==200){
              window.console.log(res);
          // 直播间信息
          this.videoInfoData = res.data.data.videoinfo;
        // 用户登录信息
        this.wxuInfoData = res.data.data.wxuinfo;  
         window.console.log(this.videoInfoData);
         this.toChange();
      }      
         })  
       },
    startTcpPalyer(url,cover){
      this.videoplayer= new TcPlayer('PlayerVideo', {
        "m3u8": url,
        "autoplay": true,
        "coverpic": "",
        "width": '100%',
        "height": '100%',
        // "posterImage": true,
        "preload": 'meta',
        "loop": true,
        "poster": cover,
        "live": true,
        "wording": {
          2: '网络错误!',
          5: '当前系统不支持播放该视频!',
          13: '主播已离开!'
        }
      });

    },


     //-----------------------------cookies设置相关start----------------
       //获取cookie
        getCookie(cname) {
            var name = cname + "=";
            var ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) != -1) {
                    return c.substring(name.length, c.length);
                }
            }
            return "";
        },
        //清除cookie
        clearCookie(user) {
            this.setCookie(user, "", -1);
        },
        //设置cookie
        setCookie(cname, cvalue, exdays) {
            var d = new Date();
            d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
            var expires = "expires=" + d.toGMTString();
            document.cookie = cname + "=" + cvalue + "; " + expires;
        },  
     //-----------------------------cookies设置相关end----------------  
        
      isLive(){
        //判断直播间是否为实时直播
        if(this.videoInfoData.room_livestatus==1 && this.videoInfoData.stream_live){
            this.statusTag = '直播中';
            window.setTimeout(()=>{
              //3秒后视频状态消失
                this.videostatus=false
            },3000)
              window.setTimeout(() => {
                    this.newPlayer(this.videoInfoData.stream_live, this.videoInfoData.cover);
                    // this.getTeaserData();
                },1000);

        }else if(this.videoInfoData.room_livestatus == 0) {
          //未开播
           this.statusTag = '未开播';
           // 有无预告
             if(this.videoInfoData.stream_prevue){
         window.console.log('0');
         window.setTimeout(() => {
         this.newPlayer(this.videoInfoData.stream_prevue, this.videoInfoData.cover);
         }, 1000); 
             }else {
                window.console.log('1');
              let videobgc = document.querySelector('.video-area');//没有播放时的设置封面
               videobgc.style.background=`url(${this.videoInfoData.cover})  no-repeat center center / 100% 100%`
             }
        }else if(this.videoInfoData.room_livestatus == 2 && this.videoInfoData.stream_vod){
       // 回放中
         this.statusTag = '回放中';
          window.setTimeout(()=>{
              //3秒后视频状态消失
                this.videostatus=false
            },3000)
           window.setTimeout(() => {
                    this.newPlayer(this.videoInfoData.stream_vod, this.videoInfoData.cover);
                }, 1000);
                window.console.log('2上方') 
        }else {
         window.console.log('2',this.videoInfoData);
          this.newPlayer(this.videoInfoData.stream_prevue, this.videoInfoData.cover);
        }
      },
      //判断直播间是否为收费直播间
      toChange(){
        // 判断是否有付费价格
         if(this.videoInfoData.room_livestatus == 0) {
                // this.payTag = false;
                this.isLive();
                return true;
            } 
       if( parseFloat(this.videoInfoData.amount) && !this.videoInfoData.is_pay){
         
           if(parseFloat(this.videoInfoData.delay) != 0){
              this.isLive();
           }else {
               window.console.log('没有观看时长!')
           }


       }else {
         //不收费
         this.isLive(); 
       } 
      },

      newPlayer(url, img) {
      
           // 实例化TCPlayerLite
            this.player = this.startTcpPalyer(url, img);
          
            let video = document.querySelector('video')
            
            video.setAttribute('x5-playsinline', '')
            video.setAttribute('playsinline', '')
            video.setAttribute('webkit-playsinline', '')
            video.setAttribute('poster', '')
            video.setAttribute('x-webkit-airplay', 'allow')
            video.setAttribute('preload', 'auto');
            video.play();//自动播放
           
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
  
   },

 
 mounted(){
    //取读直播的人数
    this.peoples = window.localStorage.getItem("peoples")

     // 判断是否属于微信端浏览器
   let ua = navigator.userAgent.toLowerCase();
   this.isWeixin = ua.indexOf('micromessenger') != -1;   
   this.getRoomIfo();  
  
   
 }   
}
</script>

<style>
.root-video{
    width: 100%;
    height: 100%;
}
   .video-area {
        width:100%;
        height: 11rem;
        background-color: #000;
        border-radius: 4px 0 0 4px;
        /* overflow-x: hidden; */
        position: relative;
        text-align: left;
    } 
 .video-area .live-status {
     position: absolute;
     background-color: hsla(0,0%,98%,.3);
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
 background-color: hsla(0,0%,98%,.3);
 color: #fff;
 right:8px;
 top: 20px;
 width: 60px;
 line-height: 19px;
 text-align: center;
 border-radius: 3px;
 }
</style>