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
          <a-form labelAlign="right" >
            <a-form-item v-bind="validateInfos.roleName" label="角色名称" name="roleName"  :labelCol="{ style: 'width:80px;' }" >
              <a-input v-model:value="addModel.roleName" placeholder="请填写角色名称"></a-input>
            </a-form-item>
          </a-form>
          <a-form labelAlign="right">
            <a-form-item v-bind="validateInfos.roleDescribe" label="角色描述"  :labelCol="{ style: 'width:80px;' }" >
              <a-input v-model:value="addModel.roleDescribe" placeholder="请填写角色描述"></a-input>
            </a-form-item>
          </a-form>
      </template>
    </sys-dialog>
  </template>
  
  <script setup lang="ts">
  import useDialog from '@/hooks/useDialog';
  import SysDialog from '@/components/SysDialog.vue';
  import { EditType, Title } from '@/type/BaseEnum';
  import { reactive } from '@vue/reactivity';
  import useForm from 'ant-design-vue/es/form/useForm';
  import useInstance from '@/hooks/useInstance';
  import { RoleModel } from '@/api/role/RoleType';
  //获取全局属性
  const { global } = useInstance()
  //弹框属性
  const { dialog, onClose, onShow } = useDialog()
  
  // 定义表单数据对象
  const addModel = reactive<RoleModel>({
    roId: '',
    roleName: '',
    roleDescribe: '',
    num: '',
    type: ''
  })
  
  // 表单验证规则
  const rules ={
    roleName: [{
      required: true,
      message: '请填写角色',
      trigger: 'change'
    }],
    roleDescribe: [{
      required: true,
      message: '请填写角色描述',
      trigger: 'change'
    }]
  }
  
  // 获取表单相关的属性
  const { validate, resetFields, validateInfos } = useForm(addModel, rules)
  
  const show = (type: string,row: RoleModel)=> {
    dialog.height = 120
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