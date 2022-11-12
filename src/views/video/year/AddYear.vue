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
          <a-form-item
            v-bind="validateInfos.videoYear"
           
            label="年份"
          >
            <a-date-picker
                placeholder="请选择学年"
                @openChange="openChange"
                style="width:100%;"
                v-model:value="inputYear"
                picker="year"
            />
        </a-form-item>
        </a-form>
    </template>
  </sys-dialog>
</template>

<script setup lang="ts">
import useDialog from '@/hooks/useDialog';
import SysDialog from '@/components/SysDialog.vue';
import useInstance from '@/hooks/useInstance';
import dayjs, { Dayjs } from 'dayjs';
import { YearModel } from '@/api/year/YearType';
import { reactive, ref } from 'vue';
import useForm from 'ant-design-vue/es/form/useForm';
import { EditType, Title } from '@/type/BaseEnum';

const inputYear = ref<Dayjs>()
//获取全局属性
const { global } = useInstance()

const {dialog, onClose, onShow} = useDialog()

const addModel = reactive<YearModel>({
    yid: '',
    num: '',
    videoYear: '',
    type: ''
})

const rules ={
  region: [{
    required: true,
    message: '请选中年份',
    trigger: 'change'
  }]
}

const { validate, resetFields, validateInfos } = useForm(addModel, rules)

//日历事件
const openChange = () => {
    addModel.videoYear = dayjs(inputYear.value).format('YYYY')
}

//显示弹框
const show = (type: string, row: YearModel) => {
    //清空表单
    resetFields()
    //判断是新增还是编辑
    if (type === EditType.ADD) {
        inputYear.value = undefined;
        dialog.title = Title.ADD
    } else {
        dialog.title = Title.EDIT
        //编辑回显，把当前编辑的数据，设置到表单绑定的数据对象addModel里面
        global.$objCoppy(row, addModel)
        //设置回显时间
        inputYear.value = dayjs(row.videoYear)
    }
    //设置编辑的类型
    addModel.type = type;
    //弹框显示
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

<style scoped>

</style>