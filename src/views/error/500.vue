<template>
  <a-result status="500" title="500" sub-title="Sorry, the server is wrong.">
    <template #extra>
       <a-button type="primary" style="width: 120px;">
            <router-link :to="{ path: '/', replace: true }">回到首页</router-link>
        </a-button>
    </template>
  </a-result>
</template>