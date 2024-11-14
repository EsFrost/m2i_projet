const { pool } = require("../utils/db");

function getPhotoComments(p_id) {
  return pool.query(
    `SELECT * FROM comments WHERE id_photo = $1 AND status = true`,
    [p_id]
  );
}

function getAllPhotoComments(p_id) {
  return pool.query(`SELECT * FROM comments WHERE id_photo = $1`, [p_id]);
}

function addComment(id, user_id, photo_id, content) {
  return pool.query(
    `INSERT INTO comments (id, id_user, id_photo, content) VALUES ($1, $2, $3, $4) RETURNING (id, id_photo)`,
    [id, user_id, photo_id, content]
  );
}

function deleteComment(comment_id, user_id) {
  return pool.query(
    `DELETE FROM comments WHERE id = $1 AND id_user = $2 RETURNING (id)`,
    [comment_id, user_id]
  );
}

function edtiComment(comment_id, user_id, content) {
  return pool.query(
    `UPDATE comments SET content = $1 WHERE id = $2 AND id_user = $3 RETURNING (id)`,
    [content, comment_id, user_id]
  );
}

// Helper function to check if the photo is active or not
function getPhotoStatus(photo_id) {
  return pool.query(`SELECT status FROM photos WHERE id = $1`, [photo_id]);
}

// Helper function to get details of comments
function getCommentDetails(comment_id) {
  return pool.query(`SELECT * FROM comments WHERE id = $1`, [comment_id]);
}

module.exports = {
  getPhotoComments,
  getAllPhotoComments,
  addComment,
  deleteComment,
  edtiComment,
  getPhotoStatus,
  getCommentDetails,
};
