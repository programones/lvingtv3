<template>
  <div>
    <div class="chat-border">
      <p v-if="chathistory.length==0" class="no-message">暂时没有更多信息了</p>
      <ul class="chat-ul">
        <!-- <p class="chat-top" v-if="middleCahtArr.length==0">已经到顶啦~~</p> 'imgs-style'  -->
        <li class="chat-li" v-for="(item,i) in chathistory" :key="i">
          <div
            class="li-normal"
            v-if="item.msg_ext=='1'"
            :class="{'active-box':item.user_name==selfName}"
          >
            <p class="chat-name">{{item.user_name}}</p>
            <img
              :src="item.user_img ||nullImg"
              alt
              width="37"
              height="37"
              class="personImg"
              :class="{'active-img':item.user_name == selfName}"
            />
            <div
              class="chat-content"
              :class="{'active-content':item.user_name == selfName}"
            >{{item.msg_content}}</div>
          </div>

          <div class="system-img" v-if="item.msg_afterIfo.msgType=='image'">
            <p class="system-title">系统消息:</p>
            <img :src="item.msg_afterIfo.content" alt width="100%" />
          </div>
          <div class="li-redpaper"  v-else-if="item.msg_ext=='2'" @click="toOpenRedPaper(i,item)">
            <div class="red-box" :class="{'active':item.if_click_redpaper==true}">
              <img src="../../assets/hong_baotimg.jpg" alt height="100%" />
              <span class="content">{{item.msg_afterIfo.red_title}}</span>
            </div>
          </div>
          <div class="system-msg" v-else-if="item.msg_ext=='4'">
            <div class="msg-content">系统提示:{{item.msg_afterIfo.content}}</div>
          </div>
          <div class="syetem-gift" v-else-if="item.msg_ext=='3'">
            <img :src="item.msg_afterIfo.user_img" alt width="25" height="25" />
            {{item.msg_content}}
            <img
              :src="item.msg_afterIfo.gift_img || giftUrl"
              width="30"
              height="30"
            />
          </div>
        </li>
      </ul>
      <!-- 礼物打赏按钮 -->
      <div class="reward" @click="showGifts"></div>
      <!-- 问卷调查按钮 -->
      <div class="question-from" @click="toQuestionFrom" v-if="room_id==51"> <i class="iconfont icon-ziyuan"></i></div>
    </div>
    <div class="chat-sendmsg">
      <input
        type="text"
        id="cont"
        :placeholder="ifLogin?'':'请登陆后参与互动'"
        v-model="sendaMsg"
        @keyup.enter="sendMsg"
         maxlength="30"
      />
      <button @click="sendMsg" id="btn">发送</button>
    </div>
    <div class="reward-content">
      <div class="top" @click="hiddenGifts">
        <i class="iconfont icon-jiantou9"></i>
      </div>
      <div class="gitf" v-for="(item,i) in gitlist" :key="i" @click="payGitf(item)">
        <img :src="item.gift_img" />
        <p class="gift-name">{{item.gift_title}}</p>
        <p class="gift-currency">{{item.gift_virtual_money}}奖学金</p>
      </div>
    </div>
    <!-- 提示礼物费及确认是否付费框 -->
    <transition-group name="gift-fade" mode="in-out">
      <div class="pay-gift" v-if="showPayGift" key="gift">
        <i id="close" class="el-icon-close" @click="closePay"></i>
        <div class="title">
          <span class="img">
            <img :src="giftIfo.gift_img" width="66" height="66" />
          </span>
        </div>
        <div class="cash">￥{{giftIfo.gift_pay_money}}</div>
        <div>
          <button @click="rerallyPay(giftIfo.gift_id)">立即支付</button>
        </div>
      </div>

       <!-- 点击打开红包 -->
    <div class="red" v-if="showRedPaper" key="red-paper">
       <div class="rp-content">
         <div class="rp-body">
          <p id="close-paper" @click="closeRedPaper"> <i class="el-icon-close"></i></p>
           <img src="../../assets/reBG-open.9333f7b7.png" alt="" >
           <p class="title" v-if="showRedPaTitle">{{redPaperData.msg_afterIfo.red_content}}</p>
           <p class="money" v-if="showMoney">{{amout}}</p>
           <img :src="redPaperData.msg_afterIfo.red_img" alt="" class="cover-img" @click="toimgad">
           <button class="open-red" @click.once="drawRedPaper()" v-if="redPaperData.if_open">開</button>
         </div>
         </div> 
    </div>

    </transition-group>
    <transition name="toast-fade">
      <toast v-if="showToast" :toastMsg="toastMsg" key="toast"></toast>
    </transition>
   
  </div>
</template>

<script>
import { http } from "../../http/http";
import { log } from "util";
import animation from "../../api/animationSlow";
import toast from "../tusi/toast";
import { getCookie, setCookie, delCookie } from "../../api/aboutCookies";
import bus from "../../eventBus";
 
export default {
  name: "videotabsChat",
  components: {
    toast
  },
  data() {
    return {
      nullImg:
        "http://d.hiphotos.baidu.com/zhidao/pic/item/cb8065380cd79123dc50bc3caf345982b3b780c1.jpg", //没有用户头像的情况下默认头像
      giftUrl:
        "http://pic.51yuansu.com/pic3/cover/01/26/24/5922f81061684_610.jpg", //没有礼物链接默认礼物形象
      chathistory: [], //历史聊天记录
      gitlist: [],
      sendaMsg: "", //聊天信息
      toastMsg: "loading",
      showToast: false, //是否显示土司
      chatNum: 1, //默认的聊天页数
      middleCahtArr: [], //中间历史聊天记录
      onShowOnce: true,
      showPayGift: false, //展示付费礼物
      giftIfo: {}, //单个礼物信息
      ifLogin: false, //判断是否登陆状态
      selfName: "", //用户ID用与判断消息是否位自己发送的
      showRedPaper:false,//控制红包是否显示
      redPaperData:{},//红包相关信息
      showMoney:false,//显示具体获得红包金额
      showRedPaTitle:true,//显示红包的标题
      amout:0,//红包金额
      timepaper:null,//节流红包点击
      //////////////////////
      info_data: {},
      listeners: {},
      loginInfo: {},
      options: {},
      userSig: "", //用户身份凭证
      headimgurl: "", //头像链接
      accountMode: 0, //账号模式
      avChatRoomId: "",
      selType: "",
      selToID: "",
      selSess: "",
      selSessHeadUrl: "",
      is_allow: true, //消息发送成功或是失败
      redPaperData: {}, //红包信息
      selSess: "",
      msg_seq: "",
      msg_time: "",
      msg_subtype: "",
      //////////////////////
      signData:{}, //礼物支付数据
      room_id:0,//房间号
      timer:null,//用于防抖函数
      isWeixin:false,//判断是否在微信浏览器
    };
  },
  methods: {
    //滚动到底部的方法
    scorllBottomFn() {
      let chatBox = document.querySelector(".chat-border");
        //  window.console.log(chatBox.scrollHeight)
      chatBox.scrollTop = chatBox.scrollHeight;
     
    },
    //信息加载后滚动到一定距离的方法
    scorllspaceFn() {
     
      let chatBox = document.querySelector(".chat-border");
      // let ulBox = document.querySelector(".chat-ul");
        //  window.console.log(chatBox.scrollHeight)
      chatBox.scrollTop = 200;
     
    },
    getchatHistory() {
      //获取聊天信息
      let params = {
        room_id: this.$route.params.id,
        member_token: "",
        page: this.chatNum
      };
      http.getchatHistory(params).then(res => {
        if (res.data.code == 200) {
          let beforeData = res.data.data;
          beforeData.forEach(item => {
            if (item.msg_ext == 4 || item.msg_ext == 3 || item.msg_ext == 2) {
              item.msg_afterIfo = JSON.parse(item.msg_info);
              item.if_click_redpaper=false;
              item.if_open=true;
            } else {
              item.msg_afterIfo = {
                content: "",
                msgType: "",
                user_img: "",
                user_name: "",
                red_img: "",
                red_content: "",
                
              };
            }
          });

          this.middleCahtArr = res.data.data;
          let arr = [];
          arr = this.middleCahtArr.reverse();
          this.chathistory = arr.concat(this.chathistory);
          // window.console.log(this.chathistory, "聊天信息~~");
          if (this.onShowOnce) {
            //第一次渲染时消息处滚动条滚动到最底下
            setTimeout(() => {
              this.scorllBottomFn();
              this.onShowOnce = false;
            });
          }
        }
      });
    },

    sendMsg() {
      //点击发上传信息到服务器
      if(!+window.localStorage.getItem('token')){
        this.$notify({
          title: '请先登陆',
          position: 'bottom-left',
      		duration:3000,//设置0的话的则不会关闭
        });
      }else{
             if (this.sendaMsg == "") {
        this.showToast = true;
        this.toastMsg = "输入内容为空!";
        setTimeout(() => {
          this.showToast = false;
        }, 2000);
      } else {
        //消息不为空 发送消息
        this.sendChatInfo();
      }
      }
   
    },
    sendChatInfo() {
      //发送聊天信息需要用到的方法
      this.$http.getUserIfo(getCookie("token")).then(res => {
        window.console.log(res, "getUserIfo发送消息方法;");
        if (res.data.code == 200) {
          this.onSendMsg();
          let params = {
            member_token: getCookie("token"),
            message: this.sendaMsg
          };
          this.$http.sendchatmsg(params).then(res => {
            window.console.log(res, "sendchatmsg发送消息方法");
            if (res.data.code == 500) {
              this.toastFn(res.data.msg);
              this.sendaMsg = "";
            } else if (res.data.code == 200) {
            }
          });
        }
      });
    },
    onSendMsg() {
      // 发送消息时与webim sdk 通讯
      if (!this.loginInfo.identifier) {
        //将account_type保存到cookie中,有效期是1天
        if (this.accountMode == 1) {
          webim.Tool.setCookie(
            "accountType",
            this.loginInfo.accountType,
            3600 * 24
          );
          //调用tls登录服务
          this.tlsLogin();
        } else {
          //独立模式
          console.log("请填写帐号和票据");
        }
        return;
      }
      if (!this.selToID) {
        console.log("您还没有进入房间，暂不能聊天");
        this.sendaMsg = "";
        return;
      }
      var msgLen = webim.Tool.getStrBytes(this.sendaMsg);

      var maxLen, errInfo;
      if (this.selType == webim.SESSION_TYPE.GROUP) {
        maxLen = webim.MSG_MAX_LENGTH.GROUP;
        errInfo = "消息长度超出限制(最多" + Math.round(maxLen / 3) + "汉字)";
      } else {
        maxLen = webim.MSG_MAX_LENGTH.C2C;
        errInfo = "消息长度超出限制(最多" + Math.round(maxLen / 3) + "汉字)";
      }
      if (msgLen > maxLen) {
        onSendMsg(errInfo);
        return;
      }
      if (!this.selSess) {
        this.selSess = new webim.Session(
          this.selType,
          this.selToID,
          this.selToID,
          this.selSessHeadUrl,
          Math.round(new Date().getTime() / 1000)
        );
      }
      var isSend = true; //是否为自己发送
      var seq = -1; //消息序列，-1表示sdk自动生成，用于去重
      var random = Math.round(Math.random() * 4294967296); //消息随机数，用于去重
      var msgTime = Math.round(new Date().getTime() / 1000); //消息时间戳
      var subType; //消息子类型
      if (this.selType == webim.SESSION_TYPE.GROUP) {
        //群消息子类型如下：
        //webim.GROUP_MSG_SUB_TYPE.COMMON-普通消息,
        //webim.GROUP_MSG_SUB_TYPE.LOVEMSG-点赞消息，优先级最低
        //webim.GROUP_MSG_SUB_TYPE.TIP-提示消息(不支持发送，用于区分群消息子类型)，
        //webim.GROUP_MSG_SUB_TYPE.REDPACKET-红包消息，优先级最高
        subType = webim.GROUP_MSG_SUB_TYPE.COMMON;
      } else {
        //C2C消息子类型如下：
        //webim.C2C_MSG_SUB_TYPE.COMMON-普通消息,
        subType = webim.C2C_MSG_SUB_TYPE.COMMON;
      }
      var msg = new webim.Msg(
        this.selSess,
        isSend,
        seq,
        random,
        msgTime,
        this.loginInfo.identifier,
        subType,
        this.loginInfo.identifierNick
      );
      //解析文本和表情
      var expr = /\[[^[\]]{1,3}\]/gm;
      var emotions = this.sendaMsg.match(expr);
      var text_obj, face_obj, tmsg, emotionIndex, emotion, restMsgIndex;
      if (!emotions || emotions.length < 1) {
        text_obj = new webim.Msg.Elem.Text(this.sendaMsg);
        msg.addText(text_obj);
      }
      webim.sendMsg(
        msg,
        () => {
          if (this.selType == webim.SESSION_TYPE.C2C) {
            //私聊时，在聊天窗口手动添加一条发的消息，群聊时，长轮询接口会返回自己发的消息
            this.showMsg(msg);
          }
          webim.Log.info("发消息成功");
          // this.sendaMsg=''
          //保存消息
          this.msg_seq = seq;
          this.msg_time = msgTime;
          this.msg_subtype = subType;
          this.saveHistoryInfo();
        },
        err => {
          webim.Log.error("发消息失败:" + err.ErrorInfo);
          console.log("发消息失败:" + err.ErrorInfo);
        }
      );
    },
    //保存历史聊天记录
    saveHistoryInfo() {
      let params = {
        member_token: getCookie("token"),
        m_account: getCookie("mobile"),
        m_uid: getCookie("uid"),
        m_nick: this.loginInfo.identifierNick, //ok
        m_img: this.loginInfo.headurl, //ok
        m_groupid: this.avChatRoomId, //ok
        m_seq: this.msg_seq,
        m_time: this.msg_time,
        m_ip: localStorage.getItem("Ip"), //ok
        m_text: this.sendaMsg, //ok
        m_subtype: this.msg_subtype,
        m_type: "TIMTextElem",
        m_ext: 1
      };
      this.$http.savechatHistory(params).then(res => {
        console.log(res, "savechatHistory返回的的消息");
        this.sendaMsg = "";
      });
    },
    //点击打开红包
    toOpenRedPaper(i,data){
      // window.console.log(data);
          this.chathistory[i].if_click_redpaper=true
        this.redPaperData = data;
        this.showRedPaper = true;
        //获取点击统计
        let params = {
          ads_id :data.msg_afterIfo.ads_id,
          ip:window.localStorage.getItem('Ip'),
          iploc:window.localStorage.getItem('cityname'),
          member_token:getCookie('token')
        }
        this.$http.clickRedpaper(params).then(res=>{
          window.console.log(res)
        })
    },
    //关闭红包显示
    closeRedPaper(){
        this.showRedPaper = false;
      
    },
    toimgad(){
      //点击图片跳转到广告页
      window.console.log('跳转广告页面~~~')
    },
    //点击开领取红包
    drawRedPaper(){
      window.console.log('红包单个开启',this.redPaperData);
      this.redPaperData.if_open = false;
              let params = {
        member_token:getCookie('token'),
        rp_id:this.redPaperData.msg_afterIfo.rp_id,
        room_id:this.$route.params.id
      }
      if(getCookie('token')){
        this.$http.drawRedPaper(params).then(res=>{
          window.console.log(res)
          if(res.data.code == 200){
            this.showMoney = true
            this.amout= '￥'+res.data.data.money
            this.showToast = true;
            this.toastMsg = '领取成功!';
             window.setTimeout(() => {
                this.showToast = false;
              }, 3000); 
          }else if(res.data.code == 504|| res.data.code == 503){
            this.showToast = true;
               this.toastMsg = res.data.msg;
             window.setTimeout(() => {
                this.showToast = false;
              }, 3000); 
             
          }
      })
      }else{
        this.showToast = true;
               this.toastMsg ='请先登陆';
             window.setTimeout(() => {
                this.showToast = false;
              }, 2000); 
      } 
      
      // window.console.log('.............')
    },
    //红包的节流
    //  redpaperlimit(){
    //    if(this.timepaper){
    //      clearTimeout(this.timepaper)
    //    }
    //    this.timepaper = setTimeout(()=>{

   

    //    },2000)
    //  },
    showGifts() {
      //点击展示礼物列表
      //  window.console.log('礼物');
      let giftHeight = document.querySelector(".reward-content");
      animation(giftHeight, { bottom: 0, opacity: 1 });
    },
    getgits() {
      //获取礼物列表
      http.getGift(this.$route.params.id).then(res => {
        window.console.log(res, "礼物列表");
        if (res.data.code == 200) {
          this.gitlist = res.data.data;
        }
      });
    },
    hiddenGifts() {
      //隐藏礼物列表
      let giftHeight = document.querySelector(".reward-content");
      animation(giftHeight, { bottom: -1500, opacity: 0 });
    },
    payGitf(val) {
      //点击相关礼物
      window.console.log(val, "某个礼物");
      this.showPayGift = true;
      this.giftIfo = val;
    },
    //点击跳转调查问卷
    toQuestionFrom(){
      window.console.log('111111111');
      this.$router.push({name:'questionform',params:{'id':this.room_id}})
    },
    chathandleScroll() {
      let clientHeight = document.querySelector(".chat-border").clientHeight;
      // 设备/屏幕高度
      let scrollObj = document.querySelector(".chat-border"); // 滚动区域
      let scrollTop = scrollObj.scrollTop; // 监听元素 到头部的距离
           
      //滚动条到顶部的条件
      if (scrollTop == 0) {
  
        this.chatNum++;
        if (this.middleCahtArr.length) {
            //  window.console.log('21212');
          // this.getchatHistory();
        
          // this.scorllspaceFn();
          //防抖
            this.functonTimer();
        } else {
          this.showToast = true;
          this.toastMsg = "到顶了哟";
          setTimeout(() => {
            this.showToast = false;
          }, 2000);
        }
      }
    },
    // 防抖函数
    functonTimer(){
      if(this.timer){
        clearTimeout(this.timer)
      }
      this.tiemr = setTimeout(()=>{      
         this.getchatHistory();
        
          this.scorllspaceFn();
      },1000)
    },
    closePay() {
      //关闭礼物付费展示
      this.showPayGift = false;
    },
    rerallyPay(id) {
      //点击付费
      window.console.log(id,"付费了哦");
      this.toPayGitf(id)
    },
    toPayGitf(id){
      if(getCookie('token')){
        if(this.isWeixin){
         let params = {
            room_id:this.$route.params.id,
            member_token:getCookie('token'),
            pay_way:'WXBROWSER',
            pay_type:'gift_pay',
            gift_id:id
          }
          this.$http.getGiftPay(params).then(res=>{
            if(res.data.code == 200){
              this.signData = JSON.parse(res.data.data);
              ///订单成功预订
               //发起支付
               this.callpay()
            } else {
         this.$notify({
          title: res.data.msg,
          position: 'bottom-left',
      		duration:3000,//设置0的话的则不会关闭
        });
            } 
          })
        }else{
            this.$notify({
          title: '请在微信端中打开链接支付',
          position: 'bottom-left',
      		duration:3000,//设置0的话的则不会关闭
        });
        }
      }else{
           this.$notify({
          title: '请先登陆',
          position: 'bottom-left',
          duration:3000,//设置0的话的则不会关闭
          });
      }
    },
    callpay(){
      if (typeof WeixinJSBridge == "undefined"){
       if( document.addEventListener ){
           document.addEventListener('WeixinJSBridgeReady', this.jsApiCall, false);
                }else if (document.attachEvent){
                    document.attachEvent('WeixinJSBridgeReady', this.jsApiCall); 
                    document.attachEvent('onWeixinJSBridgeReady', this.jsApiCall);
                }
            }else{
                this.jsApiCall();
            }
    },
    jsApiCall(){
       //支付请求
       WeixinJSBridge.invoke(
            'getBrandWCPayRequest',
            {
                'appId': this.signData.appId,
                "timeStamp": this.signData.timeStamp,
                "nonceStr": this.signData.nonceStr,
                "package": this.signData.package,
                "signType": this.signData.signType,
                "paySign": this.signData.paySign,
            },
            function(res){
               if(res.err_msg == "get_brand_wcpay_request:ok" ){
                 //支付成功
               }else{
                 //支付取消
               } 
            }
            );
    },
    //IE9(含)以下浏览器用到的jsonp回调函数
    jsonpCallback(rspData) {
      //设置接口返回的数据
      webim.setJsonpLastRspData(rspData);
    },
    //监听大群新消息（普通，点赞，提示，红包）
    onBigGroupMsgNotify(msgList) {
      for (var i = msgList.length - 1; i >= 0; i--) {
        //遍历消息，按照时间从后往前
        var msg = msgList[i];
        webim.Log.warn(
          "receive a new avchatroom group msg: " + msg.getFromAccountNick()
        );
        //显示收到的消息
        this.showMsg(msg);
      }
      //  window.console.log(msgList,'这是msglist')
    },
    showMsg(msg) {
      var isSelfSend, fromAccount, fromAccountNick, sessType, subType;
      var li, paneDiv, textDiv, img, nickNameSpan, contentSpan;
      fromAccount = msg.getFromAccount();
      if (!fromAccount) {
        fromAccount = "";
      }
      fromAccountNick = msg.getFromAccountNick();
      if (!fromAccountNick) {
        fromAccountNick = "未知用户";
      }
      isSelfSend = msg.getIsSend(); //消息是否为自己发的
      sessType = msg.getSession().type(); //解析消息
      subType = msg.getSubType();
      switch (subType) {
        case webim.GROUP_MSG_SUB_TYPE.COMMON: //群普通消息
          if (this.is_allow) {
            this.toPushChatIfo(msg);
          }
          break;

        case webim.GROUP_MSG_SUB_TYPE.REDPACKET: //群红包消息
          this.toPushChatIfo(msg);
          break;

        case webim.GROUP_MSG_SUB_TYPE.LOVEMSG: //群点赞消息
          break;

        case webim.GROUP_MSG_SUB_TYPE.TIP: //群提示消息
          this.toPushChatIfo(msg);

        default:
          //  this.toastFn('1111111111'+msg.tipText);

          window.console.log(msg.tipText, "这是msg.tipText");
          window.console.log(msg, "这是msg");
          window.console.log(webim, "这是webim");
          window.console.log(fromAccount, "2222222222222222222222222");
          window.console.log(msg.getSubType, "00000000000000000");
          break;
      }
    },
    //监听新消息(私聊(包括普通消息、全员推送消息)，普通群(非直播聊天室)消息)事件
    //newMsgList 为新消息数组，结构为[Msg]
    onMsgNotify(newMsgList) {
      var newMsg;
      for (var j in newMsgList) {
        //遍历新消息
        newMsg = newMsgList[j];
        this.handlderMsg(newMsg); //处理新消息
        console.log(newMsg);
      }
    },
    handlderMsg(msg) {
      var fromAccount, fromAccountNick, sessType, subType, contentHtml;
      fromAccount = msg.getFromAccount();
      if (!fromAccount) {
        fromAccount = "";
      }
      fromAccountNick = msg.getFromAccountNick();
      if (!fromAccountNick) {
        fromAccountNick = fromAccount;
      }
      //解析消息
      //获取会话类型
      //webim.SESSION_TYPE.GROUP-群聊，
      //webim.SESSION_TYPE.C2C-私聊，
      sessType = msg.getSession().type();
      //获取消息子类型
      //会话类型为群聊时，子类型为：webim.GROUP_MSG_SUB_TYPE
      //会话类型为私聊时，子类型为：webim.C2C_MSG_SUB_TYPE
      subType = msg.getSubType();
      switch (sessType) {
        case webim.SESSION_TYPE.C2C: //私聊消息
          switch (subType) {
            case webim.C2C_MSG_SUB_TYPE.COMMON: //c2c普通消息
              if (this.convertMsgtoHtml(msg)) {
                contentHtml = this.convertMsgtoHtml(msg);
              }
              webim.Log.warn(
                "receive a new c2c msg: fromAccountNick=" +
                  fromAccountNick +
                  ", content=" +
                  contentHtml
              );
              var opts = {
                To_Account: fromAccount, //好友帐号
                LastedMsgTime: msg.getTime() //消息时间戳
              };
              webim.c2CMsgReaded(opts);
              console.log(
                "收到一条c2c消息(好友消息或者全员推送消息): 发送人=" +
                  fromAccountNick +
                  ", 内容=" +
                  contentHtml
              );
              break;
          }
          break;
        case webim.SESSION_TYPE.GROUP: //普通群消息，对于直播聊天室场景，不需要作处理
          break;
      }
    },
    toPushChatIfo(msg) {
      //将聊天信息添加到聊天信息数组中
      let elems = msg.getElems(),
        elem,
        type;
      let content;
      let addIfo = {};
      let msg_afterIfo = {
        content: "",
        msgType: "",
        red_content: "",
        red_img: "",
        user_img: "",
        user_name: ""
      };
      for (let i in elems) {
        elem = elems[i];
        type = elem.getType(); //获取元素类型
        content = elem.getContent(); //获取元素对象
        switch (type) {
          // 普通群消息
          case webim.MSG_ELEMENT_TYPE.TEXT:
            let accNick = msg.getFromAccountNick();
            if (accNick.length == 11) {
              accNick = accNick.replace(/(\d{3})(\d{4})/, "$1****");
            }
            content.userinfo = {}; //获取用户昵称

            addIfo.msg_ext = "1";
            addIfo.msg_afterIfo = msg_afterIfo;
            addIfo.user_name = accNick || ""; //获取用户昵称
            addIfo.user_img = msg.getFromAccountHeadurl();
            addIfo.msg_content = content.text || "";
            window.console.log(addIfo);
            this.chathistory.push(addIfo);
            window.setTimeout(() => {
              this.scorllBottomFn(); //滚动到底部的方法
            }, 1000);
            break;
          // 表情
          case webim.MSG_ELEMENT_TYPE.FACE:
            window.console.log("表情");
            break;
          // 图片
          case webim.MSG_ELEMENT_TYPE.IMAGE:
            window.console.log("图片");
            break;
          // 音频
          case webim.MSG_ELEMENT_TYPE.SOUND:
            window.console.log("音频");
            break;
          // 文件
          case webim.MSG_ELEMENT_TYPE.FILE:
            window.console.log("文件");
            break;
          // 地理位置
          case webim.MSG_ELEMENT_TYPE.LOCATION:
            break;
          // 自定义消息
          case webim.MSG_ELEMENT_TYPE.CUSTOM:
            addIfo.msg_ext = "2";
            let data = content.getData();
            let desc = content.getDesc();
            let ext = content.getExt();
            this.redPaperData = JSON.parse(content.data);
            let videoData = JSON.parse(content.data);
            this.$set(this.redPaperData, "desc", desc);
            if (ext == "room_red_packet") {
              //红包信息
              ext == "room_red_packet";
              addIfo.msg_info = content.data;
              addIfo.msg_content = this.redPaperData.red_content;
              addIfo.msg_afterIfo = this.redPaperData.red_content;
              window.console.log(addIfo);
              this.chathistory.push(addIfo);
            } else if (videoData.livestatus == 1 || videoData.livestatus == 2) {
              //直播视频开播信息
              bus.$emit("VideopayerData", videoData);
              this.$message({
                type: "success",
                message: "主播已开播",
                offset: 300,
                duration: 2000
              });
            } else if (videoData.livestatus == 0) {
              this.$message({
                type: "warning",
                message: "主播已离开",
                offset: 300,
                duration: 2000
              });
            }
            break;
          // 提示消息
          case webim.MSG_ELEMENT_TYPE.GROUP_TIP:
            this.convertGroupTipMsgToHtml(content);
            break;
          default:
            webim.Log.error("未知消息元素类型: elemType=" + type);
            break;
        }
        window.console.log(type, "这是类型00000000000000");
      }
      // window.console.log(addIfo)
      // this.chathistory.push(addIfo)
    },
    //解析提示消息方法
    convertGroupTipMsgToHtml(content) {
      const WEB_IM_GROUP_TIP_MAX_USER_COUNT = 10;
      let text = "";
      const maxIndex = WEB_IM_GROUP_TIP_MAX_USER_COUNT - 1;
      let opType, opUserId, userIdList;
      let memberCount;
      opType = content.getOpType(); //群提示消息类型（操作类型）
      opUserId = content.getOpUserId(); //操作人id
      userIdList = content.getUserInfo();
      switch (opType) {
        case webim.GROUP_TIP_TYPE.JOIN: //加入群
          let name;
          for (let m in userIdList) {
            if (userIdList[m].NickName != undefined) {
              name = userIdList[m].NickName;
            } else {
              name = userIdList[m].UserId;
            }
            this.showToast = true;
            this.toastMsg = name + "进入房间";
            window.console.log("进入房间");
            window.setTimeout(() => {
              this.showToast = false;
            }, 2000);
            //  this.$message({
            //   type: 'success',
            //   message: name+"进入房间",
            //   offset:400,
            //   duration:2000
            // });
          }
          break;
        case webim.GROUP_TIP_TYPE.QUIT: //退出群
          break;

        case webim.GROUP_TIP_TYPE.KICK: //踢出群
          break;

        case webim.GROUP_TIP_TYPE.SET_ADMIN: //设置管理员
          break;

        case webim.GROUP_TIP_TYPE.CANCEL_ADMIN: //取消管理员
          break;

        case webim.GROUP_TIP_TYPE.MODIFY_GROUP_INFO: //群资料变更
          break;

        case webim.GROUP_TIP_TYPE.MODIFY_MEMBER_INFO: //群成员资料变更(禁言时间)
          var memberInfoList = content.getMemberInfoList();
          var userId, shutupTime;
          for (var m in memberInfoList) {
            userId = memberInfoList[m].getUserId();
            shutupTime = memberInfoList[m].getShutupTime();
            if (shutupTime != null && shutupTime !== undefined) {
              if (shutupTime == 0) {
                this.toastFn(userId + ":取消禁言");
              } else {
                this.toastFn(userId + "禁言" + shutupTime + "秒;");
              }
            } else {
              this.toastFn(userId + "shutupTime为空");
            }
            if (
              memberInfoList.length > WEB_IM_GROUP_TIP_MAX_USER_COUNT &&
              m == maxIndex
            ) {
              this.toastFn(userId + "等" + memberInfoList.length + "人");
              break;
            }
          }
          break;
        default:
          this.toastFn("未知群提示消息类型：type=" + opType);
          break;
      }
    },
    toastFn(msg) {
      //土司提示方法
      this.showToast = true;
      this.toastMsg = msg;
      window.setTimeout(() => {
        this.showToast = false;
      }, 2000);
    },
    sdkLogin() {
      //聊天室sdk登陆
      webim.login(
        this.loginInfo,
        this.listeners,
        this.options,
        identifierNick => {
          //identifierNick 为登录用户昵称(没有设置时，为帐号)，无登录态时为空
          webim.Log.info("webim登录成功");
          this.applyJoinBigGroup(this.avChatRoomId); //加入大群
        },
        err => {
          console.log(err.ErrorInfo);
        }
      );
    },
    //tls登录
    tlsLogin() {
      //跳转到TLS登录页面
      TLSHelper.goLogin({
        sdkappid: this.loginInfo.sdkAppID,
        acctype: this.loginInfo.accountType,
        url: window.location.href
      });
    },
    //登出
    logout() {
      webim.logout(resp => {
        webim.Log.info("登出成功");
        this.loginInfo.identifier = null;
        this.loginInfo.userSig = null;
      });
    },
    //第三方应用需要实现这个函数，并在这里拿到UserSig
    tlsGetUserSig(res) {
      if (res.ErrorCode == webim.TLS_ERROR_CODE.OK) {
        //从当前URL中获取参数为identifier的值
        this.loginInfo.identifier = webim.Tool.getQueryString("identifier");
        //拿到正式身份凭证
        this.loginInfo.userSig = res.UserSig;
        //从当前URL中获取参数为sdkappid的值
        this.loginInfo.sdkAppID = this.loginInfo.appIDAt3rd = Number;
        webim.Tool.getQueryString("sdkappid");
        //从cookie获取accountType
        var accountType = webim.Tool.getCookie("accountType");
        if (accountType) {
          this.loginInfo.accountType = accountType;
          this.sdkLogin(); //sdk登录
        } else {
          location.href = location.href.replace(/\?.*$/gi, "");
        }
      } else {
        //签名过期，需要重新登录
        if (res.ErrorCode == webim.TLS_ERROR_CODE.SIGNATURE_EXPIRATION) {
          this.tlsLogin();
        } else {
          console.log("[" + res.ErrorCode + "]" + res.ErrorInfo);
        }
      }
    },

    applyJoinBigGroup(groupId) {
      //sdkLogin 中的必要参数
      var options = {
        GroupId: groupId //群id
      };
      webim.applyJoinBigGroup(
        options,
        resp => {
          if (resp.JoinedStatus && resp.JoinedStatus == "JoinedSuccess") {
            webim.Log.info("进群成功");
            this.selToID = groupId;
          } else {
            this.toastMsg = "进群失败";
            this.showToast = true;
            setTimeout(() => {
              this.showToast = false;
            }, 2000);
          }
        },
        err => {
          console.log(err.ErrorInfo);
        }
      );
    },
    //直播间聊天mouted方法
    chatMoutedFn() {
      window.setTimeout(() => {
        let paramsRoomIfo = {
          member_token:getCookie("token"),
          ip: localStorage.getItem("Ip"),
          room_id: this.$route.params.id
        };
        this.$http.getroomIfo(paramsRoomIfo).then(res => {
          this.info_data = res.data.data;
          if (res.data.code == 200) {
            this.userSig = res.data.data.userSig;
            this.headimgurl = res.data.data.headimgurl;
            //帐号模式，0-表示独立模式，1-表示托管模式
            this.accountMode = 0;
            //官方 demo appid,需要开发者自己修改（托管模式）
            var sdkAppID = 1400272060;
            var accountType = 36862;
            this.avChatRoomId = res.data.data.room_number; //默认房间群
            if (webim.Tool.getQueryString("groupid")) {
              this.avChatRoomId = webim.Tool.getQueryString("groupid"); //用户自定义房间群id
            }
            this.selType = webim.SESSION_TYPE.GROUP;
            this.selToID = this.avChatRoomId; //当前选中聊天id（当聊天类型为私聊时，该值为好友帐号，否则为群号）
            this.selSess = null; //当前聊天会话
            this.selSessHeadUrl = this.nullImg;
            //当前用户身份
            this.loginInfo = {
              sdkAppID: sdkAppID, //用户所属应用id,必填
              appIDAt3rd: sdkAppID, //用户所属应用id，必填
              accountType: accountType, //用户所属应用帐号类型，必填
              identifier: res.data.data.openid, //当前用户ID,必须是否字符串类型，选填
              identifierNick: res.data.data.nickname, //当前用户昵称，选填
              userSig: this.userSig, //当前用户身份凭证，必须是字符串类型，选填
              headurl: this.headimgurl ? this.headimgurl : this.nullImg //当前用户默认头像，选填
            };
            let onGroupSystemNotifys = {
              "5": this.onDestoryGroupNotify, //群被解散(全员接收)
              "11": this.onRevokeGroupNotify, //群已被回收(全员接收)
              "255": this.onCustomGroupNotify //用户自定义通知(默认全员接收)
            };
            //监听连接状态回调变化事件
            let onConnNotify = resp => {
              switch (resp.ErrorCode) {
                case webim.CONNECTION_STATUS.ON:
                  break;
                case webim.CONNECTION_STATUS.OFF:
                  webim.Log.warn("暂时没有直播信号");
                  break;
                default:
                  webim.Log.error("未知连接状态,status=" + resp.ErrorCode);
                  break;
              }
            };
            //监听事件
            this.listeners = {
              onConnNotify: onConnNotify, //选填
              jsonpCallback: this.jsonpCallback, //IE9(含)以下浏览器用到的jsonp回调函数,移动端可不填，pc端必填
              onBigGroupMsgNotify: this.onBigGroupMsgNotify, //监听新消息(大群)事件，必填
              onMsgNotify: this.onMsgNotify, //监听新消息(私聊(包括普通消息和全员推送消息)，普通群(非直播聊天室)消息)事件，必填
              onGroupSystemNotifys: onGroupSystemNotifys, //监听（多终端同步）群系统消息事件，必填
              onGroupInfoChangeNotify: this.onGroupInfoChangeNotify //监听群资料变化事件，选填
            };
            let isAccessFormalEnv = true; //是否访问正式环境
            if (webim.Tool.getQueryString("isAccessFormalEnv") == "false") {
              isAccessFormalEnv = false; //访问测试环境
            }
            //其他对象，选填
            this.options = {
              isAccessFormalEnv: isAccessFormalEnv, //是否访问正式环境，默认访问正式，选填
              isLogOn: false //是否开启控制台打印日志,默认开启，选填
            };
            let curPlayAudio = null; //当前正在播放的audio对象
            let openEmotionFlag = false; //是否打开过表情
            this.sdkLogin();
          }else if(res.data.code==501){
            // window.localStorage.setItem('token',0);
            // delCookie('token')
            // this.$notify({
            //     title: '身份过期,请重新登陆',
            //     position: "bottom-left",
            //     duration: 3000 //设置0的话的则不会关闭
            //   }); 
            // window.setTimeout(()=>{
            //  window.location.reload();   
             
          
            // },14000)
              
          }
        });
      }, 1000);
    }
  },
  created() {},
  mounted() {
    this.getchatHistory();
    this.getgits();
    window.addEventListener("scroll", this.chathandleScroll, true);
    this.chatMoutedFn();
    if (getCookie("token")) {
      //判断聊天栏palcehoder显示的内容
      this.ifLogin = true;
    }
    this.selfName = window.localStorage.getItem("selfName");

    this.room_id = this.$route.params.id;
       // 判断是否是微信浏览器
        let ua = navigator.userAgent.toLowerCase();
        this.isWeixin = ua.indexOf('micromessenger') != -1;
  },
  destroyed() {
    window.removeEventListener("scroll", this.chathandleScroll, true); //  离开页面清除（移除）滚轮滚动事件
    this.logout();
  }
};
</script>
<style>
.chat-border {
  position: relative;
  overflow-y: auto;
  height: 19rem;
}
@media (min-width: 767px) and (max-width: 1300px) {
  .chat-border {
    height: 12rem;
  }
}
@media (min-height: 800px) and (max-height: 812px) {
  .chat-border {
    height: 27rem;
  }
}
@media (min-height: 813px) and (max-height: 823px) {
  .chat-border {
    height: 23rem;
  }
}
.chat-border .chat-ul {
  padding-right: 5px;
}
.chat-border .no-message {
  font-size: 13px;
  text-align: center;
  line-height: 100px;
}
.chat-border .system-img {
  border: #a0dcf0 solid;
}
.chat-border .system-img .system-title {
  font-size: 14px;
  text-align: center;
  background-color: #a0dcf0;
  font-weight: bold;
}

.chat-border .li-redpaper .red-box {
  position: relative;
  margin-left: 14%;
  height: 100px;
  width: 75%;
  background-color: #fa9e3d;
  box-shadow: 0 0 5px #2b2b2b;
  border-radius: 5px;
}
.chat-border .li-redpaper .active {
 background-color: #facc9b;
}
.chat-border .li-redpaper .red-box .content {
  position: absolute;
  left: 109px;
  top: 40px;
  font-weight: 600;
  color: red;
  font-size: 13px;
}
.active-box {
  text-align: right;
  height: 65px;
}
.active-img {
  float: right;
}
.chat-border .active-content {
  position: absolute;
  right: 50px;
}
.chat-border .active-content:before {
  position: absolute;
  content: "";
  width: 0;
  height: 0;
  left: 100%;
  bottom: 5px;
  border-top: 6px solid #a0dcf0;
  border-right: 6px solid transparent;
  border-bottom: 6px solid transparent;
}
.chat-border .chat-li {
  padding-left: 5px;
  padding-bottom: 15px;
  position: relative;
}
.chat-border .system-msg .msg-content {
  display: inline-block;
  line-height: 27px;
  font-size: 14px;
  margin-left: 10%;
  max-width: 80%;
  padding: 0px 11px;
  background-color: #f36050;
  color: #fff;
  border-radius: 5px;
}
.chat-border .syetem-gift {
  display: inline-block;
  line-height: 27px;
  font-size: 14px;
  margin-left: 10%;
  max-width: 80%;
  padding: 10px 11px;
  background-color: #fc9f61;
  color: #fff;
  border-radius: 5px;
}
.chat-border .syetem-gift img {
  border-radius: 50%;
}
.chat-border .chat-name {
  text-indent: 9px;
  line-height: 27px;
}
.chat-border .personImg {
  display: inline-block;
  border-radius: 50%;
  border: 1px solid #ddd;
}
.chat-border .reward {
  position: fixed;
  width: 40px;
  height: 40px;
  background-color: blue;
  border-radius: 50%;
  bottom: 3.125rem;
  right: 0.625rem;
  box-shadow: 0 0 10px #333;
  background: #fff url("../../assets/gift.4f0c37e8.png") no-repeat center 0/40px;
}
.chat-border .question-from {
  position: fixed;
  width: 40px;
  height: 40px;
  background-color: blue;
  border-radius: 50%;
  bottom: 6.125rem;
  right: 0.625rem;
  box-shadow: 0 0 10px #333;
  background: #fff url() no-repeat center 0/40px;
}
.chat-border .question-from i{
    color: #30a3e0;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    position: absolute;
    font-size: 22px;
}
.chat-content {
  position: relative;
  display: inline-block;
  padding: 10px;
  margin-left: 10px;
  background: #a0dcf0;
  -moz-border-radius: 12px;
  -webkit-border-radius: 12px;
  border-radius: 6px;
  max-width: 70%;
  word-wrap: break-word;
  line-height: 15px;
}
.chat-content:before {
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

.reward-content {
  position: fixed;
  left: 0;
  right: 0;
  bottom: -660px;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1000;
}
@media (min-width: 1900px) and (max-width: 1930x) {
  .reward-content {
 
  bottom: -1000px;
 
}
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
.pay-gift {
  position: absolute;
  left: 20px;
  right: 20px;
  bottom: 40px;
  background-color: #fff;
  border-radius: 8px;
  text-align: center;
  z-index: 2000;
}

.pay-gift #close {
  position: absolute;
  font-size: 35px;
  color: #aeadad;
  right: 15px;
  top: 10px;
}
.pay-gift > div {
  margin: 20px auto;
}
.pay-gift .cash {
  font-size: 30px;
  color: #096;
}
.pay-gift button {
  color: #fff;
  outline: none;
  background: -webkit-gradient(
    linear,
    left top,
    right top,
    from(#0ea46c),
    to(#3bc882)
  );
  background: linear-gradient(90deg, #0ea46c, #3bc882);
  border: none;
  border-radius: 25px;
  font-size: 20px;
  padding: 6px 20px;
  -webkit-box-shadow: 1px 1px 5px #bae3d5;
  box-shadow: 1px 1px 5px #bae3d5;
}
.red {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
}
.red .rp-content{
    position: absolute;   
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,.3);
    z-index: 100;
}
.red .rp-content .rp-body{
 position: absolute;
 top: 50%;
 left: 50%;
 transform: translateX(-71%) translateY(-49%);
 height: calc(100% - 35px);
 border-radius: 18px;
}
.red .rp-content .rp-body img{
  border-radius: 7px;
  height: 90%;
  float: left;
  width: 133%;
}
.red .rp-content .rp-body .cover-img{
    left: 10px;
    width: 122%;
    top: 18%;
    position: absolute;
    height: 35%;
}
.red .rp-content .rp-body .title{
     position: absolute;
    color: #ebcc99;
    font-size: 16px;
    left: 15%;
    top: 10%;   
}
.red .rp-content .rp-body .money{
    position: absolute;
    color: #ebcc99;
    font-size: 22px;
    left: 52%;
    bottom: 39%;  
}
.red .rp-content .rp-body #close-paper{
   position: absolute;
    width: 30px;
    display: inline-block;
    height: 30px;
    border: solid 2px #ebcc99;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    border-radius: 50%;
    padding: 1px;

}
.red .rp-content .rp-body .open-red{
    background-color: #ebcc99;
    border-radius: 50%;
    width: 50px;
    position: absolute;
    bottom: 20%;
    left: 53%;
    height: 50px;
    border: 1px;
    font-size: 18px;
    outline: none;
}
.red .rp-content .rp-body #close-paper i{
position: absolute;
left: 0;
font-size: 26px;
color: #ebcc99;

}


.gift-fade-enter-active,
.gift-fade-leave-active {
  transition: all 0.4s ease;
}
.gift-fade-enter,
.gift-fade-leave-to {
  opacity: 0;
  transform: translate(0px, -200px);
}
.toast-fade-enter-active,
.toast-fade-leave-active {
  transition: all 0.9s ease;
}
.toast-fade-enter,
.toast-fade-leave-to {
  opacity: 0;
}
</style>