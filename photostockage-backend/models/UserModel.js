const { pool } = require('../utils/db')

function getUsers() {
    const req = `SELECT * FROM users`
    return pool.query(req)
}

function getUser(id) {
    const req = `SELECT * FROM users WHERE id = $1`
    return pool.query(req, [id])
}

function getUsername(id) {
    const req = `SELECT username FROM users WHERE id = $1`
    return pool.query(req, [id])
}

module.exports = { 
    getUsers,
    getUser,
    getUsername
}