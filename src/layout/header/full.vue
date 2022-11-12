<template>
    <component @click="fullBtn" v-fullscreen
        :is="isFull  ? FullscreenExitOutlined :  FullscreenOutlined  "
        class="full"
        />
</template>

<script setup lang="ts">
import { FullscreenOutlined, FullscreenExitOutlined } from '@ant-design/icons-vue';
import { ref, reactive, computed } from 'vue'
import { fullStore } from '@/store/collapse'

const full = fullStore();

const isFull = computed(() => {
return full.getFull
})

const fullBtn = () => {
full.setFull()
}
</script>

<style lang="scss" scoped>
    .full {
    font-size: 25px;


}


</style>