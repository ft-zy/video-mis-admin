<template>
    <a-dropdown placement="bottomLeft" style="height:10px;">
        <div >
            <a class="ant-dropdown-link" @click.prevent>
                <a-avatar shape="square" class="avatar" :src="portrait">
              </a-avatar>
<!--              <img :src="portrait">-->
            </a>
            <a-tag  color="purple" style="width:80px; height:30px; text-align: center; line-height: 25px; margin-left: 5px;"
            >
              <span v-if="roId === '1' ">超级管理员</span>
              <span v-if="roId !== '1' ">系统管理员</span>
            </a-tag>
        </div>
 
    <template #overlay>
      <a-menu @click="onClick">
        <a-menu >
        <!-- <a-menu-item key="1">账号信息</a-menu-item>
        <a-menu-item key="2" @click="">修改密码</a-menu-item> -->
        <a-menu-item key="3" @click="Login_out">退出登录</a-menu-item>
      </a-menu>
      </a-menu>
    </template>
    </a-dropdown>
</template>

<script setup lang="ts">
import {tabsStore} from '@/store/tabs';
import {clearSession, getAid, getAportrait, getRoId} from '@/utils/auth';
import {reactive} from '@vue/runtime-core';
import {useRouter} from 'vue-router';
import {ref} from "vue";

const aid = getAid()

const roId = getRoId()

const store = tabsStore()

const portrait = getAportrait()

const admin = ref()

const router = useRouter()


const Login_out = ()=> {
    router.push({ name: 'login' })
    clearSession()
    store.tabsList = []
}

</script>
<style scoped lang='scss'>
.avatar {
    width: 45px;
    height: 45px;
    border: 1px solid rgb(202, 202, 126);
    margin-bottom: 3px;
}

.ant-dropdown-menu-light {
    width: 100px;  
    margin-bottom: 10px; 
    .ant-menu-light {
        width: 100px;
        text-align: center;
    }
}



</style>