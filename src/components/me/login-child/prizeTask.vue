<template>
    <div class="prize">
           <!-- <p>有奖任务</p>
          <button @click="closePrize">关闭</button> -->
          <i class="el-icon-close" id="iconX"  @click="closePrize"></i>
          <div class="prize-content">
             <ul class="prize-detile">   
                 <p class="prize-nomsg" v-if="prizeList==0">暂无更多信息</p>             
                 <li v-for=" (item,i) in prizeList" :key="i">
                    <div class="left">
                          <p class="details-title">{{item.task_title}}</p>  
                          <div class="content">
                              <span>奖励</span>
                              <span class="num">+{{item.task_reward}}积分</span>
                             </div>  
                      </div> 
                        <div class="right">
                            <button>已领取</button>
                            </div>   
                  </li>
                 </ul>   
           </div>
    </div>
</template>

<script>
import  {http} from '../../../http/http';
import {getCookie} from '../../../api/aboutCookies'
export default {
    props: {

    },
    data() {
        return {
         prizeList:[],

        };
    },
    methods: {
        closePrize(){
             //点击关闭按钮事件
        let fatherBox = document.querySelector('.about-me');
        fatherBox.setAttribute('style','overflow-y:auto');
        window.console.log('persnal')
        this.$emit('topassPrizeTask',false);
        },
        getPrizeList(){
          //获取积分获取信息明细
          let token_num=getCookie('token')
          http.getPrizeIfo(token_num).then(
               res=>{
                   window.console.log(res);
                   if(res.data.code==200){
                     this.prizeList=res.data.data;
                      window.console.log( this.prizeList);
                   }
              }
          )
             
           
        },
    },
    computed: {

    },
    created() {

    },
    mounted() {
        this.getPrizeList()
    },
    watch: {

    },
    components: {

    },
};
</script>

<style>
 .prize {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #f6f6f6;
    z-index: 100;  
 }
 .prize #iconX{
    color: #aaa;
    padding-top: 4px;
    text-align: center;
    height: 28px;
    width: 28px;
    position: absolute;
    top: 5px;
    right: 5px;
    border: 1px solid #aaa;
    border-radius: 50%;
    box-sizing: border-box;
    font-size: 20px;
 }
  .prize .prize-content {
    /* overflow-y: auto;
    overflow-x: hidden; */
    height: calc(100% - 125px);
    }
    .prize .prize-content .prize-detile{  
    overflow-x: hidden;
    overflow-y: auto;
    padding: 0 10px;
    width: 91%;
    height: 100%;
    color: #8a8a8a;
    }
    .prize .prize-content .prize-detile .prize-nomsg{  
    text-align: center;
    color: #757575;
    font-size: 12px;  
    }
    .prize .prize-content .prize-detile li{
    margin-top: 10px;
    border-radius: 5px;
    padding: 0 17px;
    background-color: #fff;
    height: 67px;
    border-bottom: 1px solid #e5e5e5;
    padding-top: 10px;
    }
    .prize .prize-content .prize-detile .left{
     float: left;   
     width: calc(100% - 100px);
    }
    .prize .prize-content .prize-detile .left .details-title{
    font-size: 16px;   
    
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    }
    .prize .prize-content .prize-detile .left .content{
        font-size: 14px;
        line-height: 35px;
    }
  
    .prize .prize-content .prize-detile .right{
    float: right;    
    font-size: 16px;
    color: #f60;
    }
    .prize .prize-content .prize-detile .right button{
    border: none;
    outline: none;
    background: -webkit-gradient(linear,left top,right top,from(#0ea46c),to(#3bc882));
    background: linear-gradient(90deg,#0ea46c,#3bc882);
    padding: 4px 8px;
    border-radius: 15px;
    color: #fff;
    }
    .prize .prize-content .prize-detile .right .active{
    background: #e8e6e6;
    }
</style>
