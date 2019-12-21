<template>
    <div>
      <div class="mogao-details">
          <header class="moagao-head"> <i class="el-icon-arrow-left" @click="toback"></i> <span>课程详细</span></header>
            <section class="mogao-sec">
            <div class="mogao-img">
              <img :src="getmogaoData.package_img" alt="">
             </div>    
             <div class="mogao-body">
                 <p class="mogao-title">{{getmogaoData.package_title}}</p>
                 <p class="mogao-desc">{{getmogaoData.package_desc}}</p>  
                 <div class="mogao-price">
                  <span class="special">￥{{getmogaoData.package_price}}</span>     
                  <span class="offer">￥{{getmogaoData.package_price_market}}</span>     
                 </div>
                 <div class="mogao-course">
                     <p class="mogao-course-title">课程详情</p>
                      <div class="mogao-course-detiles">
                          <span v-html="getmogaoData.package_detail"></span>
                      </div>
                 </div>

                 <div class="mogao-package">
                    <p class="package-title">包含套餐</p> 
                     <div class="package-content">
                         <div class="package-container" :style="{width: widthData}" >
                               <div class="package-item" v-for="(item,i) in mogaoList" :key="i" >
                                <div class="img">
                                  <img :src="item.coverUrl" alt="" width="100%">
                                 </div> 
                                   <p class="item-title">{{item.videoName}}</p>     
                                  <p class="price">￥200</p>     
                              </div>
                            </div>
                         </div>   
                  </div>
             </div>   
            </section>
            <div class="footer">
              <div>
                  <span>合计</span>
                  <span class="special">￥{{getmogaoData.package_price}}</span>
                  <span class="offer">￥{{getmogaoData.package_price_market}}</span>
                  </div>  
                  <button @click="toPay">结算</button>  
             </div>
      </div>
    </div>
</template>

<script>
import {getCookie} from '../api/aboutCookies'
export default {
    props: {

    },
    data() {
        return {
         getmogaoData:{},//存储获取相关的课程信息  
         mogaoList:[], //存储子课程列表信息
         widthData:'',//动态改变items父元素的宽
         isWeixin: false,
          signData: {},
        };
    },
    methods: {
        getmogaoDetiles(){
         //获取付费信息的详细相关
        this.$http.getlessonIfo(this.$route.query.vod_id).then(res=>{
           
             this.getmogaoData=res.data.data;
             this.mogaoList=res.data.data.video_list;

               window.console.log(res);
                this.widthData =155*(this.mogaoList.length)+'px';
                window.console.log( this.mogaoList.length)
         })
        },
        toback(){
            //点击左图标返回上一历史记录
            this.$router.go(-1)
        },
        calcItemWidth(){
            setTimeout(()=>{
            
              
               
            },100)
        },
        toPay(){
            window.console.log('付钱了');
            if(getCookie('token')){
             let ua = navigator.userAgent.toLowerCase();
            this.isWeixin = ua.indexOf('micromessenger') != -1;      
                if(this._isMobile() && !this.isWeixin){
                    let params = {
                        room_id:this.$route.params.id,
                        member_token:getCookie('token'),
                        pay_way:'H5WX',
                        pay_type:'vod_pay',
                        vod_id:this.$route.query.vod_id
                    }
                  this.$http.getlessonPay(params).then(res=>{
                   if(res.data.code == 200){
                       window.location.href = res.data.data.mweb_url;
                   }else{
                        this.$notify({
                            title: res.data.msg,                        
                            position: 'bottom-left',
                        	duration:3000,//设置0的话的则不会关闭
                          });
                   }
                  })  
                } else if(this._isMobile() && this.isWeixin){
                    let params = {
                       room_id:this.$route.params.id,
                        member_token:getCookie('token'),
                        pay_way: 'WXBROWSER',
                        pay_type:'vod_pay',
                        vod_id:this.$route.query.vod_id  
                    }
                  this.$http.getlessonPay(params).then(res=>{
                      if(res.data.code == 200){
                          this.signData = JSON.parse(res.data.data);
                          this.callpay;
                      }else{
                          this.$notify({
                            title: res.data.msg,                        
                            position: 'bottom-left',
                        	duration:3000,//设置0的话的则不会关闭
                          }); 
                      }
                  })
                }
            }
        },
           // 判断是否在移动端
        _isMobile(){
            let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
            localStorage.setItem('ismobile',flag?1:0)
            return flag;
        },
          jsApiCall() {
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
                    WeixinJSBridge.log(res.err_msg);
                    console.log(res.err_code+ '\n' +res.err_desc+ '\n' +res.err_msg);
                    window.location.href = window.location.href;
                }
            );
        },
        callpay() {
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
    },
    computed: {

    },
    created() {

    },
    mounted() {
        this.getmogaoDetiles();
       
    },
    watch: {

    },
    components: {

    },
};
</script>

<style>
.mogao-details{
    position: relative;
}
.mogao-details .moagao-head{
    position: absolute;
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: #fff;
    background-color: transparent;
    font-size: 16px;
    font-weight: 500;
}
.mogao-details .moagao-head i{
    left: 5px;
    font-size: 40px;
    position: absolute;
}
.mogao-details .mogao-sec .mogao-img {
    background: linear-gradient(90deg,#0ea46c,#3bc882);
}
.mogao-details .mogao-sec .mogao-img img{
   width: calc(100% - 30px);
    margin: 0 auto;
    display: block;
    position: relative;
    top: 66px;
    border-radius: 20px;
    max-width: 350px;
    -webkit-box-shadow: 0 0 5px #8a8a8a;
    box-shadow: 0 0 5px #8a8a8a;
}
.mogao-details .mogao-sec .mogao-body {
  padding: 66px 20px 90px;
  background-color: #fff;  
}
 .mogao-details .mogao-sec .mogao-body .mogao-title {
     font-size: 16px;
    margin: 20px 0;
    color: #2a2a2a;
    font-weight: 700;
 }  
 .mogao-details .mogao-sec .mogao-body .mogao-desc {
    color: #929292;
    font-size: 12px;
    line-height: 16px;
 }
 .mogao-details .mogao-sec .mogao-price{
  margin: 20px 0;
 }
 .mogao-details .mogao-sec .mogao-price .special{
    color: #f60;
    font-size: 22px;
    vertical-align: middle;
 }
 .mogao-details .mogao-sec .mogao-price .offer{
    font-size: 10px;
    color: #d1d1d1;
    text-decoration: line-through;
    padding: 0 4px;
    vertical-align: text-bottom;
 }
 .mogao-details .mogao-sec .mogao-course{
    background-color: #f6f6f6;
    border-radius: 20px;
    padding: 20px;
    margin: 20px 0;
 }
 .mogao-details .mogao-sec .mogao-course .mogao-course-title{
  margin: 20px 0;
  font-size: 16px;
 }
  .mogao-details .mogao-sec .mogao-course .mogao-course-detiles{
     color: #7e7e7e;
     font-size: 14px;
     line-height: 20px;
  }
  .mogao-details .mogao-sec .mogao-package .package-title{
      font-size: 16px;
     margin: 20px 10px;
  }
  .mogao-details .mogao-sec .mogao-package .package-content{
        overflow-x: auto;
        overflow-y: hidden;
        width: 100%;
  }
  .mogao-details .mogao-sec .mogao-package .package-content .package-item{
    margin-right: 10px;
    width: 145px;
    background-color: #fff;
    border-radius: 20px;
    overflow: hidden;
    display: inline-block;
    -webkit-box-shadow: 0 0 5px #8a8a8a;
    box-shadow: 0 0 5px #8a8a8a;
  }
  .mogao-details .mogao-sec .mogao-package .package-content .package-item .item-title{
    line-height: 35px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-indent: 10px; 
  }
  .mogao-details .mogao-sec .mogao-package .package-content .package-item .price{
    text-indent: 10px;
    line-height: 23px;
    font-size: 14px;
    color: #f60;
  }
 .mogao-details .footer {
        position: fixed;
        bottom: -1px;
        left: 0;
        right: 0;
    }   
        .mogao-details .footer > div {
        padding: 15px 0 15px 14px;
        display: inline-block;
        width: calc(100% - 150px);
        background: -webkit-linear-gradient(left, #0ea46c , #3bc882); /* Safari 5.1 - 6.0 */
        background: -o-linear-gradient(right, #0ea46c, #3bc882); /* Opera 11.1 - 12.0 */
        background: -moz-linear-gradient(right, #0ea46c, #3bc882); /* Firefox 3.6 - 15 */
        background: linear-gradient(to right, #0ea46c , #3bc882); /* 标准的语法 */
        color: #fff;
        border-radius: 20px 0 0 0;
        box-sizing: border-box;
    }
    @media (min-width: 310px) and (max-width: 330px) {
       .mogao-details .footer > div{
           padding: 0px;
       }  
    }
    .mogao-details .footer span {
        font-size: 14px;
    }
    .mogao-details .footer span.special {
        font-size: 24px;
    }
    .mogao-details .footer span.offer {
        font-size: 12px;
        text-decoration: line-through;
    }
    .mogao-details .footer button {
        outline: none;
        height: 65px;
        border: none;
        width: 150px;
        background: -webkit-linear-gradient(left, #f60 , #f8a741); /* Safari 5.1 - 6.0 */
        background: -o-linear-gradient(right, #f60, #f8a741); /* Opera 11.1 - 12.0 */
        background: -moz-linear-gradient(right, #f60, #f8a741); /* Firefox 3.6 - 15 */
        background: linear-gradient(to right, #f60 , #f8a741); /* 标准的语法 */
        color: #fff;
        font-size: 20px;
        padding: 17px 0px;
        vertical-align: top;
        border-radius: 0 20px 0 0;
    }
</style>
