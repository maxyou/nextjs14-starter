import { NextResponse, NextRequest } from 'next/server';
import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import { SignJWT, jwtVerify, type JWTPayload } from 'jose';
import { PrismaClient } from '@prisma/client';
import { getJoseJwtToken } from '@/utilities/calc';

const prisma = new PrismaClient();

export async function POST(request: Request) {

  console.log('req.method:', request.method)
  console.log('req.url', request.url)

  const { name: nameRequest, password, email } = await request.json();
  console.log(`POST name: ${nameRequest}, password: ${password}, email:${email}`);

  try {
    const ret = await prisma.user.create({
      data: {
        name: nameRequest,
        password: password,
        email: email,
        authType: 'register'
      }
    });

    console.log(`prisma.user.create return: ${JSON.stringify(ret)}`)

    const { id, name: nameDB } = ret as { id: string; name: string };
    const jwtUser = {
      id,
      name: nameDB,
      email: email,
      from: 'register'
    }

    const jwtToken = await getJoseJwtToken(jwtUser);

    const res = NextResponse.json({ code: 0, message: 'success', data: jwtUser })

    const cookieOptions = {
      httpOnly: true,
      secure: true
    };
    res.cookies.set('jwt', jwtToken, cookieOptions);

    return res;

  } catch (error) {
    console.error('Error during user registration:', error);
    return NextResponse.json({ code: -1, message: 'Failed to register user.' });
  }
}
