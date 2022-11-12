<template>
  <a-row type="flex">
    <a-col :span="4">上传文件：</a-col>
    <a-col style="color:#F64545">
      <a-upload
          v-model:file-list="fileList"
          name="file"
          list-type="picture"
          :multiple="true"
          action="http://localhost:8089/zy/api/video/upload/UploadImgPic"
          @change="handleChange"
      >
        <a-button type="primary">
          <upload-outlined></upload-outlined>
          选择文件
        </a-button>
      </a-upload>
    </a-col>
  </a-row>
</template>
<script setup lang="ts">
import { UploadOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import { defineComponent, ref } from 'vue';
import type { UploadProps } from 'ant-design-vue';

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

const list = ref()

const fileList = ref([]);

const handleChange = (info: FileInfo) => {
  console.log()
  if (info.file.status !== 'uploading') {
    console.log(JSON.parse(JSON.stringify(info.file.response)).data)
    list.value = info.file.response
  }
  if (info.file.status === 'done') {
    message.success(`${info.file.name} 上传成功`);
  } else if (info.file.status === 'error') {
    message.error(`${info.file.name} 上传失败`);
  }
}

</script>

