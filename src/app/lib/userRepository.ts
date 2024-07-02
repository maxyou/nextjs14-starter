import { getDb } from './db';
import User from '../models/User';
import { UserRow } from '../models/interfaces';

export const createUser = async (name: string, email: string): Promise<User> => {
    const db = getDb();
    const result = await db.run('INSERT INTO users (name, email) VALUES (?, ?)', [name, email]);
    return new User(name, email, result.lastID);
};

export const getUser = async (id: number): Promise<User | null> => {
    const db = getDb();
    const row: UserRow | undefined = await db.get('SELECT * FROM users WHERE id = ?', [id]);
    if (row) {
        return new User(row.name, row.email, row.id);
    }
    return null;
};

export const updateUser = async (id: number, name: string, email: string): Promise<void> => {
    const db = getDb();
    await db.run('UPDATE users SET name = ?, email = ? WHERE id = ?', [name, email, id]);
};

export const deleteUser = async (id: number): Promise<void> => {
    const db = getDb();
    await db.run('DELETE FROM users WHERE id = ?', [id]);
};

export const getAllUsers = async (): Promise<User[]> => {
    const db = getDb();
    const rows: UserRow[] = await db.all('SELECT * FROM users');
    return rows.map(row => new User(row.name, row.email, row.id));
};
