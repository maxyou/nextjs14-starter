import { NextResponse, NextRequest } from 'next/server';
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { getJoseJwtToken } from '@/utilities/calc';
import jwt from 'jsonwebtoken';
import { SignJWT, jwtVerify, type JWTPayload } from 'jose';
import { JwtUser, UserAdd, UserDTO, toUserDTO } from '@/app/dto/User';

const prisma = new PrismaClient();

export async function POST(request: Request) {

  const body = await request.json();
  console.log(`POST name: ${body.name}, password: ${body.password}`);

  try {
    const userFindFirst = await prisma.user.findFirst({
      where: {
        name: body.name,
        password: body.password,
        authType:'register',
      },
    });

    if (!userFindFirst) {
      console.log(`login failed, prisma.user.findFirst return: ${JSON.stringify(userFindFirst)}`)
      return NextResponse.json({ code: -1, message: 'Failed to login user.' });
    }
    console.log(`login sucess, prisma.user.findFirst return: ${JSON.stringify(userFindFirst)}`)

    // Set the 'logined' flag to true
    const userUpdate = await prisma.user.update({
      where: { id: userFindFirst.id },
      data: { logined: true },
    });

    const token = await getJoseJwtToken(toUserDTO(userUpdate)!);

    const res = NextResponse.json({ code: 0, message: 'success', data: toUserDTO(userUpdate) })

    const cookieOptions = {
      httpOnly: true,
      secure: true
    };
    res.cookies.set('jwt', token, cookieOptions);

    return res;

  } catch (error) {
    console.error('Error during user login:', error);
    return NextResponse.json({ code: -1, message: 'Failed to login user.' });
  }
}
