export type AnimeNameModel = {
    aid: string,
    rid:[],
    id:[],
    yid:[],
    name: string,
    cover: string,
    info: string,
    type: string
}

export interface ListParm {
    currentPage:number;
    pageSize:number;
    name?:string;
    // region?:string;
    // typeName?:string;
    // videoYear?:string;
}
