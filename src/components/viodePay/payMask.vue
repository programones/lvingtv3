<template>
  <div class="pay-mask-mask">
    <div class="mask-container">
      <div class="title">
        <i class="el-icon-close" id="close" @click="closeThat"></i> 付费观看
      </div>
      <div class="details" @click="showDetiles">详情</div>
      <div class="section">￥{{payVideoData.amount}}</div>
      <button type="button" id="sure-pay" @click="callPayFn">确认支付</button>
    </div>
     <transition name="paydetile-fade">
    <div class="about-detile" v-if="showAbout">
      <p class="title">详细</p>
      <div class="content" v-html="payVideoData.pay_explain">详细信息</div>
      <button type="button" id="sure-close" @click="closeDeile">关闭</button>
    </div>
    </transition>
  </div>
</template>

<script>
import bus from "../../eventBus";
import { getCookie } from "../../api/aboutCookies";
import { parse } from "path";
export default {
  props: {},
  data() {
    return {
      payVideoData: {}, //整个支付视频数据
      showAbout: false, //显示详细支付说明
      isWeixin: false,
      signData: {}
    };
  },
  methods: {
    showDetiles() {
      //点击详细事件
      this.showAbout = true;
    },
    getPassVideoData() {
      bus.$on("payVideoDatas", data => {
        this.payVideoData = data 
        //  window.console.log(data,'121521321531515')
      });
    },
    //关闭最外遮罩层
    closeThat() {
      // window.console.log(this.$parent._data.showPayMask)
      // this.$emit("closeMask", false)
      this.$parent._data.showPayMask=false;
    },
    closeDeile() {
      //关闭最外层详细提示
      this.showAbout = false;
    },
    callPayFn() {
      //点击支付按钮调起微信支付
      let ua = navigator.userAgent.toLowerCase();
      this.isWeixin = ua.indexOf("micromessenger") != -1;
      window.console.log("发起微信支付");
      //判断是否属于录播
      if(this.$route.query.history || this.$route.query.lesson){
        this.payVideoData.isliving=true
      }else{
        this.payVideoData.isliving=false
      }
      // window.console.log('是否能够判断是否为录播=>',this.payVideoData) //ok
      let getToken = getCookie("token");
      if (getToken) {
  
        if (this._isMobile() && !this.isWeixin) {
          let params = {
            room_id: this.$route.params.id,
            member_token: getToken,
            pay_way: "H5WX",
            pay_type: this.payVideoData.isliving ?'live_pay':"vod_pay",
            vod_id: this.payVideoData.vod_id
          };
          this.$http.getlessonPay(params).then(res => {
            if (res.data.code == 200) {
              window.location.href = res.data.data.mweb_url;
            } else {
              this.$notify({
                title: res.data.msg,
                position: "bottom-left",
                duration: 3000 //设置0的话的则不会关闭
              });
            }
          });
        } else if (this._isMobile() && this.isWeixin) {
          let params2 = {
            room_id: this.$route.params.id,
            member_token: getToken,
            pay_way: "WXBROWSER",
            pay_type: "vod_pay",
            vod_id: this.payVideoData.vod_id
          };
          this.$http.getlessonPay(params2).then(res => {
            if (res.data.code == 200) {
              this.signData = JSON.parse(res.data.data);
              this.callpay();
            } else {
              this.$notify({
                title: res.data.msg,
                position: "bottom-left",
                duration: 3000 //设置0的话的则不会关闭
              });
            }
          });
        }
      }else {
        this.$notify({
                title: '请先登陆',
                position: "bottom-left",
                duration: 3000 //设置0的话的则不会关闭
              });  
      }
    },
    // 判断是否在移动端
    _isMobile() {
      let flag = navigator.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
      );
      localStorage.setItem("ismobile", flag ? 1 : 0);
      return flag;
    },
    //调其微信支付
    jsApiCall() {
      WeixinJSBridge.invoke(
        "getBrandWCPayRequest",
        {
          appId: this.signData.appId,
          timeStamp: this.signData.timeStamp,
          nonceStr: this.signData.nonceStr,
          package: this.signData.package,
          signType: this.signData.signType,
          paySign: this.signData.paySign
        },
        function(res) {
          if (res.err_msg == "get_brand_wcpay_request:ok") {
            // 使用以上方式判断前端返回,微信团队郑重提示：
            // res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
            // 添加延迟在微信公众号的时候，ios到收银台有假死的状态，等待同步的事件处理完成，处理这个问题添加的延迟的事件
            window.console.log(res);
          } else if (
            res.err_msg == "get_brand_wcpay_request:cancel" ||
            res.err_msg == "get_brand_wcpay_request:fail"
          ) {
            // 文案提示有用取消支付
            // own.openModal(null, null, "提示", "取消支付", "normal");
          }
        }
      );
    },
    callpay() {
      if (typeof WeixinJSBridge == "undefined") {
        if (document.addEventListener) {
          document.addEventListener(
            "WeixinJSBridgeReady",
            this.jsApiCall,
            false
          );
        } else if (document.attachEvent) {
          document.attachEvent("WeixinJSBridgeReady", this.jsApiCall);
          document.attachEvent("onWeixinJSBridgeReady", this.jsApiCall);
        }
      } else {
        this.jsApiCall();
      }
    }
  },
  computed: {},
  created() {},
  mounted() {
    this.getPassVideoData();
  },
  beforeDestroy(){
    bus.$off();
  },
  watch: {},
  components: {}
};
</script>

<style scoped>
.pay-mask-mask {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 1000;
}
.mask-container {
  position: absolute;
  padding-bottom: 10px;
  top: 50%;
  left: 50%;
  -webkit-transform: translateY(-50%) translateX(-50%);
  transform: translateY(-50%) translateX(-50%);
  background-color: #fff;
  border-radius: 10px;
  width: 70%;
  text-align: center;
}
.mask-container .title {
  padding: 8px 0;
  text-align: center;
  font-size: 16px;
}
.mask-container #close {
  text-indent: 4px;
  float: left;
}
.mask-container .details {
  color: #81adb0;
  position: absolute;
  top: 10px;
  right: 12px;
  font-size: 10px;
  text-decoration: underline;
}
.mask-container .section {
  padding: 0 8px;
  min-height: 80px;
  text-align: center;
  line-height: 80px;
  font-size: 24px;
}
.mask-container #sure-pay {
  width: 80%;
  border: none;
  background: -webkit-gradient(
    linear,
    left top,
    right top,
    from(#f7421c),
    color-stop(80%),
    to(#f89f46)
  );
  background: linear-gradient(90deg, #f7421c, 80%, #f89f46);
  height: 30px;
  color: #fff;
  border-radius: 50px;
  outline: none;
}
.about-detile {
  position: absolute;
  padding-bottom: 10px;
  top: 50%;
  left: 50%;
  -webkit-transform: translateY(-50%) translateX(-50%);
  transform: translateY(-50%) translateX(-50%);
  background-color: #fff;
  border-radius: 10px;
  width: 70%;
  text-align: center;
  padding: 10px;
}
.about-detile .content {
  line-height: 25px;
  font-size: 14px;
  text-align: left;
   overflow-wrap: break-word;
}
.about-detile .title {
  padding: 8px 0;
  text-align: center;
  font-size: 16px;
}
.about-detile #sure-close {
  margin-top: 10px;
  width: 80%;
  border: none;
  background: -webkit-gradient(
    linear,
    left top,
    right top,
    from(#f7421c),
    color-stop(80%),
    to(#f89f46)
  );
  background: linear-gradient(90deg, #f7421c, 80%, #f89f46);
  height: 30px;
  color: #fff;
  border-radius: 50px;
  outline: none;
}
    .paydetile-fade-enter-active,
.paydetile-fade-leave-active {
  transition: all 0.3s ease;
}
.paydetile-fade-enter,
.paydetile-fade-leave-to {
  opacity: 0;
  transform: translate(-100px, -150px);
}
</style>
