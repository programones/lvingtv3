<template>
   <div>
         <div class="paytheme">
              <div class="no-video" v-if="paythemelIst.length==0"><p>暂无记录😅</p></div>
		<div class="paytheme-box">
			<a class="paytheme-box-content" v-for="(item,i) in paythemelIst" :key="i" @click="toVideo(item)">
				<img :src="item.coverUrl">
				<p>{{item.videoName}}</p>
			</a>
		</div>
    </div>    
    </div>
</template>

<script>
import {http} from '../../http/http';
export default {
    props: {

    },
    data() {
        return {
         paythemelIst:[], 
        };
    },
      methods: {
      getpaytheme(){
       http.getpaytheme(this.$route.params.id).then(
           res=>{
              
               if(res.data.code==200){
                this.paythemelIst=res.data.data;
                 window.console.log(this.paythemelIst,'付费主题列表');
               }
           }
       )    
      },
    },
    created() {

    },
    mounted() {
        this.getpaytheme()
    },

    components: {

    },
};
</script>

<style>
    .paytheme {
    position: relative;
    overflow-y: auto;
    height: 20rem;
}
.paytheme .no-video{
    margin-top: 36%;
    text-align: center;
    font-size: 15px;
}

.paytheme-box {
    width: 100%;
    /* column-gap:15px; */
    column-count: 5;
    margin: 0 auto;
}
.paytheme-box-content {
    break-inside: avoid;
    padding: 4px;
   margin: 0 0 10px;
    box-shadow: 0 0 5px #333;
    border-radius: 4px;
    display: block;
}
.paytheme-box-content img {
    width: 100%;
}    
.paytheme-box-content p {
    line-height: 20px;
    font-size: 0.875em;
    margin-top: 0px;
    margin-bottom: 5px;
}
@media (min-width: 992px) and (max-width: 1300px) {
    .paytheme-box {
        column-count: 4;
    }
}
@media (min-width: 768px) and (max-width: 991px) {
    .paytheme-box {
        column-count: 3;
    }
}
@media (min-width: 641px) and (max-width: 767px) {
    .paytheme-box {
        column-count: 2;
    }
}
@media (max-width: 450px) and (min-width: 241px) {
    .paytheme-box {
        column-count: 1;
    }
} 
</style>
