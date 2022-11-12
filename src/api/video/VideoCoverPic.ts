import http from "@/http"
import { request } from "http";
import { ListParm } from "../year/YearType"
import {file} from "@/api/video/VideoType";

export const getCoverPicApi = (parm: ListParm) => {
    return http.get({
        url:'/api/video/upload/upload',
        params: parm
    })
}

// export let uploadImageApi = () => {
//     return http.upload('/api/video/upload/UploadImgPic')
// }

