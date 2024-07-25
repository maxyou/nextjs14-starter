'use server';
import { toUserDTO, UserAdd, UserDTO, UserLogin, UserRegister } from '@/app/dto/User';
import { PrismaClient, User } from '@prisma/client';
import { getJoseJwtToken } from '@/utilities/calc';
import jwt from 'jsonwebtoken';
import { SignJWT, jwtVerify, type JWTPayload } from 'jose';
import { cookies } from 'next/headers'

const prisma = new PrismaClient();

export async function serverActionRegister(userRegister: UserRegister): Promise<string> {

    console.log("server action Register");
    console.log(`POST name: ${userRegister.name}, password: ${userRegister.password}`);

    try {

        const newUser = await prisma.user.create({
            data: { ...userRegister, authType: 'register', logined: true },
        });

        console.log(`prisma.user.create return: ${JSON.stringify(newUser)}`)

        // const { id, name , email } = newUser as { id: string; name: string; email: string; };

        if (!newUser) {
            return JSON.stringify({ code: -1, message: 'Failed to register user.' });
        }

        const userDTO = toUserDTO(newUser);

        const token = await getJoseJwtToken(userDTO!);

        const res = JSON.stringify({ code: 0, message: 'success', data: userDTO })

        const cookieOptions = {
            httpOnly: true,
            secure: true
        };

        const cookieStore = cookies();
        cookieStore.set('jwt', token, cookieOptions);

        return res;

    } catch (error) {
        console.error('Error during user register:', error);
        return JSON.stringify({ code: -1, message: 'Failed to register user.' });
    }
}

