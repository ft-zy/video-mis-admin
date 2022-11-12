export type TvInfoModel = {
    vid: string,
    tvid: [],
    count: string,
    vurl: string,
    type: string
}

export interface TvInfoParm {
    currentPage:number;
    pageSize:number;
    count: string;
}