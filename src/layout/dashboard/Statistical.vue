<template>
  <div id="char" style="width: 900px; height: 400px"></div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts';
import {ref, onMounted, watch} from 'vue'
// Echarts 为init（dom元素后的类型）
// EChartsOption 为 option 的类型
import {ECharts, EChartsOption, init} from 'echarts';

onMounted(() => {
  const charEle = document.getElementById('char') as HTMLElement;
  console.log()
  const charEch: ECharts = init(charEle);
  const option: EChartsOption = {
    xAxis: {
      type: 'category',
      data: ['电影','电视剧','动漫']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [6,6,6],
        color: "#91e0ba",
        type: 'bar'
      },

    ]
  };
  charEch.setOption(option);
});
</script>

<style scoped lang="scss">
.chart {
  width: 100%;
  height: 100%;
}
</style>