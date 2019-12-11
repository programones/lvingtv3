<template>
    <div class="consume">
            <div class="consume-head">
              <p class="title">消费账单明细</p>
              <i class="el-icon-close" id="iconX" @click="closeConsumeBox"></i>
              <div class="consume-data">
                  <div class="consume-date-left">
                       <el-date-picker
                         :editable="false" 
                          v-model="consumestartData"
                          @change="consumechoiceStartDay" 
                          type="date"   
                          value-format="timestamp"
                         >
                       </el-date-picker>
                  </div>
                  <span>至</span>
                  <div class="consume-date-right">
                       <el-date-picker
                         :editable="false" 
                          v-model="consumeendData"
                          @change="consumechoiceEndDay" 
                          type="date"   
                          value-format="timestamp"
                         >
                       </el-date-picker>
                  </div>
              </div>
          </div>

            <div class="consume-content">
             <ul class="consume-detile">  
                 <p class="consume-nomsg" v-if="consumeDetileList==0">暂无更多信息</p>             
                 <li v-for=" i in consumeDetileList" :key="i">
                    <div class="left">
                       <p class="details-title">观看节目"第四届中国研学旅行论坛"获取5积分</p>  
                       <p class="details-time">2019-11-25 19:14:37</p>
                        </div> 
                        <div class="right">+5</div>   
                  </li>
                 </ul>   
           </div>
    </div>
</template>

<script>
export default {
    props: {

    },
    data() {
        return {
            consumestartData:1569897688000,
            consumeendData:Date.now(),
            consumeDetileList:0,
        };
    },
    methods: {
      closeConsumeBox(){
          //点击关闭按钮事件
        let fatherBox = document.querySelector('.about-me');
        fatherBox.setAttribute('style','overflow-y:auto');
        window.console.log('consumeMoney')
        this.$emit('topassConsume',false);  
      },
      consumechoiceStartDay(){
            //选择开始时间
      },
      consumechoiceEndDay(){
        //   选择结束时间
      }
    },
    computed: {

    },
    created() {

    },
    mounted() {

    },
    watch: {

    },
    components: {

    },
};
</script>

<style>
.consume {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #fff;
    z-index: 100;
  }
   .consume .btn {
       margin-top: 200px
    }
   .consume .consume-head .title {
      text-align: center;
      font-weight: 600;
      margin: 20px 0 30px;
      font-size: 16px;
    }
   .consume .consume-head .consume-data {
     padding: 0 5px;
    line-height: 37px;
    font-size: 16px;
    }
   .consume .consume-head .consume-data .consume-date-left{
    margin-left: 10%;
    width: 35%;
    overflow: hidden;
    float: left;
    }
   .consume .consume-head .consume-data .consume-date-right{
    margin-right: 11%;   
    width: 35%;
    overflow: hidden;
    float: right;
    }
  
   .consume .consume-head #iconX {
    color: #aaa;
    font-size: 31px;
    position: absolute;
    left: 3px;
    top: 9px;
    }
    .consume .consume-content {
    /* overflow-y: auto;
    overflow-x: hidden; */
    height: calc(100% - 125px);
    }
    .consume .consume-content .consume-detile{  
    overflow-x: hidden;
    overflow-y: auto;
    padding: 0 10px;
    width: 91%;
    height: 100%;
    }
    .consume .consume-content .consume-detile .consume-nomsg{  
    text-align: center;
    color: #757575;
    font-size: 12px;
    }
    .consume .consume-content .consume-detile li{
     height: 67px;
    /* overflow: hidden; */
    border-bottom: 1px solid #e5e5e5;
    padding-top: 10px;
    }
    .consume .consume-content .consume-detile .left{
     float: left;   
     width: calc(100% - 55px);
    }
    .consume .consume-content .consume-detile .left .details-title{
    font-size: 16px;   
    font-weight: 600;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    }
    .consume .consume-content .consume-detile .left .details-time{
    line-height: 30px;
    margin: 8px 0;
    font-size: 14px;
    color: #979797;
    }
    .consume .consume-content .consume-detile .right{
    float: right;    
    font-size: 16px;
    color: #f60;
    font-weight: 600;
    }
</style>
