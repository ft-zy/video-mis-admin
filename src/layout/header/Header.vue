<template>
  <div class="header-bg">
    <div class="leftHeader">
      <Collapse></Collapse>
      <Bred></Bred>
    </div>
    <div style="margin-left: auto; padding: 10px; line-height: 10px;">
        <full></full>
    </div>
    <div >
      <Right-menu></Right-menu>
    </div>
  </div>
</template>
    
<script setup lang='ts'>
import { ref, reactive } from 'vue'
import Collapse from './Collapse.vue'
import Bred from './Bred.vue'
import RightMenu from './RightMenu.vue'
import Full from './full.vue'
</script>
    
<style lang="scss" scoped>
   .header-bg {
    color: rgb(0, 0, 0);
    display: flex;
    flex-grow: 2;
    align-items: center;
    justify-content: space-between;
    .leftHeader{
        display: flex;
    }
}
</style>