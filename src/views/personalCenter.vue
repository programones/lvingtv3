<template>
  <div class="personal-center">
    <!-- <p>个人中心</p> -->
    <div class="personal-header">
      <div class="closethis" @click="toTopage">
        <i class="el-icon-back"></i>
      </div>
      <span class="personal-title">个人中心</span>
    </div>

    <div class="personal-body">
      <ul>
        <li class="personal-imgifo">
          <span>
            <img :src="userIfo.headimgurl" alt width="50" height="50" />
          </span>
          <span>{{userIfo.nickname || '未登陆'}}</span>
        </li>
        <li class="personal-adress" @click="toAdress">
          <span>
            <i class="el-icon-location"></i> 我的收货地址
          </span>
          <span>
            <i class="iconfont icon-arrow-right" id="right"></i>
          </span>
        </li>
        <li class="personal-adress" @click="toEditPhone">
          <span>
            <i class="el-icon-phone"></i> 手机号修改
          </span>
          <span>
            <i class="iconfont icon-arrow-right" id="right"></i>
          </span>
        </li>
        <li class="personal-adress" @click="toBankCard">
          <span>
            <i class="el-icon-s-platform"></i> 绑定银行卡
          </span>
          <span>
            <i class="iconfont icon-arrow-right" id="right"></i>
          </span>
        </li>
        <li class="personal-adress" @click="clearCookie">
          <span>
            <i class="el-icon-document-delete"></i> 退出登陆
          </span>
          <span>
            <i class="iconfont icon-arrow-right" id="right"></i>
          </span>
        </li>
        <li class="personal-adress" @click="loginOut">
          <span>
            <i class="el-icon-s-release"></i> 注销账户
          </span>
          <span>
            <i class="iconfont icon-arrow-right" id="right"></i>
          </span>
        </li>
      </ul>
    </div>
    <my-adress :closeadress="thisAdress"></my-adress>
    <edit-phone :closeaddphone="thisphone"></edit-phone>
    <bank-card :closebankcard="thisCard"></bank-card>
    <logout :closelogout="thislogout"></logout>
  </div>
</template>

<script>
import myAdress from "../components/me/persoanlCenter-chid/myadress";
import editPhone from "../components/me/persoanlCenter-chid/editPhoneNumber";
import bankCard from "../components/me/persoanlCenter-chid/bankCard";
import logout from "../components/me/persoanlCenter-chid/logout";
import { getCookie, delCookie } from "../api/aboutCookies";
export default {
  components: {
    myAdress,
    editPhone,
    bankCard,
    logout
  },
  props: {},
  data() {
    return {
      thisAdress: false,
      thisphone: false,
      thisCard: false,
      thislogout: false,
      direction: "rtl",
      userIfo: {} //获取个人信息
    };
  },
  methods: {
    toTopage() {
      this.$router.go(-1); //返回上一页
    },
    toAdress() {
      this.thisAdress = true;
    },

    toEditPhone() {
      this.thisphone = true;
    },
    toBankCard() {
      this.thisCard = true;
    },
    loginOut() {
      this.thislogout = true;
    },
    clearCookie() {
      //退出登陆

      if (confirm("确认退出登陆吗")) {
        // window.console.log(121212);
        window.localStorage.setItem('token',0)
        delCookie("token");
        this.$notify({
          title: "登出成功!",
          position: "bottom-left",
          duration: 5000 //设置0的话的则不会关闭
        });
        window.location.reload();
      }
    },
    getThatUsrIfo() {
      //获取用户的头像积分相关信息
      let member_token = getCookie("token");
      this.$http.getUserIfo(member_token).then(res => {
        window.console.log(res, "用户信息");
        this.userIfo = res.data.data;
      });
    }
  },
  computed: {},
  created() {},
  mounted() {
    this.getThatUsrIfo();
  },
  watch: {}
};
</script>

<style>
.personal-center {
  background-color: #f5f5f5;
  height: 100%;
}
.personal-header {
  line-height: 40px;
  text-align: center;
  height: 40px;
  border-bottom: 1px solid #e4e4e4;
  background-color: #fff;
}
.personal-header .closethis {
  float: left;
  padding-right: 10px;
  border-right: 1px solid #f5f5f5;
  padding-left: 10px;
  height: 100%;
  /* display: inline-block;    */
}
.personal-header .personal-title {
  font-weight: 800;
  font-size: 16px;
}
.personal-header .closethis i {
  font-size: 25px;
  color: #ccc;
}
.personal-body .personal-imgifo {
  margin-bottom: 20px;
  padding: 10px;
  border-bottom: 1px solid #f5f5f5;
  background-color: #fff;
}
.personal-body .personal-imgifo img {
  border: 1px solid #f5f5f5;
  border-radius: 50%;
}
.personal-body .personal-imgifo span {
  font-size: 14px;
  margin-left: 10px;
}
.personal-body .personal-adress {
  height: 50px;
  line-height: 50px;
  font-size: 15px;
  padding-left: 10px;
  padding-right: 10px;
  border-bottom: 1px solid #f5f5f5;
  background-color: #fff;
}
.personal-body .personal-adress #right {
  float: right;
  color: #aaa;
}
.personal-body li:last-child {
  border-top: 1px solid #f5f5f5;
  margin-top: 20px;
}
</style>
