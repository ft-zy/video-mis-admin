<template>
  <a-result status="404" title="404" sub-title="Sorry, the page you visited does not exist.">
    <template #extra>
       <a-button type="primary" style="width: 120px;">
            <router-link :to="{ path: '/', replace: true }">回到首页</router-link>
        </a-button>
    </template>
  </a-result>
</template>

