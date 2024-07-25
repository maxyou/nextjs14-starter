import { NextResponse, NextRequest } from 'next/server';
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { JwtUser, getJoseJwtToken } from '@/utilities/calc';
import { SignJWT, jwtVerify, type JWTPayload } from 'jose';
import { UserAdd, UserDTO, toUserDTO } from '@/app/dto/User';

const prisma = new PrismaClient();


export async function POST(request: Request) {

  // const { name: nameRequest, password, email } = await request.json();
  // console.log(`logout POST name: ${nameRequest}, password: ${password}, email:${email}`);
  const body = await request.json() as UserDTO;

  if(!body || !body.id) {
    console.log(`logout, no id, try to clear jwt`)
    const res = NextResponse.json({ code: 0, message: 'success to clear jwt' })

    const cookieOptions = {
      httpOnly: true,
      secure: true
    };
    res.cookies.set('jwt', '', cookieOptions);
    console.log(`logout, no id, clear jwt to empty string`)

    return res;
  }

  try {
    const userFindFirst = await prisma.user.findFirst({
      where: {
        id: body.id,
      },
    });

    if (!userFindFirst) {
      console.log(`logout failed, prisma.user.findFirst return: ${JSON.stringify(userFindFirst)}`)
      return NextResponse.json({ code: -1, message: 'Failed to logout user.' });
    }
    console.log(`logout sucess, prisma.user.findFirst return: ${JSON.stringify(userFindFirst)}`)

    // Set the 'logined' flag to false
    await prisma.user.update({
      where: { id: userFindFirst.id },
      data: { logined: false },
    });
    console.log(`logout, prisma.user.logined set to false`)
    
    const userDTO = toUserDTO(userFindFirst);

    const res = NextResponse.json({ code: 0, message: 'success', data: userDTO })

    const cookieOptions = {
      httpOnly: true,
      secure: true
    };
    res.cookies.set('jwt', '', cookieOptions);
    console.log(`logout, clear jwt to empty string`)

    return res;

  } catch (error) {
    console.error('Error during user logout:', error);
    return NextResponse.json({ code: -1, message: 'Failed to logout user.' });
  }
}
