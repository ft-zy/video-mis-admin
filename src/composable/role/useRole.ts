import { addRoleApi, deleteRoleApi, editRoleApi } from "@/api/role/Role";
import { RoleModel } from "@/api/role/RoleType";
import useInstance from "@/hooks/useInstance";
import { EditType } from "@/type/BaseEnum";
import { FuncList } from "@/type/BaseType";
import { message } from "ant-design-vue";
import { ref } from "vue";

export default function useRole (getList: FuncList) {
    // 分配权限的一个属性
    const assignRef = ref()
   // 获取全局global
   const { global } = useInstance();
   // 新增弹框 ref 的属性
   const addRef = ref<{ show: (type: string, row?: RoleModel) => void }>();
   // 新增
   const addBtn = ()=> {
       addRef.value?.show(EditType.ADD)
   }
   // 编辑
   const editBtn = (row:RoleModel)=>{
       addRef.value?.show(EditType.EDIT,row)
   }

   // 删除
   const deleteBtn = async (row: RoleModel)=> {
        // 信息确认
        const confirm = await global.$myconfirm();
        if (confirm) {
            let res = await deleteRoleApi(row. roId)
            if (res && res.code == 200) {
                // 信息提示
                message.success(res.msg)
                // 刷新表格
                getList();
            }
        }
   }
   // 保存
   const save = async(data: RoleModel)=> {
    console.log("父组件接收数据");
    console.log(data);
    let res = null;
    if (data.type === EditType.ADD) {
        res= await addRoleApi(data)
    } else {
        res = await editRoleApi(data)
    }

    if (res && res.code == 200) {
        // 信息提示
        message.success(res.msg);
        // 刷新表格
        getList();
    }

   }

   // 分配权限按钮
   const assignBtn = (row: RoleModel)=> {
        assignRef.value.show(row)
   }

   return {
        assignRef,
       addBtn,
       editBtn,
       deleteBtn,
       save,
       addRef,
       getList,
       assignBtn
   }
}