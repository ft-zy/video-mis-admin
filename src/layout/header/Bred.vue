﻿<template>
    <a-breadcrumb class="bred">
        <a-breadcrumb-item class="item" v-for="item in tabs">{{ item.meta.title }}</a-breadcrumb-item>
    </a-breadcrumb>  
    
</template>
    
<script setup lang='ts'>
import { ref, Ref, onMounted, watch } from 'vue'
import { RouteLocationMatched, useRoute } from 'vue-router';
//当前路由
const route = useRoute()

//定义面包屑导航数据
const tabs: Ref<RouteLocationMatched[]> = ref([])

//获取面包屑导航数据
const getBred = () => {
    // console.log(route.matched)
    let mached = route.matched.filter(item => item.meta && item.meta.title);
    const first = mached[0];
    //设置面包屑导航数据
    tabs.value = mached
}
onMounted(() => {
    getBred()
})

//监听路由数据，更新面包屑导航数据
watch(() => route.path, () => {
    getBred()
})
</script>
    
<style scoped lang='scss'>
.bred {
    margin-left: 15px;
        .item {
        color: black;
    }
}
:deep(.ant-breadcrumb-separator) {
    color: black !important;
}
</style>