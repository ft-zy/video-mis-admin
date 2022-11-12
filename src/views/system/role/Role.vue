<template>
     <!-- 搜索栏 -->
     <a-form layout="inline">
      <a-form-item label="角色名称">
        <a-input-search enter-button placeholder="请输入要查找的视频名称"
        @search="searchBtn"
        v-model:value="listParm.roleName"
        style="width: 240px;"
        ></a-input-search>
      </a-form-item>
    <a-button @click="resetBtn" type="danger" style="margin-right:15px;">
        <template #icon>
            <close-outlined />
        </template>
        重置
    </a-button>
    <a-button v-permission="['sys:role:add']" type="primary" @click="addBtn" style="margin-right:15px;">
        <template #icon>
            <plus-outlined />
        </template>
        新增角色
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
        <a-button  @click="assignBtn(record)" style="margin-right: 15px;" t>
          <template #icon>
            <tool-outlined />
          </template>
          分配权限
        </a-button>
        <a-button  @click="deleteBtn(record)" type="danger">
          <template #icon>
            <delete-outlined />
          </template>
          删除
        </a-button>
      </template>
    </template>
    </a-table>
       <!-- 新增、编辑 -->
       <AddRole ref="addRef" @save="save"></AddRole>
       <!-- 分配权限 -->
       <assign-role ref="assignRef"></assign-role>
</template>

<script setup lang="ts">
import roleTable from '@/composable/role/RoleTable';
import useRole from '@/composable/role/useRole';
import AddRole from './AddRole.vue';
import AssignRole from './AssignRole.vue'

//表格
const { listParm, rolePage, columns, tableList, getList, tableHeight, searchBtn, resetBtn } = roleTable()
//教师的新增、编辑
const { addBtn, editBtn, deleteBtn, addRef, save, assignRef, assignBtn } = useRole(getList)
</script>

<style scoped>

</style>