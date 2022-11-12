import { ListParm, TypeModel } from "@/api/type/BaseType";
import { EditType } from "@/type/BaseEnum";
import { ref } from "vue";
import { addTypeApi, deleteTypeApi, editTypeApi } from '@/api/type/Type'
import { message } from 'ant-design-vue';
import { FuncList } from "@/type/BaseType";
import useInstance from "@/hooks/useInstance";

export default function useType(getList:FuncList, ListParm:ListParm) {
    // 获取全局global
    const { global } = useInstance();
    // 新增弹框的ref属性
    const addRef = ref<{show:(type:string, row?:TypeModel)=>void}>();
    // 新增
    const addBtn = ()=> {
        addRef.value?.show(EditType.ADD)
    }
    // 编辑
    const editBtn = (row:TypeModel)=> {
        addRef.value?.show(EditType.EDIT, row)
    }
    // 删除
    const deleteBtn = async(row:TypeModel)=> {
        // 信息确认
        const confirm = await global.$myconfirm();
        if (confirm) {
            let res = await deleteTypeApi(row.id)
            if (res && res.code == 200) {
                // 信息提示
                message.success(res.msg)
                // 刷新表格
                getList();
            }
        }
    }
    // 保存
    const save = async(item:TypeModel)=> {
        console.log('接收到参数');
        console.log(item);
        let res = null;
        if (item.type == EditType.ADD) {
            res = await addTypeApi(item);
        } else {
            res = await editTypeApi(item)
        }
        if (res && res.code == 200) {
            //信息提示
            message.success(res.msg)
            //刷新列表数据
            getList();
        }
    }
    // 搜索
    const searchBtn = ()=> {
        getList();
    }

    // 重置
    const resetBtn = ()=> {
        // list清空搜索表单
        ListParm.typeName = '';
        ListParm.currentPage = 1;
        getList();
    }

    return {
        addBtn,
        editBtn,
        deleteBtn,
        save,
        addRef,
        searchBtn,
        resetBtn
    }
}