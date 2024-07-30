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

function createPhoto(id, user_id, name, description, path, status) {
    const req = `INSERT INTO photos (id, user_id, name, description, path, status) VALUES ($1, $2, $3, $4, $5, $6)`
    return pool.query(req, [id, user_id, name, description, path, status])
}


function deletePhoto(id) {
    const req = `DELETE FROM photos WHERE id = $1`
    return pool.query(req, [id])
}

function editPhoto(name, description, status, id) {
    const req = `UPDATE photos SET name = $1, description = $2, status = $3 WHERE id = $4`
    return pool.query(req, [name, description, status, id])
}


module.exports = {
    getActivePhotos,
    getPhotos,
    getPhoto,
    getUserPhotos,
    getUserPhotoById,
    createPhoto,
    deletePhoto,
    editPhoto
}