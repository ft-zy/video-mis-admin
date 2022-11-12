import http from "@/http";
import { ListParm, YearModel } from "./YearType";

export const addYearApi = (parm: YearModel) => {
    return http.post ({
        url: '/api/year/add_year',
        data: parm
    })
}

export const deleteYearApi = (yid: string)=> {
    return http.delete ({
        url: `/api/year/${yid}`
    })
}

export const editYearApi = (parm: YearModel)=> {
    return http.put ({
        url: '/api/year/edit_year',
        data: parm
    })
}

export const getYearListApi = (parm: ListParm) => {
    return http.get({
        url: '/api/year/list_year',
        params: parm
    })
}