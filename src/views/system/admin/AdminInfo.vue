<template>
   <a-form layout="inline">
      <a-form-item label="账号搜索：">
        <a-input-search enter-button placeholder="请输入要查找的账号"
        @search="searchBtn"
        v-model:value="listParm.account"
        style="width: 240px;"
        ></a-input-search>
      </a-form-item>
    <a-button type="danger" @click="resetBtn" style="margin-right:15px;">
        <template #icon>
            <close-outlined />
        </template>
        重置
    </a-button>
        <a-button type="primary" @click="addBtn" style="margin-right:15px;">
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
        :pagination="AdminPage"
        :dataSource="tableList.list"
        :columns="columns"
    >
      <template v-slot:num="slotProps" >
        {{(AdminPage.current - 1) * AdminPage.pageSize + slotProps.index + 1}}
      </template>
      <template #bodyCell="{ column, record }">

      <template v-if="column.key === 'asex'">
        <a-tag color="blue" v-if="record.asex == '0'">男</a-tag>
        <a-tag color="red" v-if="record.asex == '1'">女</a-tag>
      </template>

      <template v-if="column.key === 'roid'">
        {{record.roleName}}
      </template>

      <template v-if="column.key === 'aportrait'">
        <a-image style="width: 90px; height: 128px;"
        :src="record.aportrait"
      />
      </template>

      <!-- 操作栏 -->
      <template v-if="column.key === 'action'">
        <a-button @click="editBtn(record)" style="margin-right: 5px;" type="primary">
          <template #icon>
            <edit-outlined />
          </template>
          编辑
        </a-button>
        <a-button @click="deleteBtn(record)"  type="danger">
          <template #icon>
            <delete-outlined />
          </template>
          删除
        </a-button>
      </template>
    </template>
    </a-table>

     <!-- 新增、编辑 -->
     <AddAdmin ref="addRef" @refresh="refresh"></AddAdmin>
</template>

<script setup lang="ts">

import AdminTable from '@/composable/admin/AdminTable';
import useAdmin from '@/composable/admin/useAdmin';
import AddAdmin from './AddAdmin.vue';

const { tableHeight, tableList, listParm, AdminPage, getList, columns, searchBtn,resetBtn, refresh } = AdminTable();

const { addBtn, editBtn, deleteBtn, addRef } = useAdmin(getList)
</script>

<style scoped>

</style>