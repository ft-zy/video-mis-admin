<template>
  <a-form layout="inline">
    <a-form-item label="账号查询：">
      <a-input-search enter-button placeholder="请输入用户的账号进行查询"
                      @search="searchBtn"
                      v-model:value="listParm.username"
                      style="width: 240px;"
      ></a-input-search>
    </a-form-item>

    <a-button type="danger" @click="resetBtn" style="margin-right:8px;">
      <template #icon>
        <close-outlined />
      </template>
      重置
    </a-button>
  </a-form>
  <a-table
      :scroll="{ y: tableHeight }"
      style="margin-top: 2px;"
      bordered
      :pagination="UserPage"
      :dataSource="tableList.list"
      :columns="columns"
  >
    <template v-slot:num="slotProps" >
      {{(UserPage.current - 1) * UserPage.pageSize + slotProps.index + 1}}
    </template>
    <template #bodyCell="{ column, record }">

      <template v-if="column.key === 'uportrait'">
        <a-image :width="120" height="160" :src="record.uportrait" />
      </template>

      <template v-if="column.key === 'state'">
        <a-tag color="blue" v-if="record.state == '0'">正常</a-tag>
        <a-tag color="red" v-if="record.state == '1'">冻结</a-tag>
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

  <AddUser ref="addRef" class="btn btn-default"  @save="save"></AddUser>
</template>

<script setup lang='ts'>
import MsgTable from "@/composable/msg/MsgTable";
import AddMessage from "@/views/message/AddMessage.vue";
import UseMsg from "@/composable/msg/UseMsg";
import useUser from "@/composable/user/useUser";
import userTable from "@/composable/user/UserTable";
import AddUser from "@/views/monitoring/AddUser.vue";


const { tableHeight, tableList, listParm, UserPage, getList, columns, searchBtn,resetBtn } = userTable();

const { editBtn, deleteBtn, addRef, save} = useUser(getList)

</script>

<style>
tr.ant-table-row > td {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100px;
}
</style>