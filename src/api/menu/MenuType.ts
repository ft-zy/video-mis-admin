export type MenuModel = {
    mid: string;
    parentId: string;
    title: string;
    code: string;
    name: string;
    path: string;
    url: string;
    type: string;
    icon: string;
    parentName: string;
    orderNum: string;
    editType: string;
    num: string;
}

export interface TreeNode{
    parentId:string,
    parentName:string
}


export type MenuParm = {
    pageSize: number;
    currentPage: number;
    title: string;
}
