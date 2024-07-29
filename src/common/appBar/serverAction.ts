'use server';
import { toUserDTO, UserAdd, UserDTO, UserLogin } from '@/common/interface/User';
import { PrismaClient, User } from '@prisma/client';
import { getJoseJwtToken } from '@/common/utilities/calc';
import jwt from 'jsonwebtoken';
import { SignJWT, jwtVerify, type JWTPayload } from 'jose';
import { cookies } from 'next/headers'

const prisma = new PrismaClient();

export async function serverActionLogout(): Promise<string> {

    console.log("server action Logout");    

    try {

        const res = JSON.stringify({ code: 0, message: 'success to clear jwt'})

        const cookieOptions = {
            httpOnly: true,
            secure: true
        };

        const cookieStore = cookies();
        cookieStore.set('jwt', '', cookieOptions);

        return res;

    } catch (error) {
        console.error('Error during user login:', error);
        return JSON.stringify({ code: -1, message: 'Failed to login user.' });
    }
}

