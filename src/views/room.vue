<template>
    <div>
      <video-area></video-area> 
      <video-tabs :wechatData="wechatData"></video-tabs> 
        <transition name="paymask-fade">
           <pay-mask v-if="showPayMask"></pay-mask>
        </transition>
     
    </div>
</template>
<script>
import videoArea  from '../components/video-play/videoArea';
import videoTabs from '../components/video-play/vidoeTabs';
import payMask from '../components/viodePay/payMask'
import {getCookie,setCookie,delCookie} from '../api/aboutCookies';

export default {
  components:{
      videoArea,
      videoTabs,
      payMask
  } ,
  data(){
      return {
        isWeixin:false,//是否为微信端 
        shareData:{},
        localUrl: window.location.href, // 当前Url
        obtainCode:'',//微信授权url中的code
        wechatData:{},//微信用户相关信息
        uid:"",//用户个人辨识ID
        showPayMask:false,//显示付费遮罩层
        mid:'',//房间的mid
      }
  },
  methods: {
     //判断是否存在房间号再进行微信授权
    async ifhaveRoom(){
        let params = {
        room_id: this.$route.params.id,
        member_token:'',
        ip: localStorage.getItem("Ip"),
        iploc: localStorage.getItem("cityname"),
        history: this.$route.query.history || "",
        lesson: this.$route.query.lesson || ""
      };
      let {data} = await  this.$http.livingRoom(params)
        window.console.log(data,'rrrrrrrrrrrrrrrrr');
        this.mid = data.data.videoinfo.mid;
        if(data.code == 200){
             window.console.log('正常的接口类型',data.data.videoinfo.mid);
             this.getwxReq()
        }
     },        
    getwxReq(){
       //获取微信授权的方法
      if( this.isWeixin && !this.obtainCode ){
         //首次登陆没有token的情况下
        this.$http.getCodeUrl(this.localUrl).then(res=>{
       
        window.location.href= res.data.data;
      })
      }
    },
   getQueryString(name) {  
          // 获取链接中的code
       var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");  
       var r = window.location.search.substr(1).match(reg);  
       if (r != null) return unescape(r[2]);  
       return null;  
        },
    WXshareFn(){
      //微信分享
      if(this.isWeixin){
        let room_id=this.$route.params.id;
       this.$http.weixinshare(room_id).then(res=>{
         if(res.data.code == 200){
           this.shareData = res.data.data;
          let config = this.shareData.config;
             wx.config({
               // debug: true,
               appId: config.appId,
               nonceStr: config.nonceStr,
               timestamp: config.timestamp,
               signature: config.signature,
               jsApiList: [
                 "updateAppMessageShareData",
                 "updateTimelineShareData",  
                 'onMenuShareAppMessage',  //旧的接口，即将废弃
                 'onMenuShareTimeline' ,//旧的接口，即将废弃                           
                 "onMenuShareWeibo"         
               ]
              });
           let url = window.location.href;
            if(url.indexOf("?") == -1){
              //链接中没有UID直接拼接就好了
               url += '?uid=' + this.uid;
            }else{
              //如果原来链接中有UID就替换为自己的UID
             url = url.replace(url.replace(/(\\?|^|&|\#)uid=([^&|^#]*)(&|$|#)/, "$1"+uid+"="+this.uid+'&'+"$2")) 
            }
           wx.ready(() => {
                                    
                wx.updateAppMessageShareData({
                  //“分享给朋友”及“分享到QQ”按钮的分享内容
                    title:this.shareData.title, // 分享标题
                    link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    desc:  this.shareData.desc, // 分享描述
                    imgUrl:this.shareData.img, // 分享图标
                     type: 'link', // 分享类型,music、video或link，不填默认为link
                    success: function () {
                        // 用户点击了分享后执行的回调函数
                    }
                });

                wx.updateTimelineShareData({
                  //“分享到朋友圈”及“分享到QQ空间”按钮的分享内容
                    title: this.shareData.title, // 分享标题                           
                    link:  url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl:this.shareData.img, // 分享图标
                    type: 'link', // 分享类型,music、video或link，不填默认为link
                    success: function () {
                        // 用户点击了分享后执行的回调函数
                    }
                });
                wx.onMenuShareWeibo({
                    title:this.shareData.title, // 分享标题
                    desc: this.shareData.desc, // 分享描述
                    link: url, // 分享链接
                    imgUrl:this.shareData.img, // 分享图标
                    success: function () {
                        // 用户确认分享后执行的回调函数
                    },
                    cancel: function () {
                        // 用户取消分享后执行的回调函数
                    }
                });
          });     
         }
       }) 
      }
    },
   

  },
  created() {
    
  },
  mounted() {
    // 判断是否是微信浏览器
        let ua = navigator.userAgent.toLowerCase();
        this.isWeixin = ua.indexOf('micromessenger') != -1;

        //获取uid
      if(getCookie('token')) {
        let token = getCookie('token')
        this.$http.getUserIfo(token).then(res=>{
          this.uid = res.data.data.uid;
          setCookie('uid',this.uid,15);
          if(res.data.dode==501){
            delCookie('token');
             window.location.href = window.location.href;
          }
          this.WXshareFn() //微信分享的方法
        })
      }

        this.obtainCode = this.getQueryString('code');//获取连接中的code
         setCookie('code', this.obtainCode,7);//7天有效   
        //  this.getwxReq();//重新刷新页面获取微信接口的方法 

         this.ifhaveRoom();//判断直播间是否正常再进行授权
         
    if(this.isWeixin && this.obtainCode){
        //传入room id
        // this.$http.weichatRoomID(this.$route.params.id).then(res=>{

        // })
        let params ={
          code:this.obtainCode,
          mid:this.mid
        }
        http.weichatRoomID(params).then(res=>{
          //获取微信用户信息的回调
          console.log(res);
          // console.log('上面是打印OpenID');
          
          this.wechatData = res.data;
          setCookie('openid', this.wechatData.openid,7); //openId 7天有效时间
          let params= {
            openid:this.wechatData.openid,
            uid:this.$route.query.uid || this.getQueryString('uid'),
            ip:localStorage.getItem('Ip'),
            room_id:this.$route.params.id
          }
          this.$http.shareRec(params).then(res=>{
            this.$message({
            type: 'success',
            message: res.data.msg,
            offset:300,
            duration:2000
          });
          })
          if(!this.getCookie("token")) {
            let paramsList = {
              auth_id:this.wechatData.openid,
              type:"wechat"
            }
            this.$http.getLoginOther(paramsList).then(res=>{
              if(res.data.code == 200) {
                setCookie('token',res.data.data.token,7)
              }
            })
          }

        })
      }else if(this.isWeixin && this.getCookie('openid')){
        //有token的情况下分享记录
        let params={
          openid:this.wechatData.openid,
          uid:this.$route.query.uid || this.getQueryString('uid'),
          ip:localStorage.getItem('Ip'),
          room_id:this.$route.params.id
        }
        this.$http.shareRec(params).then()
      }
      // setTimeout(()=>{
      //    let showMaskIfo =JSON.parse(window.localStorage.getItem('thatVIfo')) ;
      // if(+showMaskIfo.amount && !showMaskIfo.is_pay_vod){
      //    this.$notify({
      //     title: '温馨提示',
      //     message: '此视频为收费视频,请付费后观看',
      //     position: 'bottom-left',
      //     type:"warning",
      // 		duration:5000,//设置0的话的则不会关闭
      //   });
      // }
      // window.console.log('------------------------------')
      // },500)

      
  },
}
</script>
<style>
    .paymask-fade-enter-active,
.paymask-fade-leave-active {
  transition: all 0.4s ease;
}
.paymask-fade-enter,
.paymask-fade-leave-to {
  opacity: 0;
  transform: translate(0px, -200px);
}
</style>