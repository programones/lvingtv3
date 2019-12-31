<template>
    <div class="main">
        <h1 class="notf" @click="Gotoback"> ⬅ 返回首页</h1>
    </div>
</template>

<script>
export default {
    props: {

    },
    data() {
        return {

        };
    },
    methods: {
     Gotoback(){
      //返回首页
    //   window.console.log('===>')
      this.$router.go(-1)
     }   
    },
    computed: {

    },
    created() {

    },
    mounted() {
    //  window.location.href="http://129.204.50.219/notfound/"    
    },
    watch: {

    },
    components: {

    },
};
</script>

<style scope>
 .main{
     overflow: hidden;
     height: 121%;
     background: url('http://img.zcool.cn/community/015cf8568b3bac6ac7251bb62e727c.gif') no-repeat center center
 }
    .notf{
        margin-top: 120%;
        text-align: center;
    }
</style>
