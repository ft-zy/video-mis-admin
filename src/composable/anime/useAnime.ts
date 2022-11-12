import {ref} from "vue";
import useInstance from "@/hooks/useInstance";
import {EditType} from "@/type/BaseEnum";
import {message} from "ant-design-vue";
import {FuncList} from "@/type/BaseType";
import {AnimeModel} from "@/api/anime/AnimeType";
import {addAnimApi, deleteAnimeApi, editAnimeApi} from "@/api/anime/Anime";

export default function useAnime(getList: FuncList) {

    // 获取全局global
    const { global } = useInstance();

    const addRef = ref<{ show: (type: string, row?: AnimeModel) => void }>();

    const addBtn = ()=> {
        addRef.value?.show(EditType.ADD)
    }

    const editBtn = (row: AnimeModel)=> {
        addRef.value?.show(EditType.EDIT, row)
    }

    const save = async(data: AnimeModel)=> {
        let res = null;
        if (data.type === EditType.ADD) {
            res= await addAnimApi(data)
        } else {
            res = await editAnimeApi(data)
        }

        if (res && res.code == 200) {
            // 信息提示
            message.success(res.msg);
            // 刷新表格
            getList();
        }
    }

    const deleteBtn = async (row: AnimeModel) => {
        const confirm = await global.$myconfirm();
        if (confirm) {
            let res = await deleteAnimeApi(row.avid)
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