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
          <a-form style="margin-right: 15px;">
            <a-row>
              <a-col :span="12">
                <a-form-item  label="姓名" v-bind="validateInfos.aname" has-feedback :labelCol="{ style: 'width:80px;' }" >
                  <a-input  placeholder="请输入用户名" v-model:value="addModel.aname"></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item  label="电话" v-bind="validateInfos.aphone" has-feedback  :labelCol="{ style: 'width:80px;' }" >
                  <a-input  placeholder="请输入电话" v-model:value="addModel.aphone"></a-input>
                </a-form-item>
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="12">
                <a-form-item  label="邮箱" v-bind="validateInfos.aemail" has-feedback :labelCol="{ style: 'width:80px;' }" >
                  <a-input  placeholder="请输入邮箱" v-model:value="addModel.aemail"></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item v-bind="validateInfos.asex"
                  :labelCol="{ style: 'width:80px;' }"
                  label="性别"
              >
                  <a-radio-group v-model:value="addModel.asex">
                      <a-radio :value="'0'">男</a-radio>
                      <a-radio :value="'1'">女</a-radio>
                  </a-radio-group>
                </a-form-item>
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="12">
                <a-form-item label="角色" v-bind="validateInfos.roid" has-feedback :labelCol="{ style: 'width:80px;' }" >
                    <a-select
                        v-model:value="addModel.roid"
                        :disabled="addModel.aid == Aid"
                        show-search
                        placeholder="请选择角色"
                        style="width: 250px"
                        :options="RoleOptions"
                        :filter-option="filterRoleOption"
                    ></a-select>
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item  label="账号" v-bind="validateInfos.account" has-feedback  :labelCol="{ style: 'width:80px;' }" >
                  <a-input  placeholder="请输入账号" v-model:value="addModel.account"></a-input>
                </a-form-item>
              </a-col>
            </a-row>
            <a-row >
              <a-col :span="12">
                <a-form-item v-bind="validateInfos.apassword" :labelCol="{ style: 'width:80px;' }" label="密码">
                        <a-input
                            type="password"
                            placeholder="请输入登录密码"
                            v-model:value="addModel.apassword"
                        ></a-input>
                    </a-form-item>
                </a-col>
              <a-col :span="12">
                <a-form-item  label="头像"  :labelCol="{ style: 'width:80px;' }" >
                  <a-upload
                v-model:file-list="fileList"
                name="file"
                :multiple="true"
                action="http://localhost:8089/zy/api/admin/uploadPortrait"
                @change="Upload"
            >
              <a-button type="primary">
                <upload-outlined></upload-outlined>
                选择文件
              </a-button>
            </a-upload>
                    <!-- <input type="file" class="fileInput" name="upload-file" id="upload-file" @change="uploadPortrait"> -->
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
      </template>
    </sys-dialog>
  </template>
  
<script setup lang="ts">
import useDialog from '@/hooks/useDialog';
import SysDialog from '@/components/SysDialog.vue';
import { EditType, Title } from '@/type/BaseEnum';
import RoleSelect from '@/composable/admin/RoleSelect';
import AdminCheck from '@/composable/admin/AdminCheck';
import { useForm } from 'ant-design-vue/lib/form';
import useInstance from '@/hooks/useInstance';
import { AdminMode } from '@/api/admin/AdminType';
import { message } from 'ant-design-vue';
import { addAdminApi, editAdminApi, getAdminByIdApi } from '@/api/admin/Admin';
import axios from "axios";
import {getAid} from "@/utils/auth";
import {ref} from "vue";

  //获取全局属性
  const { global } = useInstance()
  //弹框属性
  const { dialog, onClose, onShow } = useDialog()

  const { addModel, rules } = AdminCheck()

  const { validate, resetFields, validateInfos } = useForm(addModel, rules)

  const { RoleOptions, filterRoleOption  } = RoleSelect()

  const Aid = getAid();

  var call = Object.prototype.toString.call(addModel.aid);
  console.log(call)
  var call2 = Object.prototype.toString.call(Aid);
  console.log(call2)
  console.log(call == call2 + "*******************************")
  console.log(call === call2 + "*******************************")

const uploadPortrait = function (e: { target: { files: any[]; }; }) {
  const file = e.target.files[0];
  const formData = new FormData();
  formData.append("file", file)
  axios.post(
      'http://localhost:8089/zy/api/admin/uploadPortrait',
      formData,
      {headers: {'Content-Type': 'multipart/form-data'}}
  ).then(function (res) {
    addModel.aportrait = res.data.data;
    console.log(res.data)
  })
}

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

const Upload = (info: FileInfo) => {
  if (info.file.status !== 'uploading') {
    console.log(JSON.stringify(info.file.response))
    if (info.file.response != null) {
      addModel.aportrait = JSON.parse(JSON.stringify(info.file.response)).data
    }
  }
}

  // 弹框的显示
  const show = async(type: string, row: AdminMode)=> {
    dialog.height = 250
    dialog.width = 720
    resetFields();
    if (type === EditType.ADD) {
        dialog.title = Title.ADD
    } else {
        dialog.title = Title.EDIT
        let res = await getAdminByIdApi(row.aid) 
        if (res && res.code == 200) {
          console.log(res.data)
          global.$objCoppy(row, addModel)
        }
    }
    addModel.type = type;
    onShow();
  }
  // 暴露出去外部组件的使用
  defineExpose({
      show
  })

  // 注册事件
  const emit = defineEmits(['save', 'refresh'])

  // 弹框的确定
  const onConfirm = ()=> {
    validate().then(async()=>{
      // emit('save', addModel);
      // onClose();
      let res = null;
        if (addModel.type === EditType.ADD) {
            res = await addAdminApi(addModel);
        } else {
            res = await editAdminApi(addModel);
        }

        if (res && res.code == 200) {
            // 信息提示
            message.success(res.msg);
           emit('refresh')
           onClose()
        }

        if (res && res.code == 666) {
            // 信息提示
            message.error(res.msg);
           emit('refresh')
        }
    })
  }
  </script>

<style>

</style>