<template>
    <div class="logout">
         <el-dialog
             title="注 意"
             :visible.sync="closelogout"
             width="90%"
             :show-close='false'
              top="30vh"
              :close-on-click-modal='false'
             center>
            <div class="content">
             您正在进行注销账户操作，申请注销后，您将进入7日的注销审核期，
             <span>7日后您的账户将被注销，全部资料（包括红包余额、积分）将被清空，无法恢复</span>
             ，请谨慎操作！
            </div>
             <span slot="footer" class="dialog-footer">
               <el-button @click="logoutClose">取 消</el-button>
               <el-button type="danger" @click="logoutClose">继 续</el-button>
             </span>
             </el-dialog>
    </div>
</template>

<script>
export default {
    props: ['closelogout'],
    data() {
        return {
               
        };
    },
    methods: {
        logoutClose(){
     this.$parent._data.thislogout=false    
        },
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
  .logout .el-dialog__title{
      color: red;
    }
    .logout .content span{
        color: red;
    }
   .logout  .el-dialog--center {
       border-radius: 15px;
   }
</style>
