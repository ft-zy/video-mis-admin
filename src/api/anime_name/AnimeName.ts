import {AnimeNameModel, ListParm} from "@/api/anime_name/AnimeNameType";
import http from "@/http";

export const getAnimeNameListApi = (parm: ListParm)=> {
    return http.get({
        url: '/api/anime_name/getAnimeNameList',
        params: parm
    })
}

export const addAnimNameApi = (parm: AnimeNameModel)=> {
    return http.post({
        url: '/api/anime_name/add_animName',
        data: parm
    })
}

export const editAnimeNameApi = (parm: AnimeNameModel)=> {
    return http.put({
        url: '/api/anime_name/edit_animeName',
        data: parm
    })
}

export const deleteAnimeNameApi =(aid: string) => {
    return http.get({
        url: `/api/anime_name/${aid}`
    })
}