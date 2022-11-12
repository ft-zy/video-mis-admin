import http from "@/http"
import { AdminMode, AdminParm } from "./AdminType"

export const getRoleListApi = () => {
    return http.get({
        url: "/api/admin/getRoleSelect"
    })
}

export const addAdminApi = (parm: AdminMode) => {
    return http.post({
        url: "/api/admin/addAdmin",
        data: parm
    })
}

export const deleteAdminApi =(aid: string) => {
    return http.delete({
        url: `api/admin/${aid}`
    })
}

export const editAdminApi = (parm: AdminMode) => {
    return http.put({
        url: "/api/admin/editAdmin",
        data: parm
    })
}

export const getAdminListApi = (parm: AdminParm) => {
    return http.get({
        url: "/api/admin/getAdminList",
        params: parm
    })
}

export const getAdminByIdApi = (aid: string) => {
    return http.get({
        url: '/api/admin/getByIdAdmin',
        params: { aid:aid }
    })
}
export const getByIdApi = (aid: number) => {
    return http.get({
        url: '/api/admin/getByIdAdmin',
        params: { aid:aid}
    })
}


