<!--<template>-->
<!--  <div class="d">-->

<!--    <menu-logo></menu-logo>-->
<!--      <a-menu-->
<!--        v-model:openKeys="menuData.openKeys"-->
<!--        v-model:selectedKeys="menuData.selectedKeys"-->
<!--        mode="inline"-->
<!--        theme="light"-->
<!--        @openChange="onOpenChange"-->
<!--    >-->
<!--      <a-menu-item key="/dashboard">-->
<!--        <template #icon>-->
<!--            <DashboardOutlined />-->
<!--        </template>-->
<!--        <router-link to="/">首页</router-link>-->
<!--      </a-menu-item>-->
<!--      <a-sub-menu key="/monitoring">-->
<!--        <template #icon>-->
<!--          <desktop-outlined/>-->
<!--        </template>-->
<!--        <template #title>系统监控</template>-->
<!--        <a-menu-item key="/user" index="/user">-->
<!--            <template #icon>-->
<!--                <user-outlined />-->
<!--            </template>-->
<!--            <router-link to="/user" >用户列表</router-link>-->
<!--        </a-menu-item>-->
<!--        <a-menu-item key="/log" index="/log">-->
<!--          <router-link to="/log">日志管理</router-link>-->
<!--        </a-menu-item>-->
<!--        <a-menu-item>-->
<!--          <a href="http://localhost:8089/zy/doc.html"  target="_blank">Swagger接口</a>-->
<!--          </a-menu-item>-->
<!--      </a-sub-menu>-->
<!--      <a-sub-menu key="/system">-->
<!--        <template #icon>-->
<!--          <SettingOutlined />-->
<!--        </template>-->
<!--        <template #title>系统管理</template>-->
<!--        <a-menu-item key="/role">-->
<!--          <router-link to="/role" index="/role">角色管理</router-link>-->
<!--          </a-menu-item>-->
<!--          <a-menu-item key="/menu">-->
<!--          <router-link to="/menu" index="/menu">菜单管理</router-link>-->
<!--          </a-menu-item>-->
<!--        <a-menu-item key="/adminInfo">-->
<!--          <router-link to="/adminInfo" index="/userList">管理员管理</router-link>-->
<!--        </a-menu-item>-->
<!--      </a-sub-menu>-->
<!--      <a-sub-menu key="/video">-->
<!--        <template #icon>-->
<!--          <VideoCameraOutlined />-->
<!--        </template>-->
<!--        <template #title>视频管理</template>-->
<!--        <a-menu-item key="/videoInfo">-->
<!--          <router-link to="/videoInfo" index="/videoInfo">视频信息管理</router-link>-->
<!--        </a-menu-item>-->
<!--        <a-menu-item key="/videoType">-->
<!--          <router-link to="/videoType" index="/videoType">视频分类管理</router-link>-->
<!--        </a-menu-item>-->
<!--        <a-menu-item key="/Region">-->
<!--          <router-link to="/Region" index="/Region">视频地区管理</router-link>-->
<!--        </a-menu-item>-->
<!--         <a-menu-item key="/Year">-->
<!--          <router-link to="/Year" index="/Year">视频年份管理</router-link>-->
<!--        </a-menu-item>-->
<!--      </a-sub-menu>-->
<!--      <a-sub-menu key="/error">-->
<!--        <template #icon>-->
<!--            <file-exclamation-outlined />-->
<!--        </template>-->
<!--        <template #title>错误信息模块</template>-->
<!--        <a-menu-item key="/404">-->
<!--          <router-link to="/404" index="/404">404页面</router-link>-->
<!--        </a-menu-item>-->
<!--        <a-menu-item key="/500">-->
<!--          <router-link to="/500" index="/500">500页面</router-link>-->
<!--        </a-menu-item>-->
<!--      </a-sub-menu>-->
<!--      <a-sub-menu key="/message">-->
<!--        <template #icon>-->
<!--            <AppstoreOutlined />-->
<!--        </template>-->
<!--        <template #title>信息模块</template>-->
<!--        <a-menu-item key="/postMessage">  -->
<!--          <router-link to="/postMessage" index="/postMessage">发布公告信息</router-link>-->
<!--        </a-menu-item>-->
<!--      </a-sub-menu>-->
<!--    </a-menu>-->
<!--  </div>-->
<!--    -->
<!--</template>-->
<!--<script setup lang='ts'>-->
<!--import { useRoute } from 'vue-router';-->
<!--import MenuLogo from './MenuLogo.vue';-->
<!--import { ref, reactive, onMounted, watch } from 'vue'-->
<!--import { routes } from '@/router'-->
<!--import { MenuTheme } from 'ant-design-vue';-->
<!--import Header from '../header/Header.vue';-->
<!--//当前路由-->
<!--const route = useRoute()-->
<!--const menuData = reactive({-->
<!--    //相当于当前路由的path-->
<!--    selectedKeys: [''],-->
<!--    openKeys: [''],-->
<!--    theme: 'dark' as MenuTheme,-->
<!--})-->
<!--//设置当前选中的菜单-->
<!--const selectkey = () => {-->
<!--    menuData.selectedKeys.push(route.path)-->
<!--}-->

<!--//路由发生变化的时候-->
<!--watch(() => route.path, () => {-->
<!--    //清空原来的数据-->
<!--    menuData.selectedKeys = [''];-->
<!--    selectkey()-->
<!--    setMenuOpen(routes)-->
<!--})-->
<!--onMounted(() => {-->
<!--    selectkey()-->
<!--    setMenuOpen(routes)-->
<!--})-->

<!--//解决刷新之后，有下级的菜单，需要展开-->
<!--const setMenuOpen = (result: any) => {-->
<!--    for (let i = 0; i < result.length; i++) {-->
<!--        if (result[i].children) {-->
<!--            for (let y = 0; y < result[i].children.length; y++) {-->
<!--                if (result[i].children[y].path === route.path) {-->
<!--                    menuData.openKeys = [result[i].path]-->
<!--                }-->
<!--            }-->
<!--        }-->
<!--    }-->
<!--}-->

<!--//解决一次只能展开一个菜单的问题-->
<!--const onOpenChange = (openKeys: string[]) =>{-->
<!--    console.log(openKeys)-->
<!--    if(openKeys.length !== 0){-->
<!--        menuData.openKeys = [openKeys[1]]-->
<!--    }else{-->
<!--        menuData.openKeys = ['']-->
<!--    }-->
<!--}-->
<!--</script>-->

<!--<style scoped>-->
<!--    .d {-->
<!--      height: 100%;-->
<!--      flex: auto;-->
<!--      background-color: #ffff;-->
<!--    }-->
<!--</style>-->
