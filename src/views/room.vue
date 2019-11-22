<template>
    <div>
      <video-area></video-area> 
      <video-tabs></video-tabs> 
    </div>
</template>
<script>
import videoArea  from '../components/video-play/videoArea';
import videoTabs from '../components/video-play/vidoeTabs';

export default {
  components:{
      videoArea,
      videoTabs
  } ,
  data(){
      return {

      }
  }
}
</script>
<style>
    
</style>