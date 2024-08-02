const { Pool } = require('pg')
require('dotenv').config()

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
})

/* Connection test */

// async function testConnection() {
//     try {
//         // Connect to the database
//         const test = await pool.query('SELECT * FROM users');
//         console.log(test.rows);
//     } catch (err) {
//         console.error('Error connecting to the database:', err.message);
//     }
// }

// testConnection();

module.exports = {
    pool
}