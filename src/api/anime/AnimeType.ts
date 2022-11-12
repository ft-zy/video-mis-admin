export type AnimeModel = {
    avid: string,
    aid: [],
    count: string,
    vurl: string,
    type: string
}

export interface ListParm {
    currentPage:number;
    pageSize:number;
    count:string;
    // region?:string;
    // typeName?:string;
    // videoYear?:string;
}
