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
                  <p v-if="addressData.length==0" class="no-address">请添加收获地址</p>

                   <ul>
                <li v-for="item in addressData" :key="item.id">
                    <div class="left">
                        <span class="name">{{item.true_name}}</span>
                        <span class="phone">{{item.mob_phone}}</span>
                        <span class="default-tag" v-if="item.is_default == '1'">默认</span>
                        <p class="address">{{item.area_info}} {{item.address}}</p>
                    </div>
                    <div class="right" @click="editFn(item)">编辑</div>
                </li>
            </ul>  
              </div>

                     <el-drawer
                      :title="addressTitle"
                      :append-to-body="true"
                       size='100%'
                      :show-close='false'
                      :visible.sync="innerbox">
                <div class="closebtn">
                   <el-button @click="tocloseInnerBox" type="text" icon="el-icon-back">返回</el-button>      
                 </div>    
                  <div class="addbtn" v-if="showaddBtn">
              <el-button type="text" @click="addCard">保存</el-button>                   
               </div>
                  <div class="addbtn" v-if="showeditBtn">
              <el-button type="text" @click="editAdress">保存</el-button>                   
               </div>
                   <div class="address-innerbox-content">
                       <div class="address-getperson">
                            <input type="text" placeholder="收件人" v-model="name">
                       </div>
                       <div class="adress-number">
                           <input type="text" placeholder="电话号码" v-model="phone">
                       </div>
                       <div class="adress-palce">
                          <v-distpicker  @province='onChangeProvince' @city="onChangeCity" @area="onChangeArea"></v-distpicker>
                       </div>
                       <div class="address-detile">
                           <textarea name="textarea" id="inputdetile"  placeholder="详细地址: 如道路、门牌号、小区、楼栋号、单元室等" v-model="detailAddress"></textarea>
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
import VDistpicker from 'v-distpicker';
import {getCookie} from "../../../api/aboutCookies";
export default {
   components: {
       VDistpicker,
    },
    props: ['closeadress'],
    data() {
        return {
          direction:"rtl", 
          innerbox:false,  
          ifdefault:false,
          addressTitle:"添加收获地址",
          showaddBtn:true,//添加按钮
          showeditBtn:false,//编辑按钮
            //省市区
          province: '',
          city: '',
          area: '',

          detailAddress:"",//详细地址
          phone: '', // 手机号
          name: '', // 收件人

          addressData:[
            {
            id:1,
            true_name:'小米名',
            mob_phone:15179175421,
            is_default:1,
            area_info:'广东省深圳市宝安区某某街道XX地址',
            address:"XX大厦XX公寓楼几室"
          },
        
          ],
          closeEditAddress:false,
        };
    },
    methods: {
      getAddressList(){
        //获取收获地址的列表
        this.$http.addressList(getCookie('token')).then(res=>{
            this.addressData = res.data.data
        })
      },
          tocloseAdress(){
              //关闭添加地址的盒子
            //   window.console.log( this.$parent._data.thisAdress)
           this.$parent._data.thisAdress=false 
      },
      openInnerBOx(){
        //进入第二层盒子添加收货地址,编辑地址
        this.innerbox=true;  
        this.showaddBtn = true;
        this.showeditBtn = false;
      },
      tocloseInnerBox(){
        //关闭里层盒子
        this.innerbox=false;
        this.addressTitle = "添加收获地址";
        this.name = "";
        this.phone = "";
        this.detailAddress = "";
        this._data.ifdefault=false;
      },
      addCard(){
        //添加地址
          // window.console.log('添加' ,this.province,this.city,this.area,this.ifdefault);
          if(this.detailAddress && this.phone && this.name){
            let params = {
              member_token:getCookie('token'),
              true_name:this.name,
              address:this.detailAddress,
              area_id:this.area,
              city_id:this.city,
              province_id:this.province,
              mob_phone:this.phone,
              is_default:this.ifdefault?"1":"0"

            }
            this.$http.addAddress(params).then(res=>{
              // window.console.log(res);
           this.$notify({
           title: res.data.msg,
           position: 'bottom-left',
      	   duration:3000,//设置0的话的则不会关闭
        });
            })
          }else{
              this.$notify({
          title: '请确认地址信息是否输入完整',
          position: 'bottom-left',
      		duration:3000,//设置0的话的则不会关闭
        });
          }
      },
      //选择省市区
      onChangeProvince(val){
          this.province = val.code
      },
      onChangeCity(val){
        this.city = val.code
      },
      onChangeArea(val){
        this.area = val.code
      },
      editFn(val){
        //编辑的地址
        this.innerbox = true;
         this.showaddBtn = false;
        this.showeditBtn = true;
        this.addressTitle = "编辑收获地址";
        this.name = val.true_name;
        this.phone = val.mob_phone;
        this.detailAddress =  val.address;
        this._data.ifdefault=val.is_default?true:false;
        
        // window.console.log(this.$children[1]._data);
        // this.editdata = val;
        // this.$children[1]._data.name1 = val.true_name;
        // this.$children[1]._data.phone1 = val.mob_phone;
        // this.$children[1]._data.detailAddress1 = val.address;
        // this.$children[1]._data.ifdefault1 = val.is_default?true:false;
      },
      editAdress(){
        //修改编辑的地址
        window.console.log('编辑按钮');
        if(this.detailAddress && this.phone && this.name){
            let params = {
              member_token:getCookie('token'),
              true_name:this.name,
              address:this.detailAddress,
              area_id:this.area,
              city_id:this.city,
              province_id:this.province,
              mob_phone:this.phone,
              is_default:this.ifdefault?"1":"0"

            }
            this.$http.editAddress(params).then(res=>{
              window.console.log(res);
           this.$notify({
           title: res.data.msg,
           position: 'bottom-left',
      	   duration:3000,//设置0的话的则不会关闭
        });
            })
          }else{
              this.$notify({
          title: '请确认地址信息是否输入完整',
          position: 'bottom-left',
      		duration:3000,//设置0的话的则不会关闭
        });

        //  window.console.log('修改' ,this.phone,this.detailAddress,this.name,this.ifdefault);

          } 
      },

    },
    computed: {

    },
    created() {

    },
    mounted() {
      this.getAddressList()
    },
    watch: {

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
  .adress-content .no-address{
    text-align: center;
    font-size: 14px;
    color: #aaa;
  }
  .adress-content li{
   overflow: hidden;
  padding: 8px 4px;
   border-bottom: 1px soild #ddd;
   position: relative;
  }
  .adress-content li .left{      
    float: left;
    font-size: 15px;
    color: #4d4d4d;
    line-height: 23px;
  }
  .adress-content li .default-tag{
         background-color:orange;
        color: #fff;
        font-size: 10px;
        padding: 2px 4px;
        border-radius: 4px;
        margin-left: 6px;
  }
  .adress-content li .phone{
        padding-left: 15px;
        font-size: 12px;
        color: #a5a5a5;
        vertical-align: bottom;
  }
  .adress-content li .address{
          font-size: 14px;
          max-width: 80%;
          text-align: left;
  }
  .adress-content li .right{
        position: absolute;
        right: 0;
        top: 20px;
          color: #aaa;
        font-size: 14px;
        height: 50px;
        width: 50px;
        text-align: center;
        line-height: 50px;
        border-left: 1px solid #efefef;
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
    height: 80px;
    border-bottom: 1px solid #ddd;
    /* line-height: 40px; */
    font-size: 15px; 
    }
    .address-innerbox-content .adress-palce .distpicker-address-wrapper select{
      padding: 0px;
      font-size: 12px;
      height: 30px;
      outline: none;
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
