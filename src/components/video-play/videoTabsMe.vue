<template>
    <div class="about-me">
    <registered v-if="showreg" @close="close"></registered>  
    <login  v-if="showlogin"></login>  
    </div>
</template>

<script>
import registered from '../me/registered'
import login from '../me/login'
export default {
    components:{
    registered,
    login
    },
    data(){
        return {
         showreg:true,
         showlogin:false,   
        }
    },
    methods: {
      close(data){
        this.showreg=data.value  
        this.showlogin=!data.value  
      }  
    },
    created(){

    },
    mounted() {
        
    },
}
</script>
<style>
    .about-me{
    position: relative;
    overflow-y: auto;
    height: 20rem;
    }
</style>