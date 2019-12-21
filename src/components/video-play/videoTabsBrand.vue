<template>
    <div>
    <p class="no-data" v-if="adList.length==0">暂时没有数据📖</p>  
    <div class="orgin-box-content" v-for="(item,i) in adList" :key="i">
     <p class="orgin-title">{{item.title}}</p>     

     <img :src="item.pic" :alt="item.description" @click="clickADFn(item)">  
    </div>
    </div>
</template>

<script>
import {getCookie} from '../../api/aboutCookies'
export default {
    props: {

    },
    data() {
        return {
            adList:[],//后台获取到的广告列表
        };
    },
    methods: {
      getADlsit(){
          let params = {
           ip:window.localStorage.getItem('Ip'),
           iploc:window.localStorage.getItem('cityname'),
           member_token:getCookie('token'),
           room_id:this.$route.params.id,
           uid:getCookie('uid')
          }
       this.$http.getADList(params).then(res=>{
           window.console.log(res);
            this.adList=res.data.data;
       })  
      },  
      clickADFn(val){
         window.console.log(val)  
        let params = {
         ads_id:val.ads_id,
         ip:window.localStorage.getItem('Ip'),
         iploc:window.localStorage.getItem('cityname'),
         member_token:getCookie('token'),
         room_id:this.$route.params.id  
        }
        this.$http.clickADreq(params).then(res=>{
         window.console.log(res);
         if(res.data.code == 200){
              window.console.log(1111111111111);
            //  window.location.href= 'https://'+res.data.data.url+'?timestamp='+ new Date().getTime()+Math.random();
         }
        })

        //获取点击统计
        // let params = {
        //   ads_id :val.ads_id,
        //   ip:window.localStorage.getItem('Ip'),
        //   iploc:window.localStorage.getItem('cityname'),
        //   token:getCookie('token')
        // }
        // this.$http.clickRedpaper(params).then(res=>{
        //   window.console.log(res)
        // })
      }     
    },
    computed: {

    },
    created() {

    },
    mounted() {
     this.getADlsit()
    },
    watch: {

    },
    components: {

    },
};
</script>

<style scope>
 .orgin-box-content{
     padding: 4px;
    -webkit-box-shadow: 0 0 5px #333;
    box-shadow: 0 0 5px #333;
    margin: 8px 6px 15px;
    border-radius: 4px;
    display: block;
 }
  .no-data{
   text-align: center;
   line-height: 160px;
   font-size: 15px;
 }
 .orgin-box-content .orgin-title{
     text-align: center;
    line-height: 20px;
    font-size: 14px;
    font-weight: 600;
 }
 .orgin-box-content img{
  width: 100%;
 }
</style>
