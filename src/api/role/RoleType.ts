export type RoleModel = {
    roId: string;
    roleName: string;
    roleDescribe: string;
    num: string;
    type: string
}

export type ListParm = {
    pageSize: number;
    currentPage: number;
    roleName?: string;
}

export interface TreeParm{
    aid: string;
    roId: string;
}

export interface SaveAssign{
    roId:string,
    list:[]
}