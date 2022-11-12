import http from "@/http";
import {AnimeModel, ListParm} from "@/api/anime/AnimeType";

export const addAnimApi = (parm: AnimeModel)=> {
    return http.post({
        url: '/api/anime/add_animeInfo',
        data: parm
    })
}

export const editAnimeApi = (parm: AnimeModel)=> {
    return http.put({
        url: '/api/anime/edit_animeInfo',
        data: parm
    })
}

export const deleteAnimeApi =(avid: string) => {
    return http.delete({
        url: `/api/anime/anime/${avid}`
    })
}


export const animePageApi = (parm: ListParm)=> {
    return http.get({
        url: '/api/anime/getAnimeInfoList',
        params: parm
    })
}

export const AnimeSelectApi = ()=> {
    return http.get({
        url: '/api/anime/getAnimeList'
    })
}



