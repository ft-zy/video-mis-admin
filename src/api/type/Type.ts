import http from "@/http/index";
import { ListParm, TypeModel} from "./BaseType";
// 新增
export const addTypeApi = (parm: TypeModel) => {
    return http.post({
        url: '/api/type/type_add',
        data: parm
    })
}

// 删除
export const deleteTypeApi = (id: string)=> {
    return http.delete({
        url: `/api/type/${id}`
    })
}

//编辑
export const editTypeApi = (parm: TypeModel)=> {
    return http.put({
        url: '/api/type/type_edit',
        data: parm
    })
}

//列表查询
export const getListApi = (parm:ListParm)=>{
    return http.get({
        url:'/api/type/type_list',
        params:parm
    })
}

