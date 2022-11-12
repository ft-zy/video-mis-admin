<template>
  <sys-drawer
      :title="drawer.title"
      :width="drawer.width"
      :visible="drawer.visible"
      class="custom-class"
      @onClose="onClose"
      @onConfirm="onConfirm"
  >
    <template #Drawer>
      <a-form labelAlign="right">

        <a-form-item v-bind="validateInfos.title"  label="标题">
          <a-input placeholder="请输入标题" v-model:value="addModel.title"></a-input>
        </a-form-item>
        <a-form-item v-bind="validateInfos.date"  label="日期">
          <a-date-picker show-time placeholder="发布日期" @change="openChange"  />
        </a-form-item>
        <span>公告信息：</span>
        <a-form-item v-bind="validateInfos.info">
            <a-textarea :rows="20"  v-model:value="addModel.info" ></a-textarea>
          </a-form-item>
      </a-form>
    </template>
  </sys-drawer>
</template>

<script setup lang="ts">
import useDrawer from "@/hooks/useDrawer";
import SysDrawer from "@/components/SysDrawer.vue";
import {EditType, Title} from "@/type/BaseEnum";
import useForm from "ant-design-vue/es/form/useForm";
import useInstance from "@/hooks/useInstance";
import {MsgModel} from "@/api/msg/MsgType";
import Msg from '@/composable/msg/Msg'
import dayjs, { Dayjs } from 'dayjs';
import {ref} from "vue";

const { drawer, onClose, onShow } = useDrawer()

const { addModel, rules } = Msg()

const { global } = useInstance()

const {validate, resetFields, validateInfos} = useForm(addModel, rules);

const inputDate = ref<Dayjs>()

const openChange = () => {
  addModel.date = dayjs(inputDate.value).format('YYYY-MM-DD HH:mm')
}

const show = (type: string, row: MsgModel)=> {
  drawer.width = 720
  resetFields();
  if (type === EditType.ADD) {
    drawer.title = Title.ADD
  } else {
    drawer.title = Title.EDIT
    //设置页面回显的数据
    global.$objCoppy(row, addModel)
    inputDate.value = dayjs(row.date)
  }
  addModel.type = type;
  onShow();
}

defineExpose({
  show
})

const emit = defineEmits(['save'])

const onConfirm = ()=> {
  validate().then(()=> {
    emit('save', addModel);
    onClose();
  })
}

</script>

<style>

</style>