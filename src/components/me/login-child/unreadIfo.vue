<template>
    <div class="unreadmsg">
        <!-- <p>未读信息</p>
        <button @click="closebox">返回</button> -->
         <i class="el-icon-close" id="iconX" @click="closebox"></i>
        <div class="unreadmsg-container">
            <div class="item" v-for="(item,i) in unreadingList" :key="i">
                    <div class="title"> 未读信息</div>
                    <div class="content">{{item.is_read?'恭喜您获得积分，请查看':item.content}}</div>
                    <div class="footer" @click.self="toseeDetile(i)">查看详情 <i :class="item.is_read?'el-icon-arrow-up':'el-icon-arrow-down'" id="icon"></i></div>
                 </div>
              <p v-if="ifButton" class="buttonTips">我是有底线的啦(●'◡'●)</p>    
        </div>
    </div>
</template>

<script>
 
 import {getCookie,setCookie,delCookie} from '../../../api/aboutCookies'  //导入封装的cookies方法 
export default {
    name:'unreadIfo',
    props: {
//2019-11-26 09:39:45:观看节目"新化老乡联谊会"获取5积分 el-icon-arrow-up
    },
    data() {
        return {
         ifShow:false,  
         unreadingList:[],  
         middleList:[],
         number:1, 
         ifButton:false,  
         clientHeight:'',
        };
    },
    methods: {
        closebox(){
         //点击关闭按钮事件
        let fatherBox = document.querySelector('.about-me');
        fatherBox.setAttribute('style','overflow-y:auto');
        window.console.log('persnal');
         window.removeEventListener('scroll', this.handleScroll,true);  //  离开页面清除（移除）滚轮滚动事件
        this.$emit('topassunreadIfo',false); 
        
        },
        toseeDetile(num){
         //点击查看详细
        //  window.console.log('详细');
         window.console.log(num,this.unreadingList[num])
         this.unreadingList[num].is_read=!this.unreadingList[num].is_read;
        },
        getreadIfoList(){
         //获取未读信息
         let params = {
             member_token:getCookie('token'),
             page:this.number 
           }
           this.$http.getunreadIfoList(params).then(res=>{
            window.console.log(res);
            this.middleList=res.data.data.list;
            this.unreadingList=this.unreadingList.concat(this.middleList)
             
           })     
        },
         handleScroll() {
            let clientHeight = document.querySelector('.unreadmsg-container').clientHeight;  
            // 设备/屏幕高度
            let scrollObj = document.querySelector('.unreadmsg-container'); // 滚动区域
            let scrollTop = scrollObj.scrollTop; // div 到头部的距离
            let scrollHeight = scrollObj.scrollHeight; // 滚动条的总高度
            //滚动条到底部的条件
            if(scrollTop+clientHeight == scrollHeight){
                // div 到头部的距离 + 屏幕高度 = 可滚动的总高度
                window.console.log('21212');
                this.number++;
                if(this.middleList.length){
                  this.getreadIfoList();   
                }else{
                 this.ifButton=true     
                }
                
            } 
         }
    },
    computed: {

    },
    created() {

    },
    mounted() {
        this.getreadIfoList();
         window.addEventListener('scroll', this.handleScroll, true);  // 监听（绑定）滚轮滚动事件
    },
    beforeDestroy(){
        
    },
    watch: {

    },
    components: {

    },
};
</script>

<style>
    .unreadmsg{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #f6f6f6;
    z-index: 100; 
    }
     .unreadmsg #iconX{
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
    .unreadmsg .unreadmsg-container{    
    overflow-y: auto;
    height: 100%;
    background-color: #f5f5f5; 
    }
    .unreadmsg .unreadmsg-container .item{
    margin: 12px auto;
    padding-top: 20px;
    background-color: #fff;
    width: calc(100% - 34px);
    border-radius: 5px;
    color: #757575;  
    }
    .unreadmsg .unreadmsg-container .item .title{
    font-size: 18px;
    margin: 0 20px 15px;    
    color: #009561;
    } 
    .unreadmsg .unreadmsg-container .item .content{
    margin: 0 20px 15px;
    font-size: 15px;
    position: static;
    line-height: 20px;
    -webkit-transform: none;
    transform: none;
    } 
    .unreadmsg .unreadmsg-container .item  .footer{
    padding-right: 10px;    
    height: 40px;
    line-height: 40px;
    padding-left: 20px;
    font-size: 16px;
    color: #757575;
    text-align: center;
    border-top: 1px solid #f6f6f6;
    background-color: #fff;
    } 
    .unreadmsg .unreadmsg-container .item  #icon{
    float: right;
    font-size: 30px;
    color: #ccc;
    } 
      .unreadmsg .unreadmsg-container .buttonTips{  
          text-align: center;
          font-size: 14px;
          line-height: 20px;
          color: #aaa;
     }


</style>
