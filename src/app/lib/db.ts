import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';

let db: Database<sqlite3.Database, sqlite3.Statement>;

export const initDb = async () => {
    console.log("initDb");
    db = await open({
        filename: 'database.db',
        driver: sqlite3.Database
    });

    await db.exec(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL
        );
    `);
    // console.log("after initDb");
    // console.log(db);
    // console.log("after print db");
};

export const getDb = async () => {
    if (!db) {
        // throw new Error('Database not initialized');
        await initDb();        
    }
    // console.log("getDb");
    // console.log(db);
    // console.log("after getDb print db");
    return db
};
