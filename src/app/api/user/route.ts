import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import { UserAdd, UserDTO, toUserDTO } from '@/app/dto/User';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
    console.log("api GET");

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (id) {
        console.log(`api GFT user by id:${id}`);
        const user = await prisma.user.findUnique({ where: { id } });
        if (user) {
            return NextResponse.json(toUserDTO(user), { status: 200 });
        } else {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }
    } else {
        console.log("api GET all users");
        const users = await prisma.user.findMany();
        const usersDTO = users.map(toUserDTO);
        return NextResponse.json(usersDTO, { status: 200 });
    }
}


export async function POST(request: NextRequest) {
    console.log("api POST");

    try {
        const body = await request.json() as UserAdd;
        // console.log(body.name, body.email);
        // console.log(JSON.stringify(body));

        const newUser = await prisma.user.create({
            data: body,
        });
        return NextResponse.json(toUserDTO(newUser), { status: 201 });
    } catch (error) {
        console.error("Error parsing JSON:", error);
        return NextResponse.json({ message: 'Invalid request body' }, { status: 400 });
    }
}


export async function PUT(request: NextRequest) {
    console.log("api PUT");

    try {
        const body = await request.json() as UserDTO;
        if (!body.id) {
            return NextResponse.json({ message: 'User ID is required' }, { status: 400 });
        }

        const updatedUser = await prisma.user.update({
            where: { id: body.id },
            data: body,
        });
        if (updatedUser) {
            return NextResponse.json(toUserDTO(updatedUser), { status: 200 });
        } else {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }
    } catch (error) {
        console.error("Error parsing JSON:", error);
        return NextResponse.json({ message: 'Invalid request body' }, { status: 400 });
    }
}

export async function DELETE(request: NextRequest) {
    console.log("api DELETE");

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    console.log('delete id:' + id);

    if (!id) {
        return NextResponse.json({ message: 'User ID is required' }, { status: 400 });
    }

    const userDeleted = await prisma.user.delete({ where: { id } });
    if (userDeleted) {
        return NextResponse.json({ message: 'User deleted successfully' }, { status: 200 });
    } else {
        return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }
}
