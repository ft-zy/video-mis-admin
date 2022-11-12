<template>
  <div>
     <!-- 搜索栏 -->
     <a-form layout="inline">
      <a-form-item label="地区名称">
        <a-input-search enter-button placeholder="请输入要查找的视频名称"
        @search="searchBtn"
        v-model:value="listParm.region"
        style="width: 240px;"
        ></a-input-search>
      </a-form-item>
    <a-button @click="resetBtn" type="danger" style="margin-right:15px;">
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
      <!-- 操作栏 -->
      <template v-if="column.key === 'action'">
        <a-button @click="editBtn(record)" style="margin-right: 15px;" type="primary">
          <template #icon>
            <edit-outlined />
          </template>
          编辑
        </a-button>
        <a-button v-permission="['sys:Region:delete']" @click="deleteBtn(record)" type="danger">
          <template #icon>
            <delete-outlined />
          </template>
          删除
        </a-button>
      </template>
    </template>
    </a-table>

    <!-- 新增、编辑 -->
    <add-region ref="addRef" @save="save"></add-region>
  </div>
   
</template>
    
<script setup lang='ts'>
import useRegion from '@/composable/region/useRegion';
import AddRegion from './AddRegion.vue';
import regionTable from '@/composable/region/regionTable';

//表格
const { listParm, rolePage, columns, tableList, getList, tableHeight, searchBtn, resetBtn } = regionTable()
//教师的新增、编辑
const { addBtn, editBtn, deleteBtn, addRef, save } = useRegion(getList)

</script>
    
<style>
  
</style>