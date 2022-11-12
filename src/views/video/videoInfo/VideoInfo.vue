<template>
  <a-form layout="inline">
    <a-form-item label="视频名称">
      <a-input
        enter-button
        placeholder="请输入要查找的视频名称"
        style="width: 240px"
        v-model:value="listParm.vname"
      ></a-input>
    </a-form-item>

    <a-button
      @click="searchBtn"
      type="primary"
      style="margin-right: 5px; width: 80px"
    >
      <template #icon>
        <!-- <close-outlined /> -->
      </template>
      查询
    </a-button>

    <a-button @click="resetBtn" style="margin-right: 5px; width: 80px">
      <template #icon>
        <!-- <close-outlined /> -->
      </template>
      重置
    </a-button>
    <br />
    <a-button
      @click="addBtn"
      type="primary"
      style="margin-right: 5px; width: 80px"
    >
      <template #icon>
        <!-- <plus-outlined /> -->
      </template>
      新增
    </a-button>
  </a-form>
  <a-table
    :scroll="{ y: tableHeight }"
    style="margin-top: 2px"
    bordered
    :pagination="rolePage"
    :dataSource="tableList.list"
    :columns="columns"
  >
    <template v-slot:num="slotProps">
      {{ (rolePage.current - 1) * rolePage.pageSize + slotProps.index + 1 }}
    </template>

    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'vphoto'">
        <a-image :width="120" height="160" :src="record.vphoto" />
      </template>

      <template v-if="column.key == 'id'">
        {{ record.typeName }}
      </template>

      <template v-if="column.key === 'rid'">
        {{ record.region }}
      </template>

      <template v-if="column.key == 'yid'">
        {{ record.videoYear }}
      </template>

      <!-- 操作栏 -->
      <template v-if="column.key === 'action'">
        <a-button
          @click="editBtn(record)"
          style="margin-right: 5px"
          type="primary"
        >
          <template #icon>
            <edit-outlined />
          </template>
          编辑
        </a-button>
        <a-button
          @click="deleteBtn(record)"
          type="danger"
        >
          <template #icon>
            <delete-outlined />
          </template>
          删除
        </a-button>
      </template>
    </template>
  </a-table>

  <add-info ref="addRef" class="btn btn-default" @save="save"></add-info>
</template>
<script setup lang="ts">
import useVideoInfo from "@/composable/videoInfo/useVideoInfo";
import videoInfoTable from "@/composable/videoInfo/videoInfoTable";
import AddInfo from "./AddInfo.vue";

const {
  listParm,
  rolePage,
  columns,
  tableList,
  getList,
  tableHeight,
  searchBtn,
  resetBtn,
} = videoInfoTable();

const { addBtn, editBtn, deleteBtn, addRef, save } = useVideoInfo(getList);
</script>

<style >
tr.ant-table-row > td {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100px;
}
</style>