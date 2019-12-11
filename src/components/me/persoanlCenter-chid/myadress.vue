<template>
    <div>
         <el-drawer
            title="我的收货地址"
            :visible.sync="closeadress"
            :direction="direction"
            size='100%'
            :show-close='false'>
            <div class="closebtn">
              <el-button @click="tocloseAdress" type="text" icon="el-icon-back">返回</el-button>      
            </div>
            <div class="addbtn">
              <el-button type="text" @click="openInnerBOx">添加</el-button> 
                   
            </div>
            
              <div class="adress-content">
                  <p>请添加收获地址</p>
              </div>

                     <el-drawer
                      title="添加收获地址"
                      :append-to-body="true"
                       size='100%'
                      :show-close='false'
                      :visible.sync="innerbox">
                <div class="closebtn">
                   <el-button @click="tocloseInnerBox" type="text" icon="el-icon-back">返回</el-button>      
                 </div>    
                  <div class="addbtn">
              <el-button type="text" @click="addCard">保存</el-button>                   
               </div>
                    <div class="address-innerbox-content">
                       <div class="address-getperson">
                            <input type="text" placeholder="收件人">
                       </div>
                       <div class="adress-number">
                           <input type="text" placeholder="电话号码">
                       </div>
                       <div class="adress-palce">
                           所在地
                       </div>
                       <div class="address-detile">
                           <textarea name="textarea" id="inputdetile"  placeholder="详细地址: 如道路、门牌号、小区、楼栋号、单元室等"></textarea>
                       </div>
                       <div class="default"><span>是否为默认地址</span>
                       <div class="default-son">
                            <el-switch
                            v-model="ifdefault"
                            active-color="#13ce66"
                            inactive-color="#ff4949">
                            </el-switch>  
                        </div>
                           </div>
                    </div>
                    </el-drawer>
            </el-drawer>     
    </div>
</template>

<script>
export default {
    props: ['closeadress'],
    data() {
        return {
          direction:"rtl", 
          innerbox:false,  
          ifdefault:false,
        };
    },
    methods: {
          tocloseAdress(){
              //关闭添加地址的盒子
            //   window.console.log( this.$parent._data.thisAdress)
           this.$parent._data.thisAdress=false 
      },
      openInnerBOx(){
        //进入第二层盒子添加收货地址
        this.innerbox=true;  
      },
      tocloseInnerBox(){
        //关闭里层盒子
        this.innerbox=false;
      },
      addCard(){
          window.console.log('添加')
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
    .el-drawer__header>:first-child {
    font-size: 15px;
    color: #000;
    text-align: center;
  }
  .closebtn {
    position: absolute;
    top: 8px;
    left: 10px;
  }
  .addbtn {
     position: absolute; 
     top: 8px;
     right: 10px; 
  }
 .el-button--text {
     color: #000;
  }
  .adress-content {
      border-top: 1px soild #ccc;
  }
  .adress-content p{
    text-align: center;
    font-size: 14px;
    color: #aaa;
  }
   .address-innerbox-content .address-getperson {
     border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
   }
   .address-innerbox-content input{
    height: 40px;
    width: 100%;
    padding-left: 10px;
    border: none;
   }
    .address-innerbox-content .adress-palce {
    color: #757575;
    padding-left: 10px;
    height: 40px;
    border-bottom: 1px solid #ddd;
    line-height: 40px;
    font-size: 15px; 
    }
    .address-innerbox-content .adress-number {
    
    border-bottom: 1px solid #ddd; 
    }
    .address-innerbox-content .address-detile{
     border-bottom: 1px solid #ddd; 
    }
    .address-innerbox-content .address-detile textarea{
    border: none;
    height: 45px;
    padding-left: 10px;
    width: 100%;
    }
    .address-innerbox-content .default{
    padding-left: 10px;
    padding-right: 10px;
    line-height: 50px;
    height: 50px;
    border-bottom: 1px solid #ddd;
    }
    .address-innerbox-content .default .default-son{
       float: right;
    }

</style>
