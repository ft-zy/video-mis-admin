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
            <a-form >
              <a-form-item v-bind="validateInfos.typeName"
               label="类型名称">
                <a-input placeholder="请填写视频类型"  v-model:value="addModel.typeName"></a-input>
              </a-form-item>
            </a-form>
        </template>
    </sys-dialog>
</template>
    
<script setup lang='ts'>
import SysDialog from '@/components/SysDialog.vue'
import { ref, reactive } from '@vue/reactivity';
import { useForm } from 'ant-design-vue/lib/form';
import { TypeModel } from '@/api/type/BaseType';
import { EditType,Title } from '@/type/BaseEnum';
import useDialog from '@/hooks/useDialog';
import useInstance from '@/hooks/useInstance';

// 获取全局属性
const { global } = useInstance();

// 弹框属性
const { dialog, onClose, onShow } = useDialog()

// 表单绑定的数据
const addModel = reactive<TypeModel>({
    id: '',
    num: '',
    typeName: '',
    type: ''
})

// 表单验证’
const rules = reactive({
    typeName: [{
        required: true,
        message: '请填写视频类型',
        trigger: 'change'
    }]
})

// 获取表单验证相关的属性
const { validate, validateInfos, resetFields } = useForm(addModel, rules) 

// 注册事件
const emits = defineEmits(['save'])

// 弹框的确定事件
const onConfirm = ()=> {
    validate().then(async ()=>{
        emits('save', addModel)
        onClose();
    })
}


// 显示弹框
const show = (type: string, row: TypeModel)=> {
    resetFields()
    // 判断市新增还是编辑
    if (type === EditType.ADD) {
        dialog.title = Title.ADD
    } else {
        dialog.title = Title.EDIT
        global.$objCoppy(row, addModel)
    }
    // 设置编辑的属性
    addModel.type = type;
    // 清空表单
    dialog.visible = true
}

// 暴露方法给外部使用
defineExpose ({
    show
})
</script>
    
<style scoped lang='scss'>
</style>