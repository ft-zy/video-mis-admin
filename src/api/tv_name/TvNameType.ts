export type TvNameModel = {
    tvid: string,
    rid:[],
    id:[],
    yid:[],
    name: string,
    cover: string,
    info: string,
    type: string
}

export interface TvNameParm {
    currentPage:number;
    pageSize:number;
    name?:string;
    // region?:string;
    // typeName?:string;
    // videoYear?:string;
}
