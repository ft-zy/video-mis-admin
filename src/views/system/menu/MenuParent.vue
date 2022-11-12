<template>
    <sys-dialog
        :title="dialog.title"
        :width="dialog.width"
        :height="dialog.height"
        :visible="dialog.visible"
        @onClose="onClose"
        @onConfirm="confirm"
    >
        <template #content>
            <a-tree
                :show-line="showLine"
                :tree-data="treeData"
                :fieldNames="fieldNames"
                @select="onSelect"
                v-if="treeData && treeData.length > 0"
                :defaultExpandAll="true"
            ></a-tree>
        </template>
    </sys-dialog>
</template>

<script setup lang="ts">
import SysDialog from '@/components/SysDialog.vue';
import useDialog from '@/hooks/useDialog';
import userParent from '@/composable/menu/userParent';
import { message } from 'ant-design-vue';

const {showLine, treeData, fieldNames, onSelect, selectNode, getTreeData} = userParent()

const {dialog, onClose,onShow} = useDialog()

//显示弹框
const show = () => {
    getTreeData()
    dialog.height = 450;
    dialog.width = 300;
    dialog.title = '选择上级菜单'
    onShow()
}
//暴露出去给外部使用
defineExpose({
    show
})
//定义事件
const emit = defineEmits(['selectId'])
//弹框确定
const confirm = () => {
    if (!selectNode.parentName) {
        message.error('请选择上级菜单')
        return;
    }
    emit('selectId',selectNode)
    onClose()
}
</script>

<style scoped>

</style>