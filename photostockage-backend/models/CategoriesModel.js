const { pool } = require('../utils/db')

function getCategories() {
    return pool.query(`SELECT * FROM categories`)
}

function createCategory(id, name, description) {
    return pool.query(`INSERT INTO categories (id, name, description) VALUES ($1, $2, $3)`, [id, name, description])
}

module.exports = {
    getCategories,
    createCategory
}