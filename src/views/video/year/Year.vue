<template>
   <a-form layout="inline">
     <a-form-item label="年份">
        <a-input-search enter-button placeholder="请输入要查询的年份"
        v-model:value="listParm.videoYear"
        @Search="searchBtn"
        style="width: 240px"
        />
     </a-form-item>
     <a-button @click="resetBtn" type="danger" style="margin-right: 15px">
      <template #icon>
        <close-outlined />
      </template>
      重置
     </a-button>
     <a-button @click="addBtn" type="primary" style="margin-right:15px">
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
        <a-button  v-permission="['sys:Year:delete']" @click="deleteBtn(record)" type="danger">
          <template #icon>
            <delete-outlined />
          </template>
          删除
        </a-button>
      </template>
    </template>
    </a-table>

   <add-year ref="addRef" @save="save"></add-year>
</template>

<script setup lang="ts">
import useYear from '@/composable/year/useYear';
import AddYear from './AddYear.vue';
import yearTable from '@/composable/year/yearTable';
//表格
const { listParm, rolePage, columns, tableList, getList, tableHeight, searchBtn, resetBtn } = yearTable()
//教师的新增、编辑
const { addBtn, editBtn, deleteBtn, addRef, save } = useYear(getList)

</script>

<style scoped>

</style>