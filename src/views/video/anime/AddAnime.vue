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
            label="动漫"
            v-bind="validateInfos.aid"
        >
          <a-select v-model:value="addModel.aid" show-search placeholder="请选择视频年份" style="width: 280px"
              :options="AnimeOptions"
              :filter-option="filterAnimeOption"
          ></a-select>
        </a-form-item>
        <a-form-item v-bind="validateInfos.count" label="集数"  >
          <a-input v-model:value="addModel.count"  placeholder="请填写集数" style="width: 280px;"></a-input>
        </a-form-item>
        <a-form-item
            label="上传动漫"
            v-bind="validateInfos.vurl"
        >
          <a-upload
              v-model:file-list="fileList"
              name="file"
              :multiple="true"
              action="http://localhost:8089/zy/api/anime/uploadAnimeURL"
              @change="UploadAnime"
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

<script setup lang="ts">
import SysDialog from '@/components/SysDialog.vue';
import useDialog from "@/hooks/useDialog";
import {EditType, Title} from "@/type/BaseEnum";
import useForm from "ant-design-vue/es/form/useForm";
import Anime from "@/composable/anime/Anime";
import useInstance from "@/hooks/useInstance";
import {AdminMode} from "@/api/admin/AdminType";
import useAnimeSelect from "@/composable/anime/useAnimeSelect";
import {ref} from "vue";

const { global } = useInstance()
// 弹框属性
const { dialog, onClose, onShow } = useDialog()

const { addModel, rules } = Anime()

const {  AnimeOptions, filterAnimeOption } = useAnimeSelect()

const { validate, resetFields, validateInfos } = useForm(addModel, rules)

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

const UploadAnime = (info: FileInfo) => {
  if (info.file.status !== 'uploading') {
    console.log(JSON.stringify(info.file.response))
    if (info.file.response != null) {
      addModel.vurl = JSON.parse(JSON.stringify(info.file.response)).data
    }
  }
}

const show = (type: string, row: AdminMode)=> {
  dialog.width = 450
  dialog.height = 300
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