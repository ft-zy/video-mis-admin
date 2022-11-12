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
                label="电视剧名"
                v-bind="validateInfos.name"
                :labelCol="{ style: 'width:80px;' }"
            >
              <a-input v-model:value="addModel.name" style="width: 260px" placeholder="请填写电视剧名"></a-input>
            </a-form-item>
            <a-form-item
                label="电视剧封面"
                v-bind="validateInfos.url"
                :labelCol="{ style: 'width:80px;' }"
            >
              <a-upload
                  v-model:file-list="fileList"
                  name="file"
                  :multiple="true"
                  action="http://localhost:8089/zy/api/tv_name/uploadTvCover"
                  @change="UploadTvCover"
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
          </a-col>
          <a-col :span="12">
            <a-card hoverable style="width: 168px;  margin: auto;" >
              <template #cover>
                <a-image
                    :width="188"
                    height="260px"
                    alt="视频封面"
                    src="https://api.mtyqx.cn/api/random.php"
                />
              </template>
            </a-card>
          </a-col>
        </a-row>
        <span>视频简介：</span>
        <a-form>
          <a-form-item v-bind="validateInfos.info">
            <a-textarea :rows="8"  v-model:value="addModel.info" ></a-textarea>
          </a-form-item>
        </a-form>
      </a-form>
    </template>
  </sys-drawer>
</template>

<script setup lang="ts">
import useDrawer from "@/hooks/useDrawer";
import SysDrawer from "@/components/SysDrawer.vue";
import {EditType, Title} from "@/type/BaseEnum";
import useForm from "ant-design-vue/es/form/useForm";
import TvName from "@/composable/tv_name/TvName";
import useSelect from "@/composable/videoInfo/useSelect";
import useInstance from "@/hooks/useInstance";
import axios from "axios";
import {ref} from "vue";
import {TvNameModel} from "@/api/tv_name/TvNameType";

const { drawer, onClose, onShow } = useDrawer()

const { addModel, rules } = TvName()

const { global } = useInstance()

const {validate, resetFields, validateInfos} = useForm(addModel, rules);

const {TypeOptions, filterTypeOption, RegionOptions, filterRegionOption, YearOptions, filterYearOption } = useSelect()


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

const UploadTvCover = (info: FileInfo) => {
  if (info.file.status !== 'uploading') {
    console.log(JSON.stringify(info.file.response))
    if (info.file.response != null) {
      addModel.cover = JSON.parse(JSON.stringify(info.file.response)).data
    }
  }
}

const show = (type: string, row: TvNameModel)=> {
  drawer.width = 720
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

const emit = defineEmits(['save'])

const onConfirm = ()=> {
  validate().then(()=> {
    emit('save', addModel);
    onClose();
  })
}

</script>

<style>

</style>