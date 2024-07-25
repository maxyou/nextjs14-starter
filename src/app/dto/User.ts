// models/interfaces.ts
import { PrismaClient, User } from '@prisma/client';

export interface UserUnique {
    authType: string;
    name: string;
}

export interface UserDTO {
    id: string;
    authType: string;
    name: string;
    nickName?: string | null;
    avatar?: string | null;
    email?: string | null;
}

export const toUserDTO = (user?:User|null): UserDTO | null => {

    if (!user) {
        return null;
    }

    return {
        id: user.id,
        authType: user.authType,
        name: user.name,
        nickName: user.nickName ?? null,
        avatar: user.avatar ?? null,
        email: user.email ?? null,
    };
}

export interface UserAdd {
    authType: string;
    name: string;
    nickName?: string;
    avatar?: string;
    email?: string;
    password?: string;
}

export interface JwtUser extends UserDTO {
    // id: string;
    // name: string;
    // nickName?: string;
    // email?: string;
    // avatar?: string;
    // authType: string;
    // sub?: string;
}