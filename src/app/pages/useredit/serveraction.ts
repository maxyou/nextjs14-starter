'use server';
import { UserAdd, UserDTO, toUserDTO } from '@/app/dto/User';
import { PrismaClient, User } from '@prisma/client';
const prisma = new PrismaClient();

export async function serverActionfetchUsers(): Promise<string> {
    console.log("server action GET all users");
    const users = await prisma.user.findMany();    
    console.log(users);
    console.log(JSON.stringify(users));
    const usersDTO = users.map(toUserDTO);
    return JSON.stringify(usersDTO);
}

export async function serverActionAddUser(UserAdd:UserAdd): Promise<string> {
    console.log("server action POST add user");
    const newUser = await prisma.user.create({
        data: UserAdd
    });
    const newUserDTO = toUserDTO(newUser);
    return JSON.stringify(newUserDTO);
}

export async function serverActionUpdateUser(user:UserDTO): Promise<string> {
    console.log("server action PUT update user");
    const updatedUser = await prisma.user.update({
        where: { id: user.id },
        data: user    
    });
    const updatedUserDTO = toUserDTO(updatedUser);
    return JSON.stringify(updatedUserDTO);
}

export async function serverActionDeleteUser(id:string): Promise<string> {
    console.log("server action DELETE delete user");
    const deletedUser = await prisma.user.delete({
        where: { id }
    });
    const deletedUserDTO = toUserDTO(deletedUser);
    return JSON.stringify(deletedUserDTO);
}
