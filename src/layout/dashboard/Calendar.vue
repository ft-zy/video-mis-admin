<template>
  <div style="width: 300px; border: 1px solid #d9d9d9; border-radius: 4px ">
    <a-calendar v-model:value="value" :fullscreen="false" @panelChange="onPanelChange">
      <template #headerRender="{ value: current, type, onChange, onTypeChange }">
        <div style="padding: 10px; ">
          <div style="margin-bottom: 10px; font: 16px  '微软雅黑'" show>
           {{getYear}}年{{getMonth}}月{{getDay}}日星期{{getWeek}}{{ getHours}}点{{ getMinutes}}分{{getSeconds }}秒
          </div>
          <a-row type="flex" justify="space-between">
            <a-col>
              <a-radio-group size="small" :value="type" @change="e => onTypeChange(e.target.value)">
                <a-radio-button value="month">Month</a-radio-button>
                <a-radio-button value="year">Year</a-radio-button>
              </a-radio-group>
            </a-col>
            <a-col>
              <a-select
                  size="small"
                  :dropdown-match-select-width="false"
                  class="my-year-select"
                  :value="String(current.year())"
                  @change="
                  newYear => {
                    onChange(current.year(newYear));
                  }
                "
              >
                <a-select-option
                    v-for="val in getYears(current)"
                    :key="String(val)"
                    class="year-item"
                >
                  {{ val }}
                </a-select-option>
              </a-select>
            </a-col>
            <a-col>
              <a-select
                  size="small"
                  :dropdown-match-select-width="false"
                  :value="String(current.month())"
                  @change="
                  selectedMonth => {
                    onChange(current.month(parseInt(String(selectedMonth), 10)));
                  }
                "
              >
                <a-select-option
                    v-for="(val, index) in getMonths(current)"
                    :key="String(index)"
                    class="month-item"
                >
                  {{ val }}
                </a-select-option>
              </a-select>
            </a-col>
          </a-row>
        </div>
      </template>
    </a-calendar>
  </div>
</template>
<script lang="ts" setup>
import { defineComponent, ref } from 'vue';
import { Dayjs } from 'dayjs';
import "dayjs/plugin/localeData";

    const value = ref<Dayjs>();

    const onPanelChange = (value: Dayjs, mode: string) => {
      console.log(value, mode);
    };

    const getMonths = (value: Dayjs) => {
      const localeData = value.localeData();
      const months = [];
      for (let i = 0; i < 12; i++) {
        months.push(localeData.monthsShort(value.month(i)));
      }
      return months;
    };

    const getYears = (value: Dayjs) => {
      const year = value.year();
      const years = [];
      for (let i = year - 10; i < year + 10; i += 1) {
        years.push(i);
      }
      return years;
    }

const dat = ref(new Date())

//分别获取自己需要的东西，时分秒，年月日等，这里只有时分秒

const getYear = ref(dat.value.getFullYear())

const getMonth = ref(dat.value.getMonth() + 1)

const getDay = ref(dat.value.getDate())
let week;
week = new Array(7);
week[0] = "日";
week[1] = "一";
week[2] = "二";
week[3] = "三";
week[4] = "四";
week[5] = "五";
week[6] = "六";

const getWeek = ref(week[dat.value.getDay()])

const getHours = ref(dat.value.getHours())

const getMinutes = ref(dat.value.getMinutes())

const getSeconds = ref(dat.value.getSeconds())




//最后一个定时器，解决。有个小缺陷，但是我不想改

setInterval(() => {

  //秒

  if (getSeconds.value == 59) {

    getSeconds.value = 0

    //分

    if (getMinutes.value == 59) {

      getMinutes.value = 0

      //时

      if (getHours.value == 23) {

        getHours.value = 0

      } else {

        getHours.value += 1

      }

    } else {

      getMinutes.value += 1

    }

  } else {

    getSeconds.value += 1

  }

}, 1000)




</script>

