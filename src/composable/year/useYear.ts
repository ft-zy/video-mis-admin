import { addYearApi, deleteYearApi, editYearApi } from "@/api/year/Year";
import { YearModel } from "@/api/year/YearType";
import useInstance from "@/hooks/useInstance";
import { EditType } from "@/type/BaseEnum";
import { FuncList } from "@/type/BaseType";
import { message } from "ant-design-vue";
import { ref } from "vue";

export default function useYear(getList: FuncList) {
    const { global } = useInstance();
    const addRef = ref<{ show: (type: string, row?: YearModel) => void }>();
    const addBtn = ()=> {
        addRef.value?.show(EditType.ADD)
    }

    const editBtn = (row: YearModel)=> {
        addRef.value?.show(EditType.EDIT,row) 
    }

    const deleteBtn = async (row: YearModel)=> {
        // 信息确认
        const confirm = await global.$myconfirm();
        if (confirm) {
            let res = await deleteYearApi(row.yid)
            if (res && res.code == 200) {
                // 信息提示
                message.success(res.msg)
                // 刷新表格
                getList();
            }
        }
   }

    const save = async(data: YearModel)=> {
        console.log("父组件接收数据");
        console.log(data);
        let res = null;
        if (data.type === EditType.ADD) {
            res= await addYearApi(data)
        } else {
            res = await editYearApi(data)
        }

        if (res && res.code == 200) {
            // 信息提示
            message.success(res.msg);
            // 刷新表格
            getList();
        } 

        if (res && res.code == 666) {
            // 信息提示
            message.error(res.msg)
            // 刷新表格
            getList();
        } 
    }


    return {
        addBtn,
        editBtn,
        deleteBtn,
        save,
        addRef
    }
}