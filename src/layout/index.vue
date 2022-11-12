<template>
    <a-layout class="layout">
      <a-layout-sider v-model:collapsed="collapsed" :trigger="null" class="asside">
          <menu-bar></menu-bar>
      </a-layout-sider>
      <a-layout>
        <a-layout-header class="header">
          <Header></Header>
        </a-layout-header>
        <a-layout-header class="box">
          <Tabs></Tabs>
        </a-layout-header>
        <a-layout-content class="main">
          <router-view></router-view>
        </a-layout-content>
      </a-layout>
  </a-layout>
</template>
    
<script setup lang='ts'>
import { ref, reactive, computed } from 'vue';
import MenuBar from './Menu/MenuBar.vue';
import Header from './header/Header.vue';
import { collapseStore} from '@/store/collapse';
import Tabs from './tabs/Tabs.vue';

const store = collapseStore()

// collapsed 
const collapsed = computed(() => {
    return store.getCollapse
})

</script>
    
<style scoped lang="scss">


 //修改侧边栏宽度样式
.ant-layout-sider-dark {
      flex: 0 0 220px !important;
      max-width: 220px !important;
      min-width: 220px !important;
      width: 220px !important;
    }
    .ant-layout-sider-collapsed {
      flex: 0 0 80px !important;
      max-width: 80px !important;
      min-width: 80px !important;
      width: 80px !important;
    }

    .layout {
        height: 100%;
        .asside {
            // height: 100%;
            // background: #001529;
            border-right: 5px solid #f0f0f0 !important;
        }
        
        .header {
            height: 50px;
            padding: 0px 20px;
            display: flex;
            justify-content: space-between;
            background-color: #fff; 
            margin: 2px;
            box-shadow: 0 1px 1px 0 rgba(0, 0, 0.4, 0.1), 0 6px 20px 0 rgba(0, 0, 0.6, 0.19);
        }
        .box {
          height: 60px;
          padding: 0px 20px;
          display: flex;
          justify-content: space-between;
          background-color: #fff;
          margin: 2px;
          box-shadow: 0 1px 1px 0 rgba(0, 0, 0.4, 0.1), 0 6px 20px 0 rgba(0, 0, 0.6, 0.19);
          text-align: center;
          white-space: nowrap;
          overflow-x: scroll;
          overflow-y: hidden;
        }
      ::-webkit-scrollbar {
        width: 6px;
        height: 6px;
      }
      ::-webkit-scrollbar-track {
        width: 10px;
        border-radius: 3px;
        background: rgba(138, 73, 73, 0.06);
        -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.08);
      }
      /* 滚动条滑块 */
      ::-webkit-scrollbar-thumb {
        width: 10px;
        border-radius: 3px;
        background: rgb(155, 201, 178);
        -webkit-box-shadow: inset 0 0 10px rgb(62, 163, 112);
      }
      ::-webkit-scrollbar-track-piece {
        background: #fff;
      }
      .section::-webkit-scrollbar {
        width: 10px;
      }
        .main {
            padding:9px !important;
            margin: 2px !important;
            background-color: #fff !important;
            box-shadow: 0 1px 1px 0 rgba(0, 0, 0.4, 0.1), 0 6px 20px 0 rgba(0, 0, 0.6, 0.19);
        }
        
    }
  
</style>