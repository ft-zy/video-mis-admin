<template>
    <!-- 搜收栏 -->
    <a-form layout="inline">
      <a-form-item label="视频类型">
        <a-input-search enter-button placeholder="请输入要查询的视频类型"
        v-model:value="listParm.typeName" 
        @Search="searchBtn"
        style="width: 240px"
        ></a-input-search>
      </a-form-item>
      <a-button @click="resetBtn()" type="danger" style="margin-right:15px;">
        <template #icon>
          <close-outlined />
        </template>
      重置
      </a-button>
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
    :pagination="rolePage"
    :dataSource="tableList.list"
    :columns="columns"
  >
  <template v-slot:num="slotProps" >
    {{(rolePage.current - 1) * rolePage.pageSize + slotProps.index + 1}}
  </template>
  <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'action'">
        <a-button @click="editBtn(record)" type="primary">
          <template #icon>
            <edit-outlined />
          </template>
          编辑
        </a-button>
        <a-button v-permission="['sys:videoType:delete']"  @click="deleteBtn(record)" style="margin-left: 15px;" type="danger">
          <template #icon>
            <delete-outlined />
          </template>
          删除
        </a-button>
      </template>
    </template>
  </a-table>
    <!-- 新增或编辑弹框 -->
    <add-type @save="save" ref="addRef"></add-type>
</template>
    
<script setup lang='ts'>
import AddType from './AddType.vue'
import { ref, reactive } from 'vue'
import typeTable from '@/composable/videoType/typeTable';
import useType from '@/composable/videoType/useType';

//表格相关的操作
const { rolePage, tableHeight, tableList, listParm, columns, getList} = typeTable()

// 新增、编辑
const {addBtn, editBtn, deleteBtn, save, addRef, searchBtn, resetBtn} = useType(getList, listParm)

</script>
    
<style >
    .ant-form-inline {
      padding: 10px;
    }
    .my-row td {
      background: red;
    }
</style>