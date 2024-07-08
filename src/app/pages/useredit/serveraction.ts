'use server';
import { createUser, getUser, updateUser, deleteUser, getAllUsers } from '../../lib/userRepository';
import User from '../../models/User';

export async function serverActionfetchUsers(): Promise<string> {
    console.log("server action GET all users");
    const users = await getAllUsers();
    return JSON.stringify(users);
}