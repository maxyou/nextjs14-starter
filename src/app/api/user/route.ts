import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import { createUser, getUser, updateUser, deleteUser, getAllUsers } from '../../lib/userRepository';
import { json } from 'micro';


export async function GET(request: NextRequest) {
    console.log("api GET");

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (id) {
        console.log(id);
        const user = await getUser(Number(id));
        if (user) {
            return NextResponse.json(user, { status: 200 });
        } else {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }
    } else {
        console.log("api GET all users");
        const users = await getAllUsers();
        return NextResponse.json(users, { status: 200 });
    }
}


export async function POST(request: NextRequest) {
    console.log("api POST");

    try {
        const body = await request.json();
        console.log(body.name, body.email);
        console.log(JSON.stringify(body));

        const newUser = await createUser(body.name, body.email);
        return NextResponse.json(newUser, { status: 201 });
    } catch (error) {
        console.error("Error parsing JSON:", error);
        return NextResponse.json({ message: 'Invalid request body' }, { status: 400 });
    }
}


export async function PUT(request: NextRequest) {
    console.log("api PUT");

    try {
        const body = await request.json();
        const { id, name, email } = body;

        if (!id) {
            return NextResponse.json({ message: 'User ID is required' }, { status: 400 });
        }

        const updatedUser = await updateUser(id, name, email);
        if (updatedUser) {
            return NextResponse.json(updatedUser, { status: 200 });
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
    console.log('delete id:'+id);

    if (!id) {
        return NextResponse.json({ message: 'User ID is required' }, { status: 400 });
    }

    const userDeleted = await deleteUser(Number(id));
    if (userDeleted) {
        return NextResponse.json({ message: 'User deleted successfully' }, { status: 200 });
    } else {
        return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }
}
