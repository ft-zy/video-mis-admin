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
          <a-row>
            <a-col :span="12">
                <a-form-item  
                    label="视频名称"  
                    v-bind="validateInfos.vname"
                    :labelCol="{ style: 'width:80px;' }" 
                >
                    <a-input v-model:value="addModel.vname" placeholder="请填写视频名称"></a-input>
                </a-form-item>
                <a-form-item  
                    label="封面"
                    v-bind="validateInfos.vphoto"
                    prop="vphoto"
                    :labelCol="{ style: 'width:80px;' }"
                 >
                  <a-upload
                      v-model:file-list="fileList"
                      name="file"
                      :multiple="true"
                      action="http://localhost:8089/zy/api/video/upload/UploadImgPic"
                      @change="UploadImgPic"
                  >
                    <a-button type="primary">
                      <upload-outlined></upload-outlined>
                      选择文件
                    </a-button>
                  </a-upload>
            </a-form-item>
                <a-form-item  
                    label="视频类型"
                    v-bind="validateInfos.id"
                    :labelCol="{ style: 'width:80px;' }" 
                >
                <a-select
                    v-model:value="addModel.id"
                    show-search
                    placeholder="请选择视频类型"
                    style="width: 260px"
                    :options="TypeOptions"
                    :filter-option="filterTypeOption"
                ></a-select>
                </a-form-item>
                <a-form-item  
                    label="地区"
                    v-bind="validateInfos.rid"
                    :labelCol="{ style: 'width:80px;' }" 
                >
                <a-select
                    v-model:value="addModel.rid"
                    show-search
                    placeholder="请选择地区"
                    style="width: 260px"
                    :options="RegionOptions"
                    :filter-option="filterRegionOption"
                ></a-select>
                </a-form-item>
                <a-form-item  
                    label="视频年份"  
                    v-bind="validateInfos.yid"
                    :labelCol="{ style: 'width:80px;' }" 
                >
                <a-select
                    v-model:value="addModel.yid"
                    show-search
                    placeholder="请选择视频年份"
                    style="width: 260px"
                    :options="YearOptions"
                    :filter-option="filterYearOption"
                ></a-select>
                </a-form-item>
              <a-form-item
                  label="视频上传"
                  v-bind="validateInfos.url"
                  :labelCol="{ style: 'width:80px;' }"
              >
                <a-upload
                    v-model:file-list="fileList2"
                    name="file"
                    :multiple="true"
                    action="http://localhost:8089/zy/api/video/upload/UploadVideoPic"
                    @change="UploadVideoPic"
                >
                  <a-button type="primary">
                    <upload-outlined></upload-outlined>
                    选择文件
                  </a-button>
                </a-upload>
              </a-form-item>
            </a-col>
            <a-col :span="12">
                 <a-card hoverable style="width: 240px;  margin: auto;" >
                    <template #cover>
                        <a-image
                        :width="240"
                        height="300px"
                        alt="视频封面"
                        fallback="https://api.mtyqx.cn/api/random.php"
                        :src="ff"
                        />
                    </template>
                    <a-card-meta title="视频封面" style="height: 15px;">
                    </a-card-meta>
                </a-card>
            </a-col>
          </a-row>
          <span>视频简介：</span>
          <a-form>
            <a-form-item  
                v-bind="validateInfos.vinfo" 
            >
                <a-textarea :rows="8"  v-model:value="addModel.vinfo" ></a-textarea>
            </a-form-item>
          </a-form>
          <d/>
        </a-form>
    </template>
  </sys-drawer>
</template>

<script setup lang="ts">
import useInstance from "@/hooks/useInstance";
import { EditType, Title } from '@/type/BaseEnum';
import SysDrawer from "@/components/SysDrawer.vue";
import useDrawer from "@/hooks/useDrawer";
import useForm from 'ant-design-vue/es/form/useForm';
import video from '@/composable/videoInfo/video'
import {file, ListParm, VideoModel} from "@/api/video/VideoType";
import useSelect from "@/composable/videoInfo/useSelect"
import axios from "axios";
import {ref} from "vue";
import {message, UploadProps} from "ant-design-vue";

const { addModel, rules } = video();

const { global } = useInstance()

const { drawer, onClose, onShow } = useDrawer()

const {TypeOptions, filterTypeOption, RegionOptions, filterRegionOption, YearOptions, filterYearOption } = useSelect()

const { validate, resetFields, validateInfos } = useForm(addModel, rules)

const list = ref()

const fileList = ref([]);
const fileList2 = ref([]);

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

interface FileInfo2 {
  file: FileItem;
  fileList: FileItem[];
}


const ff = ref()

const UploadImgPic = (info: FileInfo) => {
  if (info.file.status !== 'uploading') {
    console.log(JSON.stringify(info.file.response))
    if (info.file.response != null) {
      addModel.vphoto = JSON.parse(JSON.stringify(info.file.response)).data
      ff.value =  JSON.parse(JSON.stringify(info.file.response)).data
    }
  }
}

const UploadVideoPic = (info: FileInfo2) => {
  if (info.file.status !== 'uploading') {
    console.log(JSON.stringify(info.file.response))
    if (info.file.response != null) {
      addModel.vurl = JSON.parse(JSON.stringify(info.file.response)).data
    }
  }
}

// const UploadImgPic = function (e: { target: { files: any[]; }; }) {
//     const file = e.target.files[0];
//     const formData = new FormData();
//     formData.append("file", file)
//     axios.post(
//         'http://localhost:8089/zy/api/video/upload/UploadImgPic',
//         formData,
//         {headers: {'Content-Type': 'multipart/form-data'}}
//     ).then(function (res) {
//         addModel.vphoto = res.data.data;
//         console.log(res.data)
//     })
// }

// const UploadVideoPic = function (e: { target: { files: any[]; }; }) {
//     const file = e.target.files[0];
//     const formData = new FormData();
//     formData.append("file", file)
//     axios.post(
//         'http://localhost:8089/zy/api/video/upload/UploadVideoPic',
//         formData,
//         {headers: {'Content-Type': 'multipart/form-data'}}
//     ).then(function (res) {
//         addModel.vurl = res.data.data
//         console.log(res.data)
//     })
// }

const show = (type: string, row: VideoModel)=> {
    resetFields();
    if (type === EditType.ADD) {
        drawer.title = Title.ADD
    } else {
        drawer.title = Title.EDIT
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

const onConfirm = ()=> {
    validate().then(()=>{
    emit('save', addModel);
    onClose();
  })   
}

</script>

<style  lang='scss'>
.ql-container {
    height: 200px;
}
.fileInputContainer{
  position:relative;
  //width: 256px;
}
.fileInput{
  height:256px;
  overflow: hidden;
  font-size: 300px;
  position:absolute;
  right:0;
  top:0;
  opacity: 0;
  filter:alpha(opacity=0);
  cursor:pointer;
}

</style>