import {ref} from "vue";
import {EditType} from "@/type/BaseEnum";
import {message} from "ant-design-vue";
import useInstance from "@/hooks/useInstance";
import {FuncList} from "@/type/BaseType";
import {MsgModel} from "@/api/msg/MsgType";
import {AddMsgApi, EditMsgApi, deleteMsg} from "@/api/msg/Msg";

export default function UseMsg(getList: FuncList) {

    // 获取全局global
    const { global } = useInstance();

    const addRef = ref<{ show: (type: string, row?: MsgModel) => void }>();

    const addBtn = ()=> {
        addRef.value?.show(EditType.ADD)
    }

    const editBtn = (row: MsgModel)=> {
        addRef.value?.show(EditType.EDIT, row)
    }

    const save = async(data: MsgModel)=> {
        let res = null;
        if (data.type === EditType.ADD) {
            res= await AddMsgApi(data)
        } else {
            res = await EditMsgApi(data)
        }

        if (res && res.code == 200) {
            // 信息提示
            message.success(res.msg);
            // 刷新表格
            getList();
        }
    }

    const deleteBtn = async (row: MsgModel) => {
        const confirm = await global.$myconfirm();
        if (confirm) {
            let res = await deleteMsg(row.id)
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