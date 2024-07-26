const { pool } = require('../utils/db')

function getActivePhotos() {
    return pool.query('SELECT * FROM photos WHERE status = true')
}

function getPhotos() {
    return pool.query('SELECT * FROM photos')
}

module.exports = {
    getActivePhotos,
    getPhotos
}