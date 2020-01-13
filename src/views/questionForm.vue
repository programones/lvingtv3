<template>
  <div class="question">
    <div class="question-header">
      <span class="el-icon-arrow-left" id="back" @click="goBack"></span>
      调查问卷
    </div>
    <div class="question-body">
      <!-- 单选 -->
      <div class="radio-choice" v-for="(item,i) in radioList" :key="i">
        <p class="radio-title">{{item.index+ item.q_title+'--(单选)'}}</p>
        <el-radio-group v-model="radio[i]">
          <el-radio
            :label="opitem"
            v-for="(opitem) in item.options"
            :key="opitem.qo_id"
          >{{opitem.qo_value}}</el-radio>
        </el-radio-group>
      </div>
      <!-- 多选 -->
      <div class="checkbox-choide" v-for="(item) in checkboxList" :key="item.q_id">
        <p class="radio-title">{{item.index+item.q_title+'--(多选)'}}</p>
        <el-checkbox-group v-model="checkedChoiceList">
          <el-checkbox
            v-for="(thatitem) in item.options"
            :label="thatitem"
            :key="thatitem.qo_id"
          >{{thatitem.qo_value}}</el-checkbox>
        </el-checkbox-group>
      </div>
      <!-- 下拉 -->
      <div class="checkbox-select" v-for="(item,i) in selectList" :key="item.q_id">
        <p class="radio-title">{{item.index+item.q_title}}</p>
        <el-select v-model="selectItem[i]" placeholder="请选择">
          <el-option
            v-for="items in item.options"
            :key="items.qo_id"
            :label="items.qo_value"
            :value="items.qo_id"
          ></el-option>
        </el-select>
      </div>
    </div>
    <button class="btn" @click="refer">提&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;交</button>
    <quetionfooter class="question-footer" :class="{'active':acticeFooter}"></quetionfooter>
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
      radio: [], //单选框默认选中发的
      checkedChoiceList: [], //多选选中的列表
      allList: [], //所有的问题列表
      radioList: [], //单选问题列表
      checkboxList: [], //多选问题列表
      selectList: [], //下拉菜单列表
      selectItem: [], //选中的单选下拉框
      flag: 2, //是否在PC端
      q_id: [], //问题的id数组
      qo_id: [], //选中问题的id数组
      qa_text: [],//选中所有值的数组
      allselectList:[],//所有下拉选择的选项
      acticeFooter:false,//底部栏是否固定定位 
      qoidArr:[],//多选中方选中题的题目id
    };
  },
  methods: {
    //返回上一页
    goBack() {
      this.$router.go(-1);
    },
    //提交问题
    refer() {
     
      if(this.checkboxList.length==0){//没有多选题时
       
      }else {
       
        let qoidArr = []
    this.checkedChoiceList.forEach(item=>{
      qoidArr.push(item.q_id)
    })
    this.qoidArr = [... new Set(qoidArr)]
      //获取题目的q_id的数组
   let qidArr =  this.qidListFn(this.checkboxList);
     
      }
      //单选问题
      if (this.radio.length == this.radioList.length && this.radioList.length!=0) {
       
        this.radio.forEach(item => {
          this.qo_id.push(item.qo_id);
          this.qa_text.push(item.qo_value)
        });
       
      }
       //多选问题
      if (this.checkedChoiceList.length != 0) {
        this.checkedChoiceList.forEach(item => {
          this.qo_id.push(item.qo_id);
           this.qa_text.push(item.qo_value)
        });
      }
       
    
      //下拉选择
      if(this.selectItem.length==this.selectList.length){ 
        this.qo_id= this.qo_id.concat(this.selectItem);
         
      }else{
        //    this.$notify({
        //   title: '部分下拉选项未选择',
        //   position: 'bottom-left',
      	// 	duration:3000,//设置0的话的则不会关闭
        // });
      }
        this.selectList.forEach(item=>{
         
          this.allselectList = this.allselectList.concat(item.options)
        })
          //  window.console.log( this.allselectList)
         for(let i=0;i<=this.selectItem.length;i++){
            this.allselectList.forEach(item=>{
              if(item.qo_id==this.selectItem[i]){
                 this.qa_text.push(item.qo_value)
              }
            })  
         }  
      window.console.log("提交");
    
   
      window.console.log(
        // this.checkedChoiceList,
        // "0000000000",
      //  this.allList.length,
        // this.selectItem
        //  this.q_id,
        //  this.selectItem,
        // this.qa_text
      );
      // 发起提交数据
      // window.console.log(this.radioList.length+this.checkboxList.length+this.selectList.length)
      // window.console.log(this.radio.length+this.selectItem.length+this.qoidArr.length)
         if(this.radioList.length+this.checkboxList.length+this.selectList.length ==this.radio.length+this.selectItem.length+this.qoidArr.length){
          // window.console.log('所有问题都选完了')
           this.supdata()
        }else{
          // window.console.log('还有题目没做完');
          this.$notify({
              type: 'warning',
          title: '还有题目没回答哦',
          position: 'bottom-left',
      		duration:3000,//设置0的话的则不会关闭
        });
        }
         
      
      
      //初始化
      this.qo_id=[];
      this.qa_text=[];
      this.allselectList=[];
    },
    supdata(){ //提交数据
        let params = {
        member_token: window.localStorage.getItem("token"),
        qn_id: this.allList[0].qn_id,
        qa_way: this.flag,
        qa_ip: localStorage.getItem("Ip"),
        q_id: this.q_id,
        qo_id: this.qo_id,
        qa_text: this.qa_text
      };
      this.$http.referQuestion(params).then(res=>{
          if(res.data.code == 200){
        //      this.$notify({
        //   title: '感谢您的参与!',
        //   position: 'bottom-left',
      	// 	duration:3000,//设置0的话的则不会关闭
        // });
          this.$confirm('提交成功,是否返回直播间', '感谢您的参与!', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'success'
        }).then(() => { //点击确认方法
          this.$router.go(-1)
        }).catch(() => {//点击取消触发
                 
        });
       } else {
              this.$notify({
          title:res.data.msg,
          position: 'bottom-left',
      		duration:3000,//设置0的话的则不会关闭
        });
          

       }
      })
    },
    //获取问卷列表
    getQustionList() {
      this.$http.getQuestionList(this.$route.params.id).then(res => {
        // window.console.log(res);

        if (res.data.code == 200) {
          this.allList = res.data.data.question;
          if(this.allList.length<3){
            this.acticeFooter = true
          }
          this.allList.forEach((item, i) => {
            item.index = i + 1 + ".";
           this.q_id.push(item.q_id)
            if (item.q_type == "1") {
              this.radioList.push(item);
              this.radio.i=''
            } else if (item.q_type == "2") {
              this.checkboxList.push(item);
            } else if (item.q_type == "3") {
              this.selectList.push(item);
            }
          });
        }
      });
    },
    //传入checkboxList筛选多选框题目的q_id 返回q_id数组
     qidListFn(arr){
        let newArr = [];
        let qoidArr = []
    arr.forEach(item=>{
      newArr.push(...item.options)
    })
    newArr.forEach(item=>{
      qoidArr.push(item.q_id)
    })
      return [... new Set(qoidArr)]
    // window.console.log( [... new Set(qoidArr)])
     },
    IsPC() {
      //判断是否在pc端
      var userAgentInfo = navigator.userAgent;
      var Agents = [
        "Android",
        "iPhone",
        "SymbianOS",
        "Windows Phone",
        "iPad",
        "iPod"
      ];
      for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
          this.flag = 1;
          break;
        }
      }
    }
  },
  computed: {},
  created() {},
  mounted() {
    this.getQustionList();
    this.IsPC();
 
  },
  watch: {}
};
</script>

<style>
.question {
  position: absolute;
  width: 100%;
}
.question .btn {
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
  z-index: 100;
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
  /* position: fixed; */
  bottom: 0;
  width: 100%;
}
.question .question-body {
  overflow: auto;
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
.question .active {
  position: fixed;
}
</style>
