import http from "@/http";
import { ListParm, VideoModel } from "./VideoType";

export const TypeSelectApi = () => {
    return http.get({
        url: '/api/video/getTypeList'
    })
}

export const RegionSelectApi = () => {
    return http.get({
        url: '/api/video/getRegionList'
    })
}

export const YearSelectApi = () => {
    return http.get({
        url: '/api/video/getYearList'
    })
}

// 添加视频信息
export const addVideoApi = (parm: VideoModel) => {
    return http.post({
        url: '/api/video/add_video',
        data: parm
    })
}


export const deleteVideoApi = (vid: string)=> {
    return http.delete({
        url: `/api/video/${vid}`
    })
}

export const editVideoApi = (parm: VideoModel) => {
    return http.put({
        url: '/api/video/edit_video',
        data: parm
    })
}

// export const getVideoInfoApi = (parm:ListParm)=>{
//     return http.get({
//         url:'/api/video/list_video',
//         params:parm
//     })
// }


export const VideoInfoApi = (parm: ListParm)=>{
    return http.get({
        url:'/api/video/getVideoInfoList',
        params: parm
    })
}

export const UploadImgPic = (parm: any) => {
    return http.upload('/api/video/UploadImgPic',parm)

}
