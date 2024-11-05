const { pool } = require("../utils/db");

/* Returns all the photos the user has liked */
/* Change star to specific fields due to memory leaks! */
function getUserLikes(u_id) {
  return pool.query(
    `
        SELECT * FROM likes l
        JOIN photos p ON l.id_photo = p.id
        WHERE l.id_user = $1`,
    [u_id]
  );
}

/* Should return the username of people that liked the photo */
/* Change star to specific fields due to memory leaks! */
function getPhotoLikes(p_id) {
  return pool.query(
    `
        SELECT * FROM likes l
        JOIN users u ON l.id_user = u.id
        WHERE l.id_photo = $1`,
    [p_id]
  );
}

/* Returns the number of likes on a specific photo */
function countPhotoLikes(p_id) {
  return pool.query(
    `SELECT COUNT(*) FROM likes l
    JOIN photos p ON l.id_photo = p.id
    WHERE l.id_photo = $1`,
    [p_id]
  );
}

/* Unlike photo */
function unlikePhoto(u_id, p_id) {
  return pool.query(
    `DELETE FROM likes WHERE id_user = $1 AND id_photo = $2 RETURNING (id_photo)`,
    [u_id, p_id]
  );
}

/* Like photo */
function likePhoto(id, u_id, p_id) {
  return pool.query(
    `INSERT INTO likes (id, id_user, id_photo) VALUES ($1, $2, $3) RETURNING (id_photo)`,
    [id, u_id, p_id]
  );
}

/* Helper function that returns all likes */
/* Pass the ids here to avoid fetching ALL of the data dummass */
function getAllLikes() {
  return pool.query(`SELECT id_user, id_photo FROM likes`);
}

module.exports = {
  getUserLikes,
  getPhotoLikes,
  countPhotoLikes,
  likePhoto,
  getAllLikes,
  unlikePhoto,
};
