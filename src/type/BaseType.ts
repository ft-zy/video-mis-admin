// 对话框数据库类型
export type DialogModel = {
    title: string;
    visible: boolean;
    height: number;
    width: number;
}

export type DrawerModel = {
    title: string;
    visible: boolean;
    width: number;
    placement: string;
    maskClosable: boolean;
}

// 通用函数类型
 export type FuncList = () => any