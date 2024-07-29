'use server';
import { toUserDTO, UserAdd, UserDTO, UserLogin } from '@/common/interface/User';
import { PrismaClient, User } from '@prisma/client';
import { getJoseJwtToken } from '@/common/utilities/calc';
import jwt from 'jsonwebtoken';
import { SignJWT, jwtVerify, type JWTPayload } from 'jose';
import { cookies } from 'next/headers'

const prisma = new PrismaClient();

export async function serverActionLogin(userLogin: UserLogin): Promise<string> {

    console.log("server action Login");
    console.log(`POST name: ${userLogin.name}, password: ${userLogin.password}`);

    try {
        const userFindFirst = await prisma.user.findFirst({
            where: {
                name: userLogin.name,
                password: userLogin.password,
                authType: 'register',
            },
        });

        if (!userFindFirst) {
            console.log(`login failed, prisma.user.findFirst return: ${JSON.stringify(userFindFirst)}`)
            return JSON.stringify({ code: -1, message: 'Failed to login user.' });
        }
        console.log(`login sucess, prisma.user.findFirst return: ${JSON.stringify(userFindFirst)}`)

        // Set the 'logined' flag to true
        const userUpdate = await prisma.user.update({
            where: { id: userFindFirst.id },
            data: { logined: true },
        });

        const token = await getJoseJwtToken(toUserDTO(userUpdate)!);

        const res = JSON.stringify({ code: 0, message: 'success', data: toUserDTO(userUpdate) })

        const cookieOptions = {
            httpOnly: true,
            secure: true
        };

        const cookieStore = cookies();
        cookieStore.set('jwt', token, cookieOptions);

        return res;

    } catch (error) {
        console.error('Error during user login:', error);
        return JSON.stringify({ code: -1, message: 'Failed to login user.' });
    }
}

