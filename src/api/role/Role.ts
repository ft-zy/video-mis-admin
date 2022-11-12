import http from "@/http";
import {ListParm, RoleModel, SaveAssign, TreeParm} from "./RoleType";

export const addRoleApi = (parm: RoleModel)=> {
    return http.post({
        url:'/api/role/addRole',
        data: parm
    })
}

export const deleteRoleApi = (roId: string)=> {
    return http.delete({
        url: `/api/role/${roId}`
    })
}

export const editRoleApi = (parm: RoleModel)=> {
    return http.put({
        url:'/api/role/editRole',
        data: parm
    })
}

export const getRoleApi = (parm: ListParm) => {
    return http.get({
        url: '/api/role/getRole',
        params: parm
    })
}

//树数据回显
export const getAssingShowApi = (parm: TreeParm) => {
    return http.get({
        url: '/api/role/getAssingShow',
        params: parm
    })
}

// 保存权限
export  const assignSaveApi = (parm: SaveAssign) => {
    return http.post({
        url: '/api/role/assignSave',
        data: parm
    })
}