const { pool } = require('../utils/db')

function getCategories() {
    return pool.query(`SELECT * FROM categories`)
}

module.exports = {
    getCategories
}