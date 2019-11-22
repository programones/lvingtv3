<template>
    <div>
 
         <div class="record">
              <div class="no-video" v-if="videoHistoryList.length==0"><p>暂无历史视频记录😅</p></div>
		<div class="vod-box">
			<a class="vod-box-content" v-for="(item,i) in videoHistoryList" :key="i" @click="toVideo(item)">
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

    data() {
        return {
         videoHistoryList:[],

        }
    },
    methods: {
        videoHistory(){
             http.getvideoHistory(this.$route.params.id).then(
                 res=>{
                     window.console.log(res,'历史视频记录');
                     if(res.data.code==200) {
                     this.videoHistoryList= res.data.data.data;
                      window.console.log(this.videoHistoryList,'历史视频记录');   
                     }
                 }
             )
        },
        toVideo(val){
        window.console.log(val,'单个视频信息');        
        }   
    },
    created() {
      
    },
    mounted() {
      this.videoHistory()    
    },
}
</script>
<style>
.record {
    position: relative;
    overflow-y: auto;
    height: 20rem;
}
.record .no-video{
    margin-top: 36%;
    text-align: center;
    font-size: 15px;
}

.vod-box {
    width: 100%;
    /* column-gap:15px; */
    column-count: 5;
    margin: 0 auto;
}
.vod-box-content {
    break-inside: avoid;
    padding: 4px;
   margin: 0 0 10px;
    box-shadow: 0 0 5px #333;
    border-radius: 4px;
    display: block;
}
.vod-box-content img {
    width: 100%;
}    
.vod-box-content p {
    line-height: 20px;
    font-size: 0.875em;
    margin-top: 0px;
    margin-bottom: 5px;
}
@media (min-width: 992px) and (max-width: 1300px) {
    .vod-box {
        column-count: 4;
    }
}
@media (min-width: 768px) and (max-width: 991px) {
    .vod-box {
        column-count: 3;
    }
}
@media (min-width: 641px) and (max-width: 767px) {
    .vod-box {
        column-count: 2;
    }
}
@media (max-width: 450px) and (min-width: 241px) {
    .vod-box {
        column-count: 2;
    }
} 
</style>