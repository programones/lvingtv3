<template>
    <div>
     <el-drawer
            title="银行卡"
            :visible.sync="closebankcard"
            :direction="direction"
            size='100%'
            :show-close='false'>
            <div class="closebtn">
              <el-button @click="tocloseBankCard" type="text" icon="el-icon-back">返回</el-button>      
            </div>
            <div class="addbtn">
              <el-button type="text" @click="openInnerBOx">添加</el-button> 
                   
            </div>
            
              <div class="adress-content">
                  <p class="mycard-title"><span class="mycard">我的卡</span><span class="total">共0张</span></p>
                  <div class="virtual-position" @click="showaddCards">
                    <button class="add-logo">+</button>
                  </div>
              </div>

                     <el-drawer
                      title=""
                      :append-to-body="true"
                       size='100%'
                      :show-close='false'
                      :visible.sync="innerbox">
                          <div class="closebtn">
                   <el-button @click="tocloseInnerBox" type="text" icon="el-icon-back">返回</el-button>      
                 </div>  
                 <div class="addone-card">
                   <p class="add-title">添加银行卡</p>
                    <ul class="add-content">
                      <li>
                        <span>收款人户名</span>
                        <input type="text" placeholder="请输入持卡人名字">
                      </li>
                      <li>
                        <span>收款人账号</span>
                        <input type="text" placeholder="请输入银行卡号">
                      </li>
                      <li>
                        <span>收款银行</span>
                            <el-select v-model="choiseBank" clearable placeholder="请选择银行">
                             <el-option
                               v-for="item in options"
                               :key="item.value"
                               :label="item.label"
                               :value="item.value">
                             </el-option>
                             </el-select>
                      </li>
                      <li>
                        <span>收款银行支行</span>
                        <input type="text" placeholder="请输入银行支行">
                      </li>

                    </ul>
                   </div>  
                      

                    </el-drawer>
            </el-drawer>   
    </div>
</template>

<script>
export default {
    props: ['closebankcard'],
    data() {
        return {
         direction:"rtl",
          innerbox:false, 
          choiseBank:'', 
          options: [{
          value: '中国银行',
          label: '中国银行'
        }, {
          value: '中国工商银行',
          label: '中国工商银行'
        }, {
          value: '招商银行',
          label: '招商银行'
        }, {
          value: '中信银行',
          label: '中信银行'
        }, {
          value: '交通银行',
          label: '交通银行'
        },
        {
         value: '中国农业银行',
          label: '中国农业银行' 
        },{
           value: '中国建设银行',
          label: '中国建设银行' 
        },{
           value: '中国民生银行',
          label: '中国民生银行'
        },{
           value: '中国邮政储蓄银行',
          label: '中国邮政储蓄银行'
        }

        
        ],
        };
    },
    methods: {
     tocloseBankCard(){
       this.$parent._data.thisCard=false    
     },
      openInnerBOx(){
        //进入第二层盒子添加收货地址
        this.innerbox=true;  
      },
      tocloseInnerBox(){
        //关闭里层盒子
        this.innerbox=false;
      },
      showaddCards(){
        //打开里层盒子
        this.innerbox=true;
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
  .addone-card .add-title {
    margin-bottom: 10px;
    padding: 10px 0;
    font-size: 18px;
    font-weight: 600;
    text-align: center;
  }
  .addone-card .add-content {

   }
   .addone-card .add-content input {
     padding-left: 20px;
     border:none;
   }
   .addone-card .add-content span {
     font-size: 14px;
   }
  .addone-card .add-content li{
     border-bottom: 1px solid #f5f5f5;
    padding: 20px 0 10px 10px;
   }
  .addone-card .add-content li:nth-child(3){
        padding: 4px 10px;
   }
   .adress-content{
   padding: 0 10px;
   }
   .adress-content .mycard-title{
   text-align: left;
   }
   .adress-content .mycard {
     color: black;
     font-size: 16px;
     font-weight: 600;
   }
   .adress-content .total {
     margin-left: 10px;
    font-size: 14px;
    color: #aaa;
   }
    .adress-content .virtual-position {
    margin: 10px 0;
    height: 165px;
    border: 4px dashed #ccc;
    border-radius: 10px;
    position: relative;
    }
   .adress-content .virtual-position .add-logo {
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translateX(-50%) translateY(-50%);
    transform: translateX(-50%) translateY(-50%);
    border: 3px solid #ccc;
    background-color: transparent;
    color: #ccc;
    height: 40px;
    width: 40px;
    border-radius: 50%;
    font-size: 32px;
   }
</style>
