import http from "@/http";
import { ListParm, RegionModel } from "./RegionType";

//新增
export const addRegionApi = (parm: RegionModel)=> {
    return http.post({
        url:"/api/region/add_region",
        data: parm
    })
}

// 删除
export const deleteRegionApi = (rid: String)=> {
    return http.delete({
        url: `/api/region/${rid}`
    })
}

// 编辑
export const editRegionApi = (parm: RegionModel)=> {
    return http.put({
        url: '/api/region/edit_region',
        data: parm
    })
}

// 查询列表
export const getRegionApi = (parm: ListParm) => {
    return http.get({
        url: '/api/region/list_region',
        params: parm
    })
}
