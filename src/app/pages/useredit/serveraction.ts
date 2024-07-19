'use server';
import { UserAdd, UserDTO } from '@/app/dto/User';
import { PrismaClient, User } from '@prisma/client';
const prisma = new PrismaClient();

export async function serverActionfetchUsers(): Promise<string> {
    console.log("server action GET all users");
    const users = await prisma.user.findMany();
    return JSON.stringify(users);
}

export async function serverActionAddUser(UserAdd:UserAdd): Promise<string> {
    console.log("server action POST add user");
    const newUser = await prisma.user.create({
        data: UserAdd
    });
    return JSON.stringify(newUser);
}

export async function serverActionUpdateUser(user:UserDTO): Promise<string> {
    console.log("server action PUT update user");
    const updatedUser = await prisma.user.update({
        where: { id: user.id },
        data: user    
    });
    return JSON.stringify(updatedUser);
}

export async function serverActionDeleteUser(id:string): Promise<string> {
    console.log("server action DELETE delete user");
    const deletedUser = await prisma.user.delete({
        where: { id }
    });
    return JSON.stringify(deletedUser);
}
