import { ListParm, RegionModel } from "@/api/region/RegionType"
import { EditType } from "@/type/BaseEnum"
import { ref } from "vue"
import { addRegionApi,  editRegionApi,deleteRegionApi } from "@/api/region/Region"
import { message } from "ant-design-vue"
import { FuncList } from "@/type/BaseType"
import useInstance from "@/hooks/useInstance"

export default function useRegion(getList: FuncList) {
    // 获取全局global
    const { global } = useInstance();
    // 新增弹框 ref 的属性
    const addRef = ref<{ show: (type: string, row?: RegionModel) => void }>();
    // 新增
    const addBtn = ()=> {
        addRef.value?.show(EditType.ADD)
    }
    // 编辑
    const editBtn = (row:RegionModel)=>{
        addRef.value?.show(EditType.EDIT,row)
    }
    // 删除
    const deleteBtn = async (row: RegionModel)=> {
         // 信息确认
         const confirm = await global.$myconfirm();
         if (confirm) {
             let res = await deleteRegionApi(row.rid)
             if (res && res.code == 200) {
                 // 信息提示
                 message.success(res.msg)
                 // 刷新表格
                 getList();
             }
         }
    }
    // 保存
    const save = async(data: RegionModel)=> {
        console.log("父组件接收数据");
        console.log(data);
        let res = null;
        if (data.type === EditType.ADD) {
            res= await addRegionApi(data)
        } else {
            res = await editRegionApi(data)
        }

        if (res && res.code == 200) {
            // 信息提示
            message.success(res.msg);
            // 刷新表格
            getList();
        }
    }

    return {
        addBtn,
        editBtn,
        deleteBtn,
        save,
        addRef,
    }
}