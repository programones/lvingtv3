<template>
    <div class="balance">
     <i class="el-icon-close" id="iconX" @click="toCloseBalance"></i>
      <!-- <p>红包相关</p>  
      <button @click="toCloseBalance">关闭</button> -->
      <div class="balance-body">
           <div class="balance-top">
                 <div class="balance-amount">
                    <p class="number">{{allBalanceIfo.total_money}}</p>  
                    <p class="doc">已提现红包(元)</p>  
                  </div>
                 
                 <div class="balance-available">
                    <p class="number out">{{allBalanceIfo.expire_money}}</p>  
                    <p class="doc">已过期余额(元)</p>  
                  </div>
                <div class="balance-available">
                    <p class="number">{{allBalanceIfo.money}}</p>  
                    <p class="doc">可提现余额(元)</p>  
                  </div>
                <div class="withdraw">
                    <button @click="modalTagFn" :disabled="allBalanceIfo.money==0?'disabled':false">提现</button>
                </div>
            </div>  
                <div class="balance-list">
                  <p class="mx">明细</p>  
                    <ul class="container">
                    <li class="red-item" :class="item.rp_status == '1' ? 'has' : item.rp_status == '0'?'will':'timeout' "  v-for="(item,i) in balanceDatalist" :key="i">
                        <div class="left">
                            <span class="top">{{item.room_title}}</span>
                            <div class="bottom">
                                <div>领取红包时间: {{item.rp_time}}</div>
                                <div>提现开始时间: {{item.take_time}}</div>
                                <div>提现过期时间: {{item.take_expire}}</div>
                            </div>
                        </div>
                        <span class="right" :class="{'cannot':item.rp_status == -1}">+{{item.rp_money}}</span>
                    </li>
                    <div class="footer" v-if="footerShow">已经到底啦</div>
                </ul>
                 </div> 
       </div>

    </div>
</template>

<script>
// import {http} from '../../../../http/http';
import {getCookie} from '../../../../api/aboutCookies';
import timeFormat from '../../../../api/timeFormat';
export default {
    name:'balance',
    props: {

    },
    data() {
        return {
          balanceDatalist:[
        //    {
        //     rp_status:'1',
        //     room_title:'这是标题',
        //     rp_time:100,
        //     take_time:10,
        //     rp_money:20,
        //    },
        //    {
        //     rp_status:'1',
        //     room_title:'这是标题',
        //     rp_time:100,
        //     take_time:10,
        //     rp_money:20,
        //    },
          ],//红包列表  
          allBalanceIfo:{},
          footerShow:false,
          isTag:false,
          pageNum:1,
        };
    },
    methods: {
        toCloseBalance(){
          //点击关闭按钮事件
          let fatherBox = document.querySelector('.about-me');
          fatherBox.setAttribute('style','overflow-y:auto');
        //   window.console.log('orederDetile');
           this.$emit('topassBalanceVal',false);   
        },
        modalTagFn(){
          //点击体现按钮体现
        //   window.console.log('提现金额');  
          this.$confirm('是否提现金额?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          closeOnClickModal:false,
          type: 'warning'
        }).then(() => {
          this.getMoney();
        }).catch(() => {
        //   this.$message({
        //     type: 'info',
        //     message: '已取消删除'
        //   });          
        });
        },
        getBalance(){
         //获取红包列表
         let params={
             member_token:getCookie('token'),
             page:this.pageNum
         }
         this.$http.getBalanceList(params).then(res=>{
             window.console.log('红包列表=>',res);
             if(res.data.code==200){
                //  this.balanceDatalist=res.data.data.rp_list;
                let reList=res.data.data.rp_list;
                 this.allBalanceIfo=res.data.data;
               reList.forEach((item,i)=>{
                   //处理不可提现红包的状态显示
                // window.console.log(item.take_expire);
                let out = item.take_expire.replace(/-/g,'');
                let outT = out.replace(/:/g,''); 
                let outTime = outT.replace(/\s+/g,''); 
                //  window.console.log(timeFormat(Date.now(),'YMDhms'));
                 let timenow =  timeFormat(Date.now(),'YMDhms');
                 if(timenow>outTime){
                     item.rp_status=-1;
                 }  
               })   
                //  window.console.log(reList) ;
               this.balanceDatalist = reList     
             }
         })
         
        },
        getMoney(){
            let member_token=getCookie('token');
           this.$http.getMoney(member_token).then(res=>{
               if(res.data.code == 200){
                    this.$message({
                       type: 'success',
                       message: '提现成功!',
                       offset:300,
                       duration:2000
                     });
               }else{
                 
            this.$notify({
          title: res.data.msg,       
          position: 'bottom-left',
      		duration:3000,//设置0的话的则不会关闭
        }); 
               }
          })   
        },
    },
    computed: {

    },
    created() {

    },
    mounted() {
     this.getBalance();  
    
    },
    watch: {

    },
    components: {

    },
};
</script>

<style>
    .balance{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #fff;
    z-index: 100;      
    }
   .balance #iconX{
    z-index: 1;
    color: #fff;
    padding-top: 4px;
    text-align: center;
    position: absolute;
    top: 0px;
    right: 5px;
    font-size: 35px;   
   }
   .balance .balance-body .balance-top {
    height: 125px;
    padding: 36px 0 0 10px;
    background: -webkit-gradient(linear,left top,right top,from(#0ea46c),to(#3bc882));
    background: linear-gradient(90deg,#0ea46c,#3bc882);
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #fff;
    position: relative;
    line-height: 33px;  
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
   }
   .balance .balance-body  .withdraw {
    position: absolute;
    right: 12px;
    bottom: -4px;
}
.balance .balance-body  .withdraw button {
    outline: none;
    border: none;
    background-color: #fff;
    color: #38c681;
    border-radius: 12px;
    font-size: 16px;
    padding: 2px 10px;
}
.balance .balance-body > .withdraw button[disabled="disabled"] {
    display: none;
}
    .balance .balance-body .balance-top .balance-amount {
     float: left;
     margin-left: -5px;
     text-align: center;
     width: 30%;
     font-size: 14px;
    }
    @media (min-width: 310px) and (max-width: 320px){
     .balance .balance-body .balance-top .balance-amount {
          width: 32%;
     }    
    }
     .balance .balance-body .balance-top  .number {
    text-indent: 11%;
     }
    .balance .balance-body .balance-top .balance-available {
     float: left;  
      margin-left: 5px;
     font-size: 14px;
    }
    .balance .balance-body .balance-top .balance-available .number{
     font-size: 25px;
     color: hotpink;
    }
    .balance .balance-body .balance-top .balance-available .out{
     font-size: 20px;
     color: #fff;
     font-family:STHupo;
    }
    .balance .balance-list {
     overflow-y: auto;
     height:263px;
    }
     @media (min-width: 310px) and (max-width: 320px){
       .balance .balance-list{
         height:200px;  
       }  
     }
     @media (min-height: 810px) and (max-height: 820px){
       .balance .balance-list{
         height:360px;  
       }  
     }
     @media (min-width: 768px) and (max-width: 1024px){
       .balance .balance-list{
         height:400px;  
       }  
     }
    .balance .balance-list .mx{
      margin: 0 8px;
      border-bottom: 1px solid #ddd;
      padding: 12px 0;
      font-size: 18px;
    }
    .balance .balance-list .container .red-item {
    border-bottom: 1px solid #ddd;
    margin: 0 8px;
    padding: 14px 0;
    overflow: hidden;
    background-color: #fff;
}
.balance .balance-list .container .red-item .left {
    position: relative;
    width: 70%;
    float: left;
}
.balance .balance-list .container .red-item .left .top {
    margin-bottom: 15px;
    font-size: 18px;
    color: #333;
    display: block;
    overflow:hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 80%;
}
.balance .balance-list .container .red-item.will .left .top::after,
.balance .balance-list .container .red-item.timeout .left .top::after,
.balance .balance-list .container .red-item.has .left .top::after {
    display: inline-block;
    position: absolute;
    right: -93px;
    font-size: 13px;
    padding: 7px 4px;
    color: #fff;
    border-radius: 21px;
    top: 3px;
}
.balance .balance-list .container .red-item.will .left .top::after {
    content: '未提现';
    background-color: #ff6b04;
    opacity: 0.7;
     /* content: '已入账';
    background-color: #ebe6e6; */

}
.balance .balance-list .container .red-item.has .left .top::after {
    /* content: '已入账';
    background-color: #ebe6e6; */
       content: '已提现';
    background-color: #ebe6e6;
}
.balance .balance-list .container .red-item.timeout .left .top::after {
    /* content: '已入账';
    background-color: #ebe6e6; */
       content: '已过期';
    background-color: #9e9090;
}
.balance .balance-list .container .red-item .left .bottom {
    line-height: 20px;
    color: #aaa;
    font-size: 10px;
    text-indent: 3px;
}
.balance .balance-list .container .red-item .right {
   float: right;
    
    /* color: #646371; */
    color: red;
    font-size: 20px;
    line-height: 85px;
    padding-top: 6px;
}
.balance .balance-list .container .red-item .cannot {
    
    color: #999;
}
.el-message-box__btns {
    text-align: center;
}
.el-message-box {
    margin-top: 100%;
}
</style>
