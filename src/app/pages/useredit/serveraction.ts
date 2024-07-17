'use server';
import { createUser, getUser, updateUser, deleteUser, getAllUsers } from '../../lib/userRepository';
import User from '../../dto/User';

export async function serverActionfetchUsers(): Promise<string> {
    console.log("server action GET all users");
    const users = await getAllUsers();
    return JSON.stringify(users);
}


export async function serverActionAddUser(user:User): Promise<string> {
    console.log("server action POST add user");
    const newUser = await createUser(user.name, user.email);
    return JSON.stringify(user);
}

export async function serverActionUpdateUser(user:User): Promise<string> {
    console.log("server action PUT update user");
    const updatedUser = await updateUser(user.id!, user.name, user.email);
    return JSON.stringify(user);
}

export async function serverActionDeleteUser(id:number): Promise<string> {
    console.log("server action DELETE delete user");
    await deleteUser(id);
    return JSON.stringify({id});
}
