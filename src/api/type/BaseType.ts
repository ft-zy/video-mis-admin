//列表参数
export interface ListParm{
    currentPage:number;
    pageSize:number;
    typeName?:string;
}
//新增、编辑
export interface TypeModel{
    id:string;
    num:string;
    typeName:string;
    type:string;
}