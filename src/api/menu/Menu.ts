import http from "@/http"
import { MenuMode } from "ant-design-vue"
import exp from "constants"
import { MenuParm } from "./MenuType"

//获取上级列表
export const getParentListApi = () => {
    return http.get({
        url: '/api/menu/parent'
    })
}

export const addMenuApi = (parm: MenuMode)=> {
    return http.post({
        url:'/api/menu/addMenu',
        data: parm
    })
}

export const getMenuListApi = (parm: MenuParm)=> {
    return http.get({
        url:'/api/menu/getMenuList',
        params: parm
    })
}

//编辑
export const editMenuApi = (parm: MenuMode) => {
    return http.put({
        url: '/api/menu/editMenu',
        data: parm
    })
}
//删除
export const deleteMenuApi = (mid:string)=>{
    return http.delete({
        url:`/api/menu/${mid}`
    })
}