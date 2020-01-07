<template>
    <div>
 
         <div class="record">
              <div class="no-video" v-if="videoHistoryList.length==0"><p>暂无历史视频记录😅</p></div>
		<div class="vod-box">
			<div class="vod-box-content" v-for="item in videoHistoryList" :key="item.log_id"  @click="toVideo(item)">
                <span class="price" v-if="item.price!=0">¥{{item.price}}</span>
				<img :src="item.coverUrl">
				<p>{{item.videoName}}</p>
			</div>
		</div>
    </div>    
    </div>
</template>
<script>
import {http} from '../../http/http';
// import bus from '../../eventBus'
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
        // window.console.log(val,'单个视频信息');   
        // bus.$emit('passvalue',val)     
        this.$router.push({name:'room',params:{id: this.$route.params.id},query:{ uid: this.$route.query.uid, 
         history: val.log_id}});
        window.location.reload();
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
 @media (min-width: 767px) and (max-width: 1300px){
        .record {
        height: 14rem;
     }    
  }
  @media (min-height: 800px) and (max-height: 830px) {
    .record {
        height: 27rem;
     }     
  }
.record .no-video{
    margin-top: 36%;
    text-align: center;
    font-size: 15px;
}

.vod-box {
    /* width: 100%; */
    /* column-gap:15px; */
    column-count: 5;
    margin: 0 auto;
}
.vod-box-content {
     cursor: pointer;
    position: relative;
    break-inside: avoid;
    padding: 4px;
   margin: 0 0 10px;
    box-shadow: 0 0 5px #333;
    border-radius: 4px;
    display: block;
   
}
.vod-box-content .price{
    
    color: yellow;
    z-index: 10;
    position: absolute;
    top: 10px;
    right: 10px;
    font-weight: 800;
    background-color: hsla(0, 0%, 0%, 0.3);
}
.vod-box-content img {
    width: 100%;
}    
.vod-box-content p {
    line-height: 20px;
    font-size:1em;
    margin-top: 0px;
    margin-bottom: 5px;
    font-weight: 800;
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
        column-count: 1;
    }
}
@media (max-width: 450px) and (min-width: 241px) {
    .vod-box {
        column-count: 1;
    }
} 
</style>