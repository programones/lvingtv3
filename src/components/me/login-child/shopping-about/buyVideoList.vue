<template>
    <div class="buy-video">
        <p>购买视频列表</p>
        <button @click="closeBuyVideo">关闭</button>
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
        closeBuyVideo(){
       let fatherBox = document.querySelector('.about-me');
        fatherBox.setAttribute('style','overflow-y:auto');
        this.$emit('toPassBuyVideo',false)
        }
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
.buy-video{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #f6f6f6;
    z-index: 100; 
}
</style>
