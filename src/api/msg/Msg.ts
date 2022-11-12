import http from "@/http";
import {MsgModel, MsgParm} from "@/api/msg/MsgType";

export const MsgPageApi = (parm: MsgParm)=> {
    return http.get({
        url: '/api/msg/MsgPage',
        params: parm
    })
}

export const AddMsgApi = (parm: MsgModel)=> {
    return http.post({
        url: '/api/msg/addMsg',
        data: parm
    })
}

export const EditMsgApi = (parm: MsgModel)=> {
    return http.put({
        url: '/api/msg/editMsg',
        data: parm
    })
}

export const deleteMsg = (id: string) => {
    return http.get({
        url: `/api/msg/msg/${id}`
    })
}