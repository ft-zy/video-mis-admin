import {ref} from "vue";
import {EditType} from "@/type/BaseEnum";
import {AnimeNameModel} from "@/api/anime_name/AnimeNameType";
import {message} from "ant-design-vue";
import useInstance from "@/hooks/useInstance";
import {FuncList} from "@/type/BaseType";
import {addAnimNameApi, deleteAnimeNameApi, editAnimeNameApi} from "@/api/anime_name/AnimeName";

export default function useAnimeName(getList: FuncList) {

    // 获取全局global
    const { global } = useInstance();

    const addRef = ref<{ show: (type: string, row?: AnimeNameModel) => void }>();

    const addBtn = ()=> {
        addRef.value?.show(EditType.ADD)
    }

    const editBtn = (row: AnimeNameModel)=> {
        addRef.value?.show(EditType.EDIT, row)
    }

    const save = async(data: AnimeNameModel)=> {
        let res = null;
        if (data.type === EditType.ADD) {
            res= await addAnimNameApi(data)
        } else {
            res = await editAnimeNameApi(data)
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

    const deleteBtn = async (row: AnimeNameModel) => {
        const confirm = await global.$myconfirm();
        if (confirm) {
            let res = await deleteAnimeNameApi(row.aid)
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