const { pool } = require('../utils/db')

function getPhotoComments(p_id) {
    return pool.query(
        `SELECT * FROM comments WHERE id_photo = $1 AND status = true`,
        [p_id]
    )
}

function getAllPhotoComments(p_id) {
    return pool.query(
        `SELECT * FROM comments WHERE id_photo = $1`,
        [p_id]
    )
}

module.exports = {
    getPhotoComments,
    getAllPhotoComments
}