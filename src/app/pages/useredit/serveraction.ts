'use server';
import { PrismaClient, User } from '@prisma/client';
const prisma = new PrismaClient();

export async function serverActionfetchUsers(): Promise<string> {
    console.log("server action GET all users");
    const users = await prisma.user.findMany();
    return JSON.stringify(users);
}


export async function serverActionAddUser(user:User): Promise<string> {
    console.log("server action POST add user");
    const newUser = await prisma.user.create({
        data: user
    });
    return JSON.stringify(user);
}

export async function serverActionUpdateUser(user:User): Promise<string> {
    console.log("server action PUT update user");
    const updatedUser = await prisma.user.update({
        where: { id: user.id },
        data: user    
    });
    return JSON.stringify(user);
}

export async function serverActionDeleteUser(id:string): Promise<string> {
    console.log("server action DELETE delete user");
    await prisma.user.delete({
        where: { id }
    });
    return JSON.stringify({id});
}
