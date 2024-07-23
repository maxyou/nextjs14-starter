// models/interfaces.ts
import { PrismaClient, User } from '@prisma/client';

export interface UserDTO {
    id: string;
    authType: string;
    name: string;
    nickName?: string | null;
    avatar?: string | null;
    email?: string | null;
}

export const toUserDTO = (user:User): UserDTO => {
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
