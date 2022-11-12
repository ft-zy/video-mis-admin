export type MsgModel = {
    id: string
    title:string
    info: string;
    date: string;
    type: string;
}

export type MsgParm = {
    pageSize: number;
    currentPage: number;
    title: string;
}
