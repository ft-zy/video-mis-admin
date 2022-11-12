<template>
     <!-- 搜索栏 -->
     <a-form layout="inline">
      <a-button @click="addBtn" type="primary" style="margin-right:8px;">
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
        :pagination="AnimePage"
        :dataSource="tableList.list"
        :columns="columns"
    >
      <template v-slot:num="slotProps" >
        {{(AnimePage.current - 1) * AnimePage.pageSize + slotProps.index + 1}}
      </template>
    <template #bodyCell="{ column, record }">

      
      <template v-if="column.key == 'aid'">
        {{ record.name }}
      </template>


      <!-- 操作栏 -->
      <template v-if="column.key === 'action'">
        <a-button @click="editBtn(record)" style="margin-right: 5px" type="primary">
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
    <AddAnime ref="addRef" class="btn btn-default"  @save="save" ></AddAnime>

</template>

<script setup lang='ts'>
import AddAnime from "@/views/video/anime/AddAnime.vue";
import useAnime from "@/composable/anime/useAnime";
import AnimeTable from "@/composable/anime/AnimeTable";

const { listParm, AnimePage, columns, tableList, getList, tableHeight, searchBtn, resetBtn} = AnimeTable()

const { addBtn, editBtn, deleteBtn, addRef, save } = useAnime(getList);
</script>

<style>

</style>