'use server';
import { UserAdd, UserDTO, toUserDTO } from '@/app/dto/User';
import { PrismaClient, User } from '@prisma/client';
const prisma = new PrismaClient();

export async function serverActionfetchUsers(): Promise<string> {
    console.log("server action GET all users");
    const users = await prisma.user.findMany();    
    const usersDTO = users.map(toUserDTO);
    console.log(JSON.stringify(usersDTO));
    return JSON.stringify(usersDTO);
}

export async function serverActionAddUser(UserAdd:UserAdd): Promise<string> {
    console.log("server action POST add user");
    const newUser = await prisma.user.create({
        data: UserAdd
    });
    const newUserDTO = toUserDTO(newUser);
    console.log(JSON.stringify(newUserDTO));
    return JSON.stringify(newUserDTO);
}

export async function serverActionUpdateUser(user:UserDTO): Promise<string> {
    console.log("server action PUT update user");
    const updatedUser = await prisma.user.update({
        where: { id: user.id },
        data: user    
    });
    const updatedUserDTO = toUserDTO(updatedUser);
    console.log(JSON.stringify(updatedUserDTO));
    return JSON.stringify(updatedUserDTO);
}

export async function serverActionDeleteUser(id:string): Promise<string> {
    console.log("server action DELETE delete user");
    const deletedUser = await prisma.user.delete({
        where: { id }
    });
    const deletedUserDTO = toUserDTO(deletedUser);
    console.log(JSON.stringify(deletedUserDTO));
    return JSON.stringify(deletedUserDTO);
}
