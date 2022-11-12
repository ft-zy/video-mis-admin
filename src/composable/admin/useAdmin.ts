

import { deleteAdminApi } from "@/api/admin/Admin";
import { AdminMode } from "@/api/admin/AdminType";
import useInstance from "@/hooks/useInstance";
import { EditType } from "@/type/BaseEnum";
import { FuncList } from "@/type/BaseType";
import { message } from "ant-design-vue";
import { ref } from "vue";

export default function useAdmin(getList: FuncList) {

   const { global } = useInstance();

    const addRef = ref<{ show: (type: string, row?: AdminMode) => void }>();
    
    const addBtn = ()=> {
        addRef.value?.show(EditType.ADD)
    }

    const editBtn = (row: AdminMode)=> {
        addRef.value?.show(EditType.EDIT,row)
    }

    const deleteBtn = async (row: AdminMode)=> {
        // 信息确认
        const confirm = await global.$myconfirm();
        if (confirm) {
            let res = await deleteAdminApi(row. aid)
            if (res && res.code == 200) {
                // 信息提示
                message.success(res.msg)
                getList();
            }
        }
   }

    return {
        addRef,
        addBtn,
        editBtn,
        deleteBtn,
    }
}