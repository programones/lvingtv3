<template>
    <div>
           <el-drawer
            title="修改手机号"
            :visible.sync="closeaddphone"
            :direction="direction"
            size='100%'
            :show-close='false'>
            <div class="closebtn">
              <el-button @click="toclosePhone" type="text" icon="el-icon-back">返回</el-button>      
            </div>           
              <div class="phone-content">
                 <div class="newnumber">
                     <span>新手机号</span>
                     <input type="text" placeholder="请输入新的手机号" maxlength="11">
                 </div>
                 <button>提交</button>
              </div>

                  
            </el-drawer> 
    </div>
</template>

<script>
export default {
    props:{
         closeaddphone:{
         type:Boolean,
          require:true     
        }  
    },
    data() {
        return {
          direction:"rtl",
        };
    },
    methods: {
        toclosePhone(){
             this.$parent._data.thisphone=false 
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
 .phone-content .newnumber {
     border-bottom: 1px solid #ddd;
     border-top: 1px solid #ddd;
     padding: 10px 10px;
 }
 .phone-content .newnumber span{
   font-size: 14px;
 }
 .phone-content .newnumber input{
   border: none;
   padding-left: 10px;
 }
  .phone-content button{
    border: none;
    background-color: #007acc;
    color: #fff;
    width: 80%;
    margin: 20px auto;
    font-size: 16px;
    padding: 10px 0;
    border-radius: 4px;
    display: block;
  }
</style>
