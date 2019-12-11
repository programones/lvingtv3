<template>
    <div>
      <div class="point-container">
          <div class="point-head">
              <p class="title">积分账单明细</p>
              <i class="el-icon-close" id="iconX" @click="closeThatBox"></i>
              <div class="point-data">
                  <div class="point-date-left">
                       <el-date-picker
                         :editable="false" 
                          v-model="startData"
                          @change="choiceStartDay" 
                          type="date"   
                          value-format="yyyy-MM-dd"
                         >
                       </el-date-picker>
                  </div>
                  <span>至</span>
                  <div class="point-date-right">
                       <el-date-picker
                         :editable="false" 
                          v-model="endData"
                          @change="choiceEndDay" 
                          type="date"   
                          value-format="timestamp"
                         >
                       </el-date-picker>
                  </div>
              </div>
          </div>
          <div class="point-content">
             <ul class="point-detile">              
                 <li v-for=" (item,i) in pointList" :key="i">
                    <div class="left">
                       <p class="details-title">{{item.description}}</p>  
                       <p class="details-time">{{item.add_time}}</p>
                        </div> 
                        <div class="right">+{{item.points}}</div>   
                  </li>
                   <p class="point-nomsg" v-if="ifShowTips">我是有底线的啦(✿◕‿◕✿)</p>  
                 </ul>   
           </div>
        
          </div>  
       
    </div>
</template>

<script>
 import  {http} from '../../../http/http';
 import timeformate from '../../../api/timeFormat';
 import {getCookie,setCookie,delCookie} from '../../../api/aboutCookies'
export default {
    name:'personalIntegral',
 
    data() {
        return {
             startData:'2019-10-01',
             endData:Date.now(),
             ifShowTips:false,   
             ponintUnm:1, 
             middleList:[],// 中间处理储存
             pointList:[], //存储所有列表信息
            
        };
    },
    methods: {
        closeThatBox(){
         //点击关闭按钮事件
        let fatherBox = document.querySelector('.about-me');
        fatherBox.setAttribute('style','overflow-y:auto');
        window.console.log('persnal');
        window.removeEventListener('scroll', this.handleScrollTwo, true);  // 监听（移除）滚轮滚动事件
        this.$emit('topassIntegralValue',false);
         
        },
        choiceStartDay(){
         //选中开始时间的事件
         window.console.log(this.startData);
          
        },
        choiceEndDay(){
            // 点击选中结束时间的事件
        window.console.log(timeformate(this.endData,'Y-M-D'));
        this.getPointList();
        },
        getPointList(){
          //获取服务器的详细积分列表
          let params={
              starttime:this.startData,
              endtime:timeformate(this.endData,'Y-M-D'),
              page:this.ponintUnm,
              member_token:getCookie("token")
          };
          http.getIntrgralList(params).then(res=>{
              window.console.log(res);
             if(res.data.code==200){
              this.middleList=res.data.data.list   
               this.pointList=this.pointList.concat(this.middleList)   
              }else {
                       this.$notify({
                          title: '加载失败~~',
                          position: 'bottom-left',
                          duration:5000,//设置0的话的则不会关闭
                        });
              }             
          })
        },
         handleScrollTwo() {
            let clientHeight = document.querySelector('.point-detile').clientHeight;  
            // 设备/屏幕高度
            let scrollObj = document.querySelector('.point-detile'); // 滚动区域
            let scrollTop = scrollObj.scrollTop; // div 到头部的距离
            let scrollHeight = scrollObj.scrollHeight; // 滚动条的总高度
            //滚动条到底部的条件
            if(scrollTop+clientHeight == scrollHeight){
                // div 到头部的距离 + 屏幕高度 = 可滚动的总高度
                // window.console.log('触发了==',this.middleList);
                this.ponintUnm++;
                if(this.middleList.length){
                  this.getPointList();
                //   this.$message({
                //      showClose: false,
                //       type:'success',
                //       message: '加载成功' ,
                //       duration:1000, 
                //       offset:200
                //   })   
                }else{
                 this.ifShowTips=true ;                  
                }
                
            } 
         }  


    },
    computed: {

    },
    created() {

    },
    mounted() {
        this.getPointList();
        window.addEventListener('scroll', this.handleScrollTwo, true);  // 监听（绑定）滚轮滚动事件 
    },
    watch: {

    },
    components: {

    },
};
</script>

<style>
    .point-container{
    /* display: none; */
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #fff;
    z-index: 100;
    }
   .point-container .btn {
       margin-top: 200px
    }
   .point-container .point-head .title {
      text-align: center;
      font-weight: 600;
      margin: 20px 0 30px;
      font-size: 16px;
    }
   .point-container .point-head .point-data {
     padding: 0 5px;
    line-height: 37px;
    font-size: 16px;
    }
   .point-container .point-head .point-data .point-date-left{
    margin-left: 10%;
    width: 35%;
    overflow: hidden;
    float: left;
    }
   .point-container .point-head .point-data .point-date-right{
    margin-right: 11%;   
    width: 35%;
    overflow: hidden;
    float: right;
    }
    .el-input--prefix .el-input__inner{
        border: none;
    }
   .point-container .point-head #iconX {
    color: #aaa;
    font-size: 31px;
    position: absolute;
    left: 3px;
    top: 9px;
    }
    .point-container .point-content {
    /* overflow-y: auto;
    overflow-x: hidden; */
    height: calc(100% - 125px);
    }
    .point-container .point-content .point-detile{  
    overflow-x: hidden;
    overflow-y: auto;
    padding: 0 10px;
    width: 91%;
    height: 100%;
    }
    .point-container .point-content .point-detile .point-nomsg{  
    line-height: 40px;
    text-align: center;
    color: #757575;
    font-size: 12px;  
    }
    .point-container .point-content .point-detile li{
     height: 67px;
    /* overflow: hidden; */
    border-bottom: 1px solid #e5e5e5;
    padding-top: 10px;
    }
    .point-container .point-content .point-detile .left{
     float: left;   
     width: calc(100% - 55px);
    }
    .point-container .point-content .point-detile .left .details-title{
    font-size: 16px;   
    font-weight: 600;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    }
    .point-container .point-content .point-detile .left .details-time{
    line-height: 30px;
    margin: 8px 0;
    font-size: 14px;
    color: #979797;
    }
    .point-container .point-content .point-detile .right{
    float: right;    
    font-size: 16px;
    color: #f60;
    font-weight: 600;
    }




</style>
