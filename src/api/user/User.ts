import http from "@/http";
import {UserModel, UserParm} from "@/api/user/UserType";

export const userPageApi = (parm: UserParm)=> {
    return http.get({
        url: '/api/user/UserPage',
        params: parm
    })
}

export const addUserApi = (parm: UserModel) => {
    return http.post({
        url: '/api/user/addUser',
        data: parm
    })
}

//编辑
export const editUserApi = (parm : UserModel)=> {
    return http.put({
        url: '/api/user/editUser',
        data: parm
    })
}

export const deleteUser = (uid: string) => {
    return http.get({
        url: `/api/user/${uid}`
    })
}