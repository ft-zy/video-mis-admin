
import http from "@/http";
import {TvNameModel, TvNameParm} from "@/api/tv_name/TvNameType";

export const getTvNameListApi = (parm: TvNameParm)=> {
    return http.get({
        url: '/api/tv_name/getTvNameList',
        params: parm
    })
}

export const addTvNameApi = (parm: TvNameModel)=> {
    return http.post({
        url: '/api/tv_name/add_tv_name',
        data: parm
    })
}

export const editTvNameApi = (parm: TvNameModel)=> {
    return http.put({
        url: '/api/tv_name/edit_tv_name',
        data: parm
    })
}

export const deleteTvNameApi =(tvid: string) => {
    return http.get({
        url: `/api/tv_name/${tvid}`
    })
}