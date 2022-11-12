<template>
  <div style="padding: 10px; background-color: rgb(239, 170, 170)">
    <a-row :gutter="12">
      <a-col>
        <a-card
          hoverable
          style="width: 250px; height: 120px; margin-left: 46px"
        >
          <a-statistic
            title="用户人数"
            :value="10"
            suffix="人"
            :precision="0"
            :value-style="{ color: '#3f8600' }"
          >
            <template #prefix>
              <smile-two-tone />
            </template>
          </a-statistic>
        </a-card>
      </a-col>
      <a-col>
        <a-card
          hoverable
          style="width: 250px; height: 120px; margin-left: 36px"
        >
          <a-statistic
            title="电影"
            :value="6"
            suffix="部"
            :precision="0"
            :value-style="{ color: '#3f8600' }"
          >
            <template #prefix>
              <video-camera-two-tone />
            </template>
          </a-statistic>
        </a-card>
      </a-col>
      <a-col>
        <a-card
          hoverable
          style="width: 250px; height: 120px; margin-left: 36px"
        >
          <a-statistic
            title="电视剧"
            :value="6"
            suffix="部"
            :precision="0"
            :value-style="{ color: '#3f8600' }"
          >
            <template #prefix>
              <video-camera-two-tone />
            </template>
          </a-statistic>
        </a-card>
      </a-col>
      <a-col>
        <a-card
          hoverable
          style="width: 250px; height: 120px; margin-left: 36px"
        >
          <a-statistic
            title="动漫"
            :value="6"
            suffix="部"
            :precision="0"
            :value-style="{ color: '#3f8600' }"
          >
            <template #prefix>
              <video-camera-two-tone />
            </template>
          </a-statistic>
        </a-card>
      </a-col>
    </a-row>
  </div>
  <div style="margin: 5px">
    <a-row>
      <a-col>
        <Calendar></Calendar>
      </a-col>
      <a-col>
        <Statistical></Statistical>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import Calendar from "@/layout/dashboard/Calendar.vue";
import Statistical from "@/layout/dashboard/Statistical.vue";
import {ref} from "vue";

const num = ref()


</script>

<style scoped>
</style>