import { getParentListApi } from "@/api/menu/Menu";
import { TreeNode } from "@/api/menu/MenuType";
import { TreeProps } from "ant-design-vue";
import { onMounted, reactive, ref } from "vue";

export default function userParent() {
        //是否显示连接线
    const showLine = ref<boolean>(true);
    //定义树形数据
    const treeData = ref<TreeProps['treeData']>([])
    //树属性配置
    const fieldNames = reactive({
        children: 'children',
        title: 'title',
        key: 'mid'
    })
    //获取树的数据
    const getTreeData = async () => {
        let res = await getParentListApi()
        if (res && res.code == 200) {
            treeData.value = res.data;
        }
    }
    //选中的数据类型
    const selectNode = reactive<TreeNode>({
        parentId: '',
        parentName: ''
    })
    const onSelect: TreeProps['onSelect'] = (selectedKeys, info) => {
        // selectNode.parentId = selectedKeys[0] as string;
        selectNode.parentId = info.node.mid;
        console.log(selectNode.parentId);
    
        selectNode.parentName = info.node.title;
    };
    onMounted(() => {
        getTreeData()
    })
    return {
        showLine,
        treeData,
        fieldNames,
        onSelect,
        selectNode,
        getTreeData
    }

}