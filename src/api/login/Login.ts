import http from "@/http"
import { LoginParm } from "./LoginType"
import {getAid} from "@/utils/auth";
import {UnwrapNestedRefs} from "vue";

export const LoginApi = (parm: LoginParm) => {
    return http.post({
        url: '/api/login/doLogin',
        data: parm
    })
}

export const getMenuListApi = () => {
    return http.get({
        url: '/api/login/getMenuList',
        params: {
            aid : getAid() || ''
        }
    })
}

