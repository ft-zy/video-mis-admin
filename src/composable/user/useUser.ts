import {ref} from "vue";
import {message} from "ant-design-vue";
import useInstance from "@/hooks/useInstance";
import {FuncList} from "@/type/BaseType";
import {UserModel} from "@/api/user/UserType";
import {addUserApi, deleteUser, editUserApi} from "@/api/user/User";
import {MsgModel} from "@/api/msg/MsgType";
import {EditType} from "@/type/BaseEnum";

export default function useUser(getList: FuncList) {

    // 获取全局global
    const { global } = useInstance();

    const addRef = ref<{ show: (type: string, row?: UserModel) => void }>();

    const editBtn = (row: UserModel)=> {
        addRef.value?.show(EditType.EDIT, row)
    }

    const save = async(data: UserModel)=> {
        let res = await editUserApi(data)
        if (res && res.code == 200) {
            // 信息提示
            message.success(res.msg);
            // 刷新表格
            getList();
        }
    }

    const deleteBtn = async (row: UserModel) => {
        const confirm = await global.$myconfirm();
        if (confirm) {
            let res = await deleteUser(row.uid)
            if (res && res.code == 200) {
                // 信息提示
                message.success(res.msg)
                // 刷新表格
                getList();
            }
        }
    }

    return {
        editBtn, save, addRef, deleteBtn
    }
}