import { getDb } from './db';
import User from '../models/User';
import { UserRow } from '../models/interfaces';

export const createUser = async (name: string, email: string): Promise<User> => {
    const db = await getDb();
    console.log(name, email);
    const result = await db.run('INSERT INTO users (name, email) VALUES (?, ?)', [name, email]);
    return new User(name, email, result.lastID);
};

export const getUser = async (id: number): Promise<User | null> => {
    const db = await getDb();
    const row: UserRow | undefined = await db.get('SELECT * FROM users WHERE id = ?', [id]);
    if (row) {
        return new User(row.name, row.email, row.id);
    }
    return null;
};

export const updateUser = async (id: number, name: string, email: string): Promise<User | null> => {
    const db = await getDb();
    await db.run('UPDATE users SET name = ?, email = ? WHERE id = ?', [name, email, id]);
    const updatedRow: UserRow | undefined = await db.get('SELECT * FROM users WHERE id = ?', id);
    if (updatedRow) {
        return new User(updatedRow.name, updatedRow.email, updatedRow.id);
    }
    return null;
};

export const deleteUser = async (id: number): Promise<boolean> => {
    const db = await getDb();
    const result = await db.run('DELETE FROM users WHERE id = ?', id);

    // Check if result and result.changes are defined and valid
    if (result && typeof result.changes === 'number') {
        return result.changes > 0;
    } else {
        console.error('Unexpected result format:', result);
        return false;
    }
};

export const getAllUsers = async (): Promise<User[]> => {
    const db = await getDb();
    const rows: UserRow[] = await db.all('SELECT * FROM users');
    return rows.map(row => new User(row.name, row.email, row.id));
};
