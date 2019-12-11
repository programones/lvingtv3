<template>
    <div class="live-video">
        <p>购买直播列表</p>
        <button @click="closeLiveOrder">关闭</button>
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
        closeLiveOrder(){
         let fatherBox = document.querySelector('.about-me');
        fatherBox.setAttribute('style','overflow-y:auto');
        this.$emit('topassLiveVideo',false)   
        },
    },
    computed: {

    },
    created() {

    },
    mounted() {

    },
    watch: {

    },
    components: {

    },
};
</script>

<style>
.live-video{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #f6f6f6;
    z-index: 100;         
}
</style>
