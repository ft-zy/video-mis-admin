<template>
    <!-- 搜索栏 -->
    <a-form layout="inline">
      <a-form-item label="视频名称">
      <a-input
          enter-button
          placeholder="请输入要查找的视频名称"
          style="width: 240px"
          v-model:value="listParm.name"
      ></a-input>
      </a-form-item>

      <a-button @click="searchBtn" type="primary" style="margin-right:8px; width: 80px">
        <template #icon>
          <search-outlined />
        </template>
        查询
      </a-button>
      <a-button @click="resetBtn" type="danger" style="margin-right:8px;">
        <template #icon>
          <close-outlined />
        </template>
        重置
      </a-button>
      <a-button @click="addBtn" type="primary" style="margin-right:8px;">
        <template #icon>
          <plus-outlined />
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
        <template v-if="column.key === 'cover'">
          <a-image :width="120" height="160" :src="record.cover" />
        </template>

        <!-- 操作栏 -->
        <template v-if="column.key === 'action'">
          <a-button  @click="editBtn(record)" style="margin-right: 5px" type="primary">
            <template #icon>
              <edit-outlined />
            </template>
            编辑
          </a-button>
          <a-button @click="deleteBtn(record)" type="danger">
            <template #icon>
              <delete-outlined />
            </template>
            删除
          </a-button>
        </template>
      </template>
    </a-table>

    <!-- 新增、编辑 -->
    <AddAnimeName ref="addRef" class="btn btn-default"  @save="save"></AddAnimeName>

</template>

<script setup lang="ts">
import AddAnimeName from "@/views/video/anime_name/AddAnimeName.vue";
import useAnimeName from "@/composable/anime_name/useAnimeName";
import AnimeNameTable from "@/composable/anime_name/AnimeNameTable";

const {
  listParm,
  rolePage,
  columns,
  tableList,
  getList,
  tableHeight,
  searchBtn,
  resetBtn,
} = AnimeNameTable()

const { addBtn, editBtn, deleteBtn, addRef, save } = useAnimeName(getList);

</script>

<style>
tr.ant-table-row > td {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100px;
}
</style>