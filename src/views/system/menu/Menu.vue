<template>
    <a-button  @click="addBtn" type="primary">
      <template #icon>
        <plus-outlined />
      </template>
      新增
    </a-button>
    <a-row>
      <a-col :span="4">
          <a-tree
              :height="533"
              :show-line="showLine"
              :tree-data="treeData"
              v-if="treeData && treeData.length > 0"
              :defaultExpandAll="true"
          >
          </a-tree>
     </a-col>
      <a-col :span="20">
        <a-table
        rowKey="mid"
        :expandIcon="expandIcon"
        v-if="tableList.list && tableList.list.length > 0"
        :defaultExpandAllRows="true"
        bordered
        :scroll="{ y: tableHeight }"
        :columns="columns"
        :data-source="tableList.list"
    >
        <template v-slot:num="slotProps" >
            {{(MenuPage.current - 1) * MenuPage.pageSize + slotProps.index + 1}}
        </template>

        <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'type'">
                <a-tag color="red" v-if="record.type== '0'" style="width:50px">目录</a-tag>
                <a-tag color="blue" v-if="record.type == '1'" style="width:50px">菜单</a-tag>
                <a-tag color="green" v-if="record.type == '2'" style="width:50px">按钮</a-tag>
            </template>

            <template v-if="column.key === 'title'">
                <span  v-if="record.type === '0'">
                    <a-tag color="pink"  style="width:80px">
                        {{record.title}}
                    </a-tag>
                </span>
                <span  v-if="record.type === '1'">
                    <a-tag color="blue" style="width:80px" >
                        {{record.title}}
                    </a-tag>
                </span>
              <span  v-if="record.type === '2'">
                    <a-tag color="green" style="width:80px" >
                        {{record.title}}
                    </a-tag>
                </span>
            </template>

            <template v-if="column.key === 'icon'">
                <component :is="record.icon"></component>
            </template>

          <!-- 操作栏 -->
          <template v-if="column.key === 'action'">
            <a-button @click="editBtn(record)" style="margin-right: 15px;" type="primary">
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
      </a-col>
    </a-row>

    <AddMenu ref="addRef" @refresh="refresh"></AddMenu>
</template>

<script setup lang="ts">

import MenuTable from '@/composable/menu/MenuTable';
import useMenu from '@/composable/menu/useMenu';
import userParent from '@/composable/menu/userParent';
import AddMenu from './AddMenu.vue';

const {showLine, treeData} = userParent()

const { listParm, tableList, tableHeight, MenuPage, columns, expandIcon, refresh,  searchBtn, resetBtn,} = MenuTable();

const {addBtn,editBtn,deleteBtn,addRef} = useMenu(refresh)


</script>

<style scoped>
:deep(.iconClass) {
    padding-right: 10px;
    font-size: 20px;
    color: #666;
}
</style>