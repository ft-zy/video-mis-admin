import { addVideoApi, deleteVideoApi, editVideoApi } from "@/api/video/VideoInfo";
import { VideoModel } from "@/api/video/VideoType";
import useInstance from "@/hooks/useInstance";
import { EditType } from "@/type/BaseEnum"
import { FuncList } from "@/type/BaseType";
import { message } from "ant-design-vue";
import { reactive, ref } from "vue";

export default function useVideoInfo(getList: FuncList) {

   // 获取全局global
   const { global } = useInstance();
   // 新增弹框 ref 的属性
   const addRef = ref<{ show: (type: string, row?: VideoModel) => void }>();
   // 新增
   const addBtn = ()=> {
       addRef.value?.show(EditType.ADD)
   }
   // 编辑
   const editBtn = (row:VideoModel)=>{
       addRef.value?.show(EditType.EDIT,row)
   }
   // 删除
   const deleteBtn = async (row: VideoModel)=> {
    // 信息确认
    const confirm = await global.$myconfirm();
    if (confirm) {
        let res = await deleteVideoApi(row.vid)
        if (res && res.code == 200) {
            // 信息提示
            message.success(res.msg)
            // 刷新表格
            getList();
        }
    }
}
   // 保存
   const save = async(data: VideoModel)=> {
       console.log("父组件接收数据");
       console.log(data);
       let res = null;
       if (data.type === EditType.ADD) {
           res= await addVideoApi(data)
       } else {
           res = await editVideoApi(data)
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