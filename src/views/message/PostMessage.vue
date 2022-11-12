<template>
    <a-form layout="inline">
      <a-form-item label="发布标题：">
        <a-input-search enter-button placeholder="请输入查找发布标题"
                        @search="searchBtn"
                        v-model:value="listParm.title"
                        style="width: 240px;"
        ></a-input-search>
      </a-form-item>

    <a-button type="danger" @click="resetBtn" style="margin-right:8px;">
        <template #icon>
            <close-outlined />
        </template>
        重置
    </a-button>
        <a-button type="primary" @click="addBtn" style="margin-right:8px;">
        <template #icon>
            <plus-outlined />
        </template>
        发布
    </a-button>
    </a-form>
    <a-table
        :scroll="{ y: tableHeight }"
        style="margin-top: 2px;"
        bordered
        :pagination="MsgPage"
        :dataSource="tableList.list"
        :columns="columns"
    >
      <template v-slot:num="slotProps" >
        {{(MsgPage.current - 1) * MsgPage.pageSize + slotProps.index + 1}}
      </template>
      <template #bodyCell="{ column, record }">
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

  <AddMessage ref="addRef" class="btn btn-default"  @save="save"></AddMessage>
</template>

<script setup lang='ts'>
import MsgTable from "@/composable/msg/MsgTable";
import AddMessage from "@/views/message/AddMessage.vue";
import UseMsg from "@/composable/msg/UseMsg";


const { tableHeight, tableList, listParm, MsgPage, getList, columns, searchBtn,resetBtn } = MsgTable();

const { addBtn, editBtn, deleteBtn, addRef, save} = UseMsg(getList)

</script>

<style>
tr.ant-table-row > td {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100px;
}
</style>