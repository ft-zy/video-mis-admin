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
        <a-form-item v-bind="validateInfos.netName" label="昵称"  >
          <a-input v-model:value="addModel.netName"  placeholder="请填写昵称" style="width: 280px;"></a-input>
        </a-form-item>
        <a-form-item v-bind="validateInfos.username" label="账号"  >
          <a-input v-model:value="addModel.username"  placeholder="请填写账号" style="width: 280px;"></a-input>
        </a-form-item>
        <a-form-item v-bind="validateInfos.password" label="密码"  >
          <a-input v-model:value="addModel.password" type="password"  placeholder="请填写账号" style="width: 280px;"></a-input>
        </a-form-item>
        <a-form-item v-bind="validateInfos.email" label="邮箱"  >
          <a-input v-model:value="addModel.email"  placeholder="请填写邮箱" style="width: 280px;"></a-input>
        </a-form-item>
        <a-radio-group v-model:value="addModel.state">
          <a-radio :value="'0'">正常</a-radio>
          <a-radio :value="'1'">冻结</a-radio>
        </a-radio-group>
        <a-form-item
            label="上传头像"
        >
          <a-upload
              v-model:file-list="fileList"
              name="file"
              :multiple="true"
              action="http://localhost:8089/zy/api/admin/uploadPortrait"
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
import useInstance from "@/hooks/useInstance";
import {ref} from "vue";
import User from "@/composable/user/User";
import {UserModel} from "@/api/user/UserType";

const { global } = useInstance()
// 弹框属性
const { dialog, onClose, onShow } = useDialog()

const { addModel, rules } = User()

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
      addModel.uportrait = JSON.parse(JSON.stringify(info.file.response)).data
    }
  }
}

const show = (type: string, row: UserModel)=> {
  dialog.width = 420
  dialog.height = 330
  resetFields();
    dialog.title = Title.EDIT
    global.$objCoppy(row, addModel)
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