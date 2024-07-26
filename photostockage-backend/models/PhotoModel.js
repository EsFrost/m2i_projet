const { pool } = require('../utils/db')

function getActivePhotos() {
    return pool.query('SELECT * FROM photos WHERE status = true')
}

function getPhotos() {
    return pool.query('SELECT * FROM photos')
}

function getPhoto(id) {
    const req = `SELECT * FROM photos WHERE id = $1`
    return pool.query(req, [id])
}

function getUserPhotos(id) {
    const req = `SELECT * FROM photos WHERE user_id = $1`
    return pool.query(req, [id])
}

function getUserPhotoById(p_id, u_id) {
    const req = `SELECT * FROM photos WHERE id = $1 AND user_id = $2`
    return pool.query(req, [p_id, u_id])
}

module.exports = {
    getActivePhotos,
    getPhotos,
    getPhoto,
    getUserPhotos,
    getUserPhotoById
}