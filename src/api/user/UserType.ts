export type UserModel = {
    password: string;
    uid: string;
    username: string;
    netName: string;
    email: string;
    state:string;
    uportrait: string;
    type:string;
}

export interface UserParm {
    pageSize: number;
    currentPage: number;
    username: string;
    // netName: string;
    // email: string;
}