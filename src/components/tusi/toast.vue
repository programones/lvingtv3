<template>
    <div class="toast">
        {{toastMsg}}
    </div>
</template>

<script>
export default {
    props: ['toastMsg'],
    data() {
        return {

        };
    },
    methods: {

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
.toast{
    padding: 5px;
    position: relative;
    background-color: #ddd;
    left: 50%;
	top: 50%;
	transform: translate(-50%,-500%);
    display: inline-block;
    text-align: center;
    line-height: 20px;
    border-radius: 4px;
    z-index: 900000;
}
</style>
