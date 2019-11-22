<template>
    <div>
       
      <div class="register">
          <h3 class="me-title">我要参与互动</h3>
          <div class="me-content">
              <input type="text" placeholder="请输入手机号" maxlength="11" v-model="phoneNumber">
              <button  class="btn1" @click="getCode">{{statusCode?('重新获取('+residueTime+'s)'):'获取验证码'}}</button>
              <input type="text" placeholder="请输入验证码" maxlength="4" v-model="code">
              <div class="agree">
                   <el-checkbox v-model="radio" @change="openAggrement">我已阅读并已同意《用户注册协议》</el-checkbox>
              </div>
              <button class="btn1 btncneter" @click="quickJoin">火速参与</button>
          </div>
      </div>
      <signin-agree @setAgreement="passValue" v-if="agreeShow"></signin-agree>  
    </div>

</template>
 
 <script>
 import signinAgree from './registrationAgreement';
import {http} from '../../http/http'
 export default {
     components:{
      signinAgree   
     },
    data() {
        return {
         radio:false,   
         agreeShow:false,
         phoneNumber:'',
         code:'',
         statusCode: false,
         residueTime:60,
        }
    }, 
    methods: {
    openAggrement(){
        //用户协议同意是否
       window.console.log('1111');
       this.agreeShow=true
    },
    getCode(){
     //获取验证码
                let regExp = /^(\+?0?86\-?)?1[345789]\d{9}$/;  
             if (this.phoneNumber == "") {
          this.$notify({
               showClose: true,
               message: "手机号码不能为空!",
               duration: 1000,
               position: 'bottom-left'
             });
         } else if(!regExp.test(this.phoneNumber)){
                  
        this.$notify({
          showClose: true,
          message: "请输入正确的手机号码！",
          type: "error",
          duration: 1000,
          position: 'bottom-left'
        });         
           }else{
              this.sendCode() //倒计时方法           
           }  
    },
    sendCode(){
              if(!this.statusCode){
            this.sendPhoneCode()//发送验证码
         }
        	var vm = this;
					if(vm.statusCode) return;					
					vm.statusCode = true;				
					var time = setInterval(() => {
					  var residueTime = vm.residueTime;
					  residueTime--;
					  vm.residueTime = residueTime;
					  if (residueTime == 0) {
						clearInterval(time);
						vm.residueTime = 60
						vm.statusCode = false;
					  }
			}, 1000);
    },
     //预约处手机号码的发送方法
     sendPhoneCode(){
       let number = this.phoneNumber
       http.sendcode(number).then(res=>{
          console.log(res);
          if(res.data.code==200){
           this.$notify({
          showClose: true,
          type:'success',
          message: "验证码已发送",
          duration: 2500
           });
          }else {
             this.$notify({
              message: "两分钟内请勿重复发送!",
              type: "warning",
              duration: 2500,
              showClose: true
             });
          }
        })
     },
    passValue(val){
    // window.console.log(val)
        if(val){
            this.agreeShow=false;
            this.radio=true;
        }else {
            this.agreeShow=false;
            this.radio=false;
        }
    },
    quickJoin(){
     //火速参与点击事件
     if(!this.radio){
          this.$notify({
         type:'success',
         message:'请阅读用户注册协议',
          position: 'bottom-left',
           duration: 1500
     })
     }else{
      window.console.log('发送注册请求',this.phoneNumber,this.code);
      if(this.phoneNumber=='15179175372' && this.code== '1234'){

        this.$emit('close',{value:false})
      }   
     }
    
    }    
    },
    created() {
        
    },
    mounted() {
        
    },
 }
 </script>
 <style>
    .register{
       
    }
    .register .me-title{
    line-height: 31px;
    font-size: 20px;   
    margin-bottom: 10px;
    padding-bottom: 4px;
    font-weight: lighter;
    text-align: center;
    color: #00ccfe;
    border-bottom: 2px solid #ddd; 
    }
    .register  .me-content{
        padding-left: 10%;
      
    }
    .register  .me-content .agree{
       margin-top: 20px;
      
    }
    .register .me-content input{
    margin-top: 20px;    
    border: none;
    display: block;
    outline: none;
    padding-left: 7px;
    border-bottom: 1px solid #ddd;
    width: calc(100% - 78px);
    font-size: 14px;
    line-height: 30px;
    }
    .register .me-content .btn1 {
        margin-top: 20px;
    height: 34px;
    background-color: transparent;
    border: 1px solid #ddd;
    border-radius: 4px;
   }
    .register .me-content .btncneter {
      padding: 0 14px;
    margin-left: 34%;
    font-size: 15px;
   }
    
 </style>