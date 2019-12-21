<template>
  <div>
    <el-drawer
      title="银行卡"
      :visible.sync="closebankcard"
      :direction="direction"
      size="100%"
      :show-close="false"
    >
      <div class="closebtn">
        <el-button @click="tocloseBankCard" type="text" icon="el-icon-back">返回</el-button>
      </div>
      <div class="addbtn">
        <el-button type="text" @click="openInnerBOx">添加</el-button>
      </div>

      <div class="adress-content">
        <p class="mycard-title">
          <span class="mycard">我的卡</span>
          <span class="total">共0张</span>
        </p>
        <div class="virtual-position" @click="showaddCards">
          <button class="add-logo">+</button>
        </div>
      </div>
      <div class="list-body" v-if="cardList.length">
        <ul class="list-ul">
          <li v-for="(item,i) in cardList" :key="i">
            <div class="card-content">
              <span class="img"></span>
              <span>
                <div class="card-name">{{item.bank}}</div>
                <div class="card-type">储蓄卡</div>
              </span>
              <span class="card-num">{{item.bank_account}}</span>
            </div>
          </li>
        </ul>
      </div>

      <el-drawer
        title
        :append-to-body="true"
        size="100%"
        :show-close="false"
        :visible.sync="innerbox"
      >
        <div class="closebtn">
          <el-button @click="tocloseInnerBox" type="text" icon="el-icon-back">返回</el-button>
        </div>
        <div class="addone-card">
          <p class="add-title">添加银行卡</p>
          <ul class="add-content">
            <li>
              <span>收款人户名</span>
              <input type="text" placeholder="请输入持卡人名字" v-model="accountName" />
            </li>
            <li>
              <span>收款人账号</span>
              <input type="text" placeholder="请输入银行卡号" v-model="account" />
            </li>
            <li>
              <span>收款银行</span>
              <el-select v-model="choiseBank" clearable placeholder="请选择银行">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </li>
            <li>
              <span>收款银行支行</span>
              <input type="text" placeholder="请输入银行支行" v-model="subbranch" />
            </li>
          </ul>
          <button class="submit" @click="submitCardIfo">提交</button>
        </div>
      </el-drawer>
    </el-drawer>
  </div>
</template>

<script>
import { getCookie } from "../../../api/aboutCookies";
export default {
  props: ["closebankcard"],
  data() {
    return {
      direction: "rtl",
      innerbox: false,
      choiseBank: "",
      account: "", // 账号
      accountName: "", // 户名
      subbranch: "", // 支行
      showCradDetil: true,
      cardList:[],
      options: [
        {
          value: "中国银行",
          label: "中国银行"
        },
        {
          value: "中国工商银行",
          label: "中国工商银行"
        },
        {
          value: "招商银行",
          label: "招商银行"
        },
        {
          value: "中信银行",
          label: "中信银行"
        },
        {
          value: "交通银行",
          label: "交通银行"
        },
        {
          value: "中国农业银行",
          label: "中国农业银行"
        },
        {
          value: "中国建设银行",
          label: "中国建设银行"
        },
        {
          value: "中国民生银行",
          label: "中国民生银行"
        },
        {
          value: "中国邮政储蓄银行",
          label: "中国邮政储蓄银行"
        }
      ]
    };
  },
  methods: {
    tocloseBankCard() {
      this.$parent._data.thisCard = false;
    },
    openInnerBOx() {
      //进入第二层盒子添加收货地址
      this.innerbox = true;
    },
    tocloseInnerBox() {
      //关闭里层盒子
      this.innerbox = false;
    },
    showaddCards() {
      //打开里层盒子
      this.innerbox = true;
    },
    submitCardIfo() {
      //提交绑定银行卡信息
      window.console.log("绑卡~~~");
    },
    bindBankCard() {
      //绑定银行卡
      let params = {
        member_token: getCookie("token"),
        bank: this.choiseBank,
        bank_user: this.accountName,
        bank_account: this.account,
        bank_branch: this.subbranch
      };
      this.$http.bankCardBind(params).then(res => {
        window.console.log(res);
      });
    },
    //获取银行卡列表
    getBankCardList(){

      this.$http.bankCardList(getCookie('token')).then(res=>{
        window.console.log(res)
        this.cardList = res.data.data;
      })
    },
    
  },
  computed: {},
  created() {},
  mounted() {
    this.getBankCardList()
  },
  watch: {},
  components: {}
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
.addone-card .submit {
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
.addone-card .add-content input {
  padding-left: 20px;
  border: none;
}
.addone-card .add-content span {
  font-size: 14px;
}
.addone-card .add-content li {
  border-bottom: 1px solid #f5f5f5;
  padding: 20px 0 10px 10px;
}
.addone-card .add-content li:nth-child(3) {
  padding: 4px 10px;
}
.adress-content {
  padding: 0 10px;
}
.list-body .list-ul {
    overflow: auto;
    height: 20rem;
}
.list-body .list-ul li {
  margin: 10px 0;
  height: 165px;
  border-radius: 10px;
  overflow: hidden;
}
.list-body .list-ul .card-content {
  padding: 15px 20px;
  height: 100%;
  background: -webkit-linear-gradient(left, #398ecf, #3762be);
  background: -o-linear-gradient(right, #398ecf, #3762be);
  background: -moz-linear-gradient(right, #398ecf, #3762be);
  background: linear-gradient(to right, #398ecf, #3762be);
  box-sizing: border-box;
}
.list-body .list-ul .card-content span {
  display: inline-block;
  vertical-align: middle;
  color: #fff;
}
.list-body .list-ul .card-content .img {
  height: 40px;
  width: 40px;
  border-radius: 50%;
  background-color: #fff;
  margin-right: 10px;
}
.list-body .list-ul .card-content .card-num {
  float: right;
  font-size: 20px;
  height: 40px;
  line-height: 40px;
}
.list-body .list-ul .card-content .card-name {
  font-size: 18px;
  font-weight: 600;
}
.list-body .list-ul .card-content .card-type {
  margin-top: 15px;
  font-size: 12px;
}

.adress-content .mycard-title {
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
