<template>
    <component @click="clickBtn" 
    :is="isCollapse ? MenuUnfoldOutlined : MenuFoldOutlined" 
    class="icons" />
</template>
    
<script setup lang='ts'>
import screenfull from 'screenfull';
import { MenuUnfoldOutlined, MenuFoldOutlined,
  FullscreenOutlined, FullscreenExitOutlined
  } from '@ant-design/icons-vue';
import { ref, reactive, computed } from 'vue'
import { collapseStore, fullStore } from '@/store/collapse'

// 获取 store
const store = collapseStore();
const full = fullStore();

// 获取 isCollapse
const isCollapse = computed(() => {
    return store.getCollapse
})

const isFull = computed(() => {
    return full.getFull
})

// 切换按钮点击事件
const clickBtn = () => {
    store.setCollapse()
}
const fullBtn = () => {
    full.setFull()
}

</script>
    
<style lang="scss" scoped>
    .icons {
        font-size: 20px;
    }
 
    .avatar {
        width: 50px;
        height: 50px;
        border: 2px solid rgb(255, 255, 255);
        position: absolute; 
        padding: 10px;
        right: 5px; margin: 8px;
        
    }
</style>