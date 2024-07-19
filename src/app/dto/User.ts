// models/interfaces.ts

export interface UserDTO {
    id: string;
    authType: string;
    name: string;
    nickName?: string;
    avatar?: string;
    email?: string;
}

export interface UserAdd {
    authType: string;
    name: string;
    nickName?: string;
    avatar?: string;
    email?: string;
    password?: string;
}
