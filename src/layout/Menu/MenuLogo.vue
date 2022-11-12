<template>
    <div class="logo">
        <img src="@/assets/zy.png" class="img"/>
        <span v-show="show" class="title">视频管理系统</span>
    </div>
</template>
    
<script setup lang='ts'>
import { ref, computed, watch } from 'vue'
import { collapseStore } from '@/store/collapse';

// 获取 store
const store = collapseStore();

// 获取 collapsed
const collapsed = computed(() => {
    return store.getCollapse
})

// 定义 show
const show= ref(true) 

// 监听 collapsed 值， 做延时处理
watch(()=>collapsed.value,(collapsed:boolean)=>{
    if (!collapsed) {
        setTimeout(() => {
            show.value = !collapsed
        }, 250)
    } else {
        show.value = !collapsed
    }
})

</script>
    
<style scoped lang="scss">
    .logo {
        // background-color: #2f54eb;
        background-color: #ffffff;
        height: 50px;
        border: none;
        line-height: 45px;
        display: flex;
        align-items: center;
        padding-left: 20px;
        color: #fff;
        border: 1px solid lavender;
         
        .img {
            width: 48px;
            height: 40px;
            margin-right: 1px;
        }
        .title {
            height: 45px;
            // background-color: #2f54eb;
            background-color: #ffffff;
            text-align: center;
            color: rgb(0, 0, 0);
            box-sizing: border-box;
            font-weight: 600;
            line-height: 50px;
            font-size: 18px;
            vertical-align: middle;
        }
    }
</style>