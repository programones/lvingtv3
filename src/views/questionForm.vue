<template>
  <div class="question">
    <div class="question-header">
      <span class="el-icon-arrow-left" id="back" @click="goBack"></span>
      调查问卷
    </div>
    <div class="question-body">
      <!-- 单选 -->
      <div class="radio-choice" v-for="(item,i) in radioList" :key="i">
        <p class="radio-title">{{i+1+"."+ item.q_title}}</p>
        <el-radio-group v-model="radio">
          <el-radio :label="opitem"   v-for="(opitem) in item.options" :key="opitem.qo_id">{{opitem.qo_value}}</el-radio>
         
        </el-radio-group>
      </div>
      <!-- 多选 -->
      <div class="checkbox-choide" v-for="(item) in checkboxList" :key="item.q_id">
        <p class="radio-title">{{item.q_title}}</p>
        <el-checkbox-group v-model="checkedChoiceList">
          <el-checkbox v-for="(thatitem) in item.options" :label="thatitem" :key="thatitem.qo_id">{{thatitem.qo_value}}</el-checkbox>
        </el-checkbox-group>
      </div>
    </div>
        <button class="btn" @click="refer">提&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;交</button>
    <quetionfooter class="question-footer"></quetionfooter>
  </div>
</template>

<script>
import quetionfooter from "../components/home-about/footer";

export default {
  props: {},
  components: {
    quetionfooter
  },
  data() {
    return {
      radio: null, //单选框默认选中发的
      checkedChoiceList: [],//多选选中的列表
      allList:[],//所有的问题列表
      radioList:[],//单选问题列表
      checkboxList:[],//多选问题列表  
    };
  },
  methods: {
      //返回上一页
      goBack(){
          this.$router.go(-1);
      },
      //提交问题
      refer(){
          window.console.log('提交');
          window.console.log( this.checkedChoiceList,'0000000000',this.radio);
           
      },
      //获取问卷列表
      getQustionList(){
       this.$http.getQuestionList(this.$route.params.id).then(res=>{
           window.console.log(res);
           
           if(res.data.code==200){
           this.allList = res.data.data.question;
            this.allList.forEach(item=>{
            if(item.q_type=="1"){
                this.radioList.push(item)
            }else if(item.q_type=="2"){
                this.checkboxList.push(item)
            }
            })   
           }
       })
      },
  },
  computed: {},
  created() {},
  mounted() {
      this.getQustionList()
  },
  watch: {}
};
</script>

<style>
.question {
  position: absolute;
  width: 100%;
}
.question .btn{
 background-color: #1a73e8;
    color: #fff;
    border: none;
    outline: none;
    padding: 4px 10px;
    border-radius: 4px;
    margin: 56px auto 30px;
    display: block;
    font-size: 14px;
}
.question .question-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 40px;
  background-color: #428bca;
  border-bottom: 1px solid #aaa;
  line-height: 40px;
  color: #fff;
  font-size: 16px;
  text-align: center;
}
.question .question-header #back {
  font-size: 28px;
  position: absolute;
  left: 0;
  top: 6px;
}
.question-footer {
  position: fixed;
  bottom: 0;
  width: 100%;
}
.question .question-body {
      padding-left: 20px;
    margin-top: 41px;
}
.question .question-body label {
  display: block;
  line-height: 30px;
}
/* .question .question-body span {
  display: block;
  line-height: 30px;
} */
.question .question-body .radio-title {
  font-size: 16px;
  line-height: 36px;
  text-indent: -10px;
}
</style>
