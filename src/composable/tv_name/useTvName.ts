import {ref} from "vue";
import {EditType} from "@/type/BaseEnum";
import {message} from "ant-design-vue";
import useInstance from "@/hooks/useInstance";
import {FuncList} from "@/type/BaseType";
import {TvNameModel} from "@/api/tv_name/TvNameType";
import {addTvNameApi, deleteTvNameApi, editTvNameApi} from "@/api/tv_name/TvName";

export default function useTvName(getList: FuncList) {

    // 获取全局global
    const { global } = useInstance();

    const addRef = ref<{ show: (type: string, row?: TvNameModel) => void }>();

    const addBtn = ()=> {
        addRef.value?.show(EditType.ADD)
    }

    const editBtn = (row: TvNameModel)=> {
        addRef.value?.show(EditType.EDIT, row)
    }

    const save = async(data: TvNameModel)=> {
        let res = null;
        if (data.type === EditType.ADD) {
            res= await addTvNameApi(data)
        } else {
            res = await editTvNameApi(data)
        }

        if (res && res.code == 200) {
            // 信息提示
            message.success(res.msg);
            // 刷新表格
            getList();
        }

        if (res && res.code == 666) {
            // 信息提示
            message.warning(res.msg);
            // 刷新表格
            getList();
        }
    }

    const deleteBtn = async (row: TvNameModel) => {
        const confirm = await global.$myconfirm();
        if (confirm) {
            let res = await deleteTvNameApi(row.tvid)
            if (res && res.code == 200) {
                // 信息提示
                message.success(res.msg)
                // 刷新表格
                getList();
            }
        }
    }

    return {
        addBtn, editBtn, save, addRef, deleteBtn
    }
}