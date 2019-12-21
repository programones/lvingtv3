<template>
    <div>
         <el-drawer
            title="编辑收货地址"
            :visible.sync="closeEditAddress"
            :direction="direction"
            size='100%'
            :show-close='false'> 

              <div class="closebtn">
              <el-button @click="closeEditAdress" type="text" icon="el-icon-back">返回</el-button>      
            </div>
                  <div class="addbtn">
              <el-button type="text" @click="saveAdress">保存</el-button>                  
            </div>
            
                   <div class="address-innerbox-content">
                       <div class="address-getperson">
                            <input type="text" placeholder="收件人" v-model="name1">
                       </div>
                       <div class="adress-number">
                           <input type="text" placeholder="电话号码" v-model="phone1">
                       </div>
                       <div class="adress-palce">
                          <v-distpicker  @province='onChangeProvince1' @city="onChangeCity1" @area="onChangeArea1"></v-distpicker>
                       </div>
                       <div class="address-detile">
                           <textarea name="textarea" id="inputdetile"  placeholder="详细地址: 如道路、门牌号、小区、楼栋号、单元室等" v-model="detailAddress1"></textarea>
                       </div>
                       <div class="default"><span>是否为默认地址</span>
                       <div class="default-son">
                            <el-switch
                            v-model="ifdefault1"
                            active-color="#13ce66"
                            inactive-color="#ff4949">
                            </el-switch>  
                        </div>
                           </div>
                    </div>

            </el-drawer>
    </div>
</template>

<script>
import VDistpicker from 'v-distpicker';
export default {
    props: ['closeEditAddress','editdata'],
    data() {
        return {
        direction:"rtl", 
        detailAddress1:"",//详细地址
          phone1: '', // 手机号
          name1: '', // 收件人
          ifdefault1:false,

        };
    },
    methods: {
        closeEditAdress(){
            //关闭
          this.$parent._data.closeEditAddress=false    
        },
        saveAdress(){
            //确认修改

        },
        onChangeProvince1(){

        },
        onChangeCity1(){

        },
        onChangeArea1(){

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
         VDistpicker,
    },
};
</script>

<style>

</style>
