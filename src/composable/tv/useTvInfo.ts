import {ref} from "vue";
import {EditType} from "@/type/BaseEnum";
import {message} from "ant-design-vue";
import useInstance from "@/hooks/useInstance";
import {FuncList} from "@/type/BaseType";
import {TvInfoModel} from "@/api/tv/TvInfoType";
import {addTvApi, deleteTvApi, editTvApi} from "@/api/tv/TvApi";

export default function useTvInfo(getList: FuncList) {

    // 获取全局global
    const { global } = useInstance();

    const addRef = ref<{ show: (type: string, row?: TvInfoModel) => void }>();

    const addBtn = ()=> {
        addRef.value?.show(EditType.ADD)
    }

    const editBtn = (row: TvInfoModel)=> {
        addRef.value?.show(EditType.EDIT, row)
    }

    const save = async(data: TvInfoModel)=> {
        let res = null;
        if (data.type === EditType.ADD) {
            res= await addTvApi(data)
        } else {
            res = await editTvApi(data)
        }

        if (res && res.code == 200) {
            // 信息提示
            message.success(res.msg);
            // 刷新表格
            getList();
        }

    }

    const deleteBtn = async (row: TvInfoModel) => {
        const confirm = await global.$myconfirm();
        if (confirm) {
            let res = await deleteTvApi(row.vid)
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