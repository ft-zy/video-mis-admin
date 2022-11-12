import { deleteMenuApi } from "@/api/menu/Menu"
import { MenuModel } from "@/api/menu/MenuType"
import useInstance from "@/hooks/useInstance"
import { EditType } from "@/type/BaseEnum"
import { FuncList } from "@/type/BaseType"
import { message } from "ant-design-vue"
import { onMounted, ref } from "vue"

export default function useMenu(refresh:FuncList) {

    const { global } = useInstance()
    
    const addRef = ref()

    const addBtn =()=> {
        addRef.value.show(EditType.ADD)
    }

    //删除
    const deleteBtn = async (row: MenuModel) => {
    //信息确认
    const confirm = await global.$myconfirm();
        if (confirm) {
            let res = await deleteMenuApi(row.mid)
            if(res && res.code == 200){
                message.success(res.msg)
                //刷新列表
                refresh()
            }
        }
    }

    const editBtn = (row: MenuModel)=> {
        addRef.value.show(EditType.EDIT, row)
    }

    return {
        addBtn,
        deleteBtn,
        editBtn,
        addRef
    }
}