<template>
  <!-- 搜收栏 -->
  <a-form layout="inline">
    <a-button @click="addBtn" type="primary" style="margin-right:15px;">
      <template #icon>
        <plus-outlined />
      </template>
      新增
    </a-button>
  </a-form>
  <!-- 表格列表 -->
  <a-table
      :scroll="{ y: tableHeight }"
      style="margin-top: 2px;"
      bordered
      :pagination="TVPage"
      :dataSource="tableList.list"
      :columns="columns"
  >
    <template v-slot:num="slotProps" >
      {{(TVPage.current - 1) * TVPage.pageSize + slotProps.index + 1}}
    </template>
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'action'">
        <a-button @click="editBtn(record)" type="primary">
          <template #icon>
            <edit-outlined />
          </template>
          编辑
        </a-button>
        <a-button  @click="deleteBtn(record)" style="margin-left: 15px;" type="danger">
          <template #icon>
            <delete-outlined />
          </template>
          删除
        </a-button>
      </template>
    </template>
  </a-table>
  <!-- 新增或编辑弹框 -->
  <AddTvInfo @save="save" ref="addRef"></AddTvInfo>
</template>

<script setup lang='ts'>
import AddTvInfo from "@/views/video/Tv/AddTvInfo.vue";
import TvInfoTable from "@/composable/tv/TvInfoTable";
import useTvInfo from "@/composable/tv/useTvInfo";

//表格相关的操作
const {
  listParm,
  TVPage,
  columns,
  tableList,
  getList,
  tableHeight,
  searchBtn,
  resetBtn,
} = TvInfoTable()

// 新增、编辑
const {addBtn, editBtn, deleteBtn, save, addRef} = useTvInfo(getList)

</script>

<style >
.ant-form-inline {
  padding: 10px;
}
.my-row td {
  background: red;
}
</style>