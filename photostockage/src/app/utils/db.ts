import mysql from 'mysql2/promise'

export interface UserProps {
    user_id: number,
    username: string,
    email: string,
    password: string,
    user_icon?: string
}

export async function callUsers(query: string, data: UserProps[]) {
    try {
        const db = await mysql.createConnection({
            host: '127.0.0.1',
            port: 3306,
            database: 'test',
            user: 'root',
            password: '',
        })
        const [res] = await db.execute(query, data)
        await db.end()
        return res
    }
    catch (err) {
        console.log(err)
        return err
    }
}

/*

// Prepared statement that's safer than what's used above, will have to improve later

const mysql2Promise = require('mysql2/promise');

// Create a connection to the database
const dbConfig = {
  host: 'your_host',
  user: 'your_user',
  password: 'your_password',
  database: 'your_database'
};

const db = mysql2Promise.createPool(dbConfig);

// Prepare a query with a parameter
const query = 'SELECT * FROM your_table WHERE name = ?';
const params = ['John Doe'];

// Execute the query with the parameter
db.query(query, params)
  .then((results) => {
    console.log(results);
  })
  .catch((err) => {
    console.error(err);
  });

*/

/* 

// Example with zod implementation

import { z } from 'zod';
import { createPool } from 'mysql2/promise';

// Define your database schema using Zod
const User = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
});

// Create a MySQL pool
const pool = createPool({
  host: 'your_host',
  user: 'your_user',
  password: 'your_password',
  database: 'your_database',
});

// Use Zod to validate your data
const userData = {
  id: 1,
  name: 'John Doe',
  email: 'johndoe@example.com'
};

try {
  const validatedData = User.parse(userData);
  console.log(validatedData); // { id: 1, name: 'John Doe', email: 'johndoe@example.com' }

  // Use MySQL2 to interact with your database
  const results = await pool.query('SELECT * FROM users WHERE id = ?', [validatedData.id]);
  console.log(results);
} catch (error) {
  console.error(error);
}

*/