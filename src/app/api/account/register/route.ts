import { NextResponse, NextRequest } from 'next/server';
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { getJoseJwtToken } from '@/common/utilities/calc';
import jwt from 'jsonwebtoken';
import { SignJWT, jwtVerify, type JWTPayload } from 'jose';
import { UserAdd, UserDTO, toUserDTO } from '@/common/interface/User';

const prisma = new PrismaClient();

export async function POST(request: Request) {

  // console.log('req.method:', request.method)
  // console.log('req.url', request.url)

  // const { name: nameRequest, password, email } = await request.json();
  // console.log(`POST name: ${nameRequest}, password: ${password}, email:${email}`);
  const body = await request.json() as UserAdd;

  try {
    const newUser = await prisma.user.create({
      data: {...body, authType:'register', logined: true},
    });

    console.log(`prisma.user.create return: ${JSON.stringify(newUser)}`)

    // const { id, name , email } = newUser as { id: string; name: string; email: string; };
    const userDTO = toUserDTO(newUser);

    if (!userDTO) {
      return NextResponse.json({ code: -1, message: 'Failed to register user.' });
    }

    const jwtToken = await getJoseJwtToken(userDTO);

    const res = NextResponse.json({ code: 0, message: 'success', data: userDTO })

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
