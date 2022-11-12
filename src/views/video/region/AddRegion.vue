<template>
  <sys-dialog
    :title="dialog.title"
    :width="dialog.width"
    :height="dialog.height"
    :visible="dialog.visible"
    @onClose="onClose"
    @onConfirm="onConfirm"
  >
    <template #content>
        <a-form labelAlign="right">
          <a-form-item v-bind="validateInfos.region" label="地区名称"  >
            <a-input v-model:value="addModel.region"  placeholder="请填写地区名称"></a-input>
          </a-form-item>
        </a-form>
    </template>
  </sys-dialog>
</template>

<script setup lang="ts">
import useDialog from '@/hooks/useDialog';
import SysDialog from '@/components/SysDialog.vue';
import { EditType, Title } from '@/type/BaseEnum';
import { RegionModel } from '@/api/region/RegionType'
import { reactive } from '@vue/reactivity';
import useForm from 'ant-design-vue/es/form/useForm';
import useInstance from '@/hooks/useInstance';
//获取全局属性
const { global } = useInstance()
//弹框属性
const { dialog, onClose, onShow } = useDialog()

// 定义表单数据对象
const addModel = reactive<RegionModel>({
  rid: '',
  num: '',
  region: '',
  type: ''
})

// 表单验证规则
const rules ={
  region: [{
    required: true,
    message: '请填写地区名称',
    trigger: 'change'
  }]
}

// 获取表单相关的属性
const { validate, resetFields, validateInfos } = useForm(addModel, rules)

// 弹框的显示
const show = (type: string,row: RegionModel)=> {
  // 清空表单
  resetFields();
    if (type === EditType.ADD) {
        dialog.title = Title.ADD
    } else {
        dialog.title = Title.EDIT
        //设置页面回显的数据
        global.$objCoppy(row, addModel)
    }
    addModel.type = type;
    onShow();
}

// 暴露出去外部组件的使用
defineExpose({
    show
})

// 注册事件
const emit = defineEmits(['save'])

// 弹框的确定
const onConfirm = ()=> {
  validate().then(()=>{
    emit('save', addModel);
    onClose();
  })
}

</script>

<style>

</style>