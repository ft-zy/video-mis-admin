
import http from "@/http";
import {TvInfoModel, TvInfoParm} from "@/api/tv/TvInfoType";

export const getTvListApi = (parm: TvInfoParm)=> {
    return http.get({
        url: '/api/tv/getTvInfoList',
        params: parm
    })
}

export const addTvApi = (parm: TvInfoModel)=> {
    return http.post({
        url: '/api/tv/add_URL',
        data: parm
    })
}

export const editTvApi = (parm: TvInfoModel)=> {
    return http.put({
        url: '/api/tv/edit_URL',
        data: parm
    })
}

export const deleteTvApi =(vid: string) => {
    return http.delete({
        url: `/api/tv/tv/${vid}`
    })
}

export const TvSelectApi = ()=> {
    return http.get({
        url: '/api/tv/getTvList'
    })
}

export const getByIdTvList = (tvid: string) => {
    return http.get({
        url: '/api/tv/getByIdTvList',
        params: { tvid: tvid}
    })
}



