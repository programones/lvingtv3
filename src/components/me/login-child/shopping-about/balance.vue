<template>
    <div class="balance">
     <i class="el-icon-close" id="iconX" @click="toCloseBalance"></i>
      <!-- <p>红包相关</p>  
      <button @click="toCloseBalance">关闭</button> -->
      <div class="balance-body">
           <div class="balance-top">
                 <div class="balance-amount">
                    <p class="number">{{allBalanceIfo.total_money}}</p>  
                    <p class="doc">红包总金额(元)</p>  
                  </div>
                 <div class="balance-available">
                    <p class="number">{{allBalanceIfo.money}}</p>  
                    <p class="doc">可提现余额(元)</p>  
                  </div>
                 <!-- 提现按钮 -->
                <div class="withdraw">
                    <button @click="modalTagFn" :disabled="allBalanceIfo.money==0?'disabled':false">提现</button>
                </div>
            </div>  
                <div class="balance-list">
                  <p class="mx">明细</p>  
                    <ul class="container">
                    <li class="red-item" :class="item.rp_status == '1' ? 'has' : 'will'"  v-for="(item,i) in balanceDatalist" :key="i">
                        <div class="left">
                            <span class="top">{{item.room_title}}</span>
                            <div class="bottom">
                                <div>领取: {{item.rp_time}}</div>
                                <div>可领: {{item.take_time}}</div>
                            </div>
                        </div>
                        <span class="right">+{{item.rp_money}}</span>
                    </li>
                    <div class="footer" v-if="footerShow">已经到底啦</div>
                </ul>
                 </div> 
       </div>

    </div>
</template>

<script>
import {http} from '../../../../http/http';
import {getCookie} from '../../../../api/aboutCookies'
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
         http.getBalanceList(params).then(res=>{
            //  window.console.log(11111,res);
             if(res.data.code==200){
                 this.balanceDatalist=res.data.data.rp_list;
                 this.allBalanceIfo=res.data.data
             }
         })
         
        },
        getMoney(){
            let member_token=getCookie('token');
          http.getMoney(member_token).then(res=>{
               if(res.data.code == 200){
                    this.$message({
                       type: 'success',
                       message: '提现成功!',
                       offset:300,
                       duration:2000
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
    bottom: 2px;
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
     text-align: center;
     width: 45%;
     font-size: 16px;
    }
     .balance .balance-body .balance-top  .number {
    text-indent: 11%;
     }
    .balance .balance-body .balance-top .balance-available {
       
     font-size: 16px;
    }
    .balance .balance-body .balance-top .balance-available .number{
       
     font-size: 35px;
    }
    .balance .balance-list {
     overflow-y: auto;
     height:280px;
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
    content: '未入账';
    background-color: #ff6b04;
}
.balance .balance-list .container .red-item.has .left .top::after {
    content: '已入账';
    background-color: #ebe6e6;
}
.balance .balance-list .container .red-item .left .bottom {
    line-height: 20px;
    color: #aaa;
    font-size: 10px;
    text-indent: 33px;
}
.balance .balance-list .container .red-item .right {
    padding-right: 12px;
    color: #646371;
    font-size: 20px;
    line-height: 70px;
}
.el-message-box__btns {
    text-align: center;
}
.el-message-box {
    margin-top: 100%;
}
</style>
