<script lang="ts">
import { defineComponent, ref } from 'vue';
import { Dayjs } from 'dayjs';

export default defineComponent({
  setup() {
    const value = ref<Dayjs>();
    const onPanelChange = (value: Dayjs, mode: string) => {
      console.log(value, mode);
    };

    return {
      value,
      onPanelChange,
    };
  },
});
</script>

<template>
  <div :style="{ width: '300px', border: '1px solid #d9d9d9', borderRadius: '4px' }">
    <a-calendar v-model:value="value" :fullscreen="false" @panelChange="onPanelChange" />
  </div>
</template>

<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
