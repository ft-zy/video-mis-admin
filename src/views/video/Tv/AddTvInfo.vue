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
        <a-form  labelAlign="right">
          <a-form-item
              label="电视剧"
              v-bind="validateInfos.tvid"
          >
            <a-select v-model:value="addModel.tvid" show-search placeholder="请选择视频电视剧" style="width: 280px"
                      :options="TvOptions"
                      :filter-option="filterTvOption"
            ></a-select>
          </a-form-item>
          <a-form-item v-bind="validateInfos.count" label="集 数"  >
            <a-input v-model:value="addModel.count"  placeholder="请填写集数" style="width: 280px;"></a-input>
          </a-form-item>
          <a-form-item
              label="上传视频"
              v-bind="validateInfos.url"
          >
            <a-upload
                v-model:file-list="fileList"
                name="file"
                :multiple="true"
                action="http://localhost:8089/zy/api/tv/uploadTvURL"
                @change="UploadTv"
            >
              <a-button type="primary">
                <upload-outlined></upload-outlined>
                选择文件
              </a-button>
            </a-upload>
          </a-form-item>
      </a-form>
    </template>
  </sys-dialog>
</template>

<script setup lang='ts'>
import SysDialog from '@/components/SysDialog.vue'
import {ref} from '@vue/reactivity';
import {useForm} from 'ant-design-vue/lib/form';
import {TypeModel} from '@/api/type/BaseType';
import {EditType, Title} from '@/type/BaseEnum';
import useDialog from '@/hooks/useDialog';
import useInstance from '@/hooks/useInstance';
import TvInfo from "@/composable/tv/TvInfo";
import useTvSelect from "@/composable/tv/useTvSelect";

// 获取全局属性
const { global } = useInstance();

// 弹框属性
const { dialog, onClose, onShow } = useDialog()

const {addModel, rules} = TvInfo()

const { TvOptions, filterTvOption} = useTvSelect()

// 获取表单验证相关的属性
const { validate, validateInfos, resetFields } = useForm(addModel, rules)

const fileList = ref([]);

interface FileItem {
  uid: string;
  name?: string;
  status?: string;
  response?: string;
  url?: string;
}

interface FileInfo {
  file: FileItem;
  fileList: FileItem[];
}

const UploadTv = (info: FileInfo) => {
  if (info.file.status !== 'uploading') {
    console.log(JSON.stringify(info.file.response))
    if (info.file.response != null) {
      addModel.vurl = JSON.parse(JSON.stringify(info.file.response)).data
    }
  }
}

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
  dialog.width = 450
  dialog.height = 250
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