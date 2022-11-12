//列表参数
export interface ListParm{
    currentPage:number;
    pageSize:number;
    vname:string;
    // region:string;
    // typeName?:string;
    // videoYear?:string;
}

// export type VideoModel = {
//     vid: string;
//     num: string;
//     rid: string | undefined;
//     id: string | undefined;
//     yid: string | undefined;
//     vname: string;
//     vinfo: string;
//     vphoto: string;
//     vurl: string;
//     type: string;
// }


export type VideoModel = {
    vid:string,
    rid:[],
    id:[],
    yid:[],
    vname: string,
    vphoto: string,
    vinfo: string,
    vurl: string,
    type:string
}

export interface file {
    file: file
}
