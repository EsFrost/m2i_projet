const { pool } = require("../utils/db");

function getUserDownloads(u_id) {
  return pool.query(
    `
        SELECT * FROM downloads
        JOIN photos ON downloads.id_photo = photos.id
        WHERE id_user = $1`,
    [u_id]
  );
}

function addDownload(id, u_id, p_id) {
  return pool.query(
    `INSERT INTO downloads (id, id_user, id_photo) VALUES ($1, $2, $3) RETURNING (id_photo)`,
    [id, u_id, p_id]
  );
}

/* Helper function that returns all likes */
/* Pass the ids here to avoid fetching ALL of the data dummass */
function getAllDownloads() {
  return pool.query(`SELECT id_user, id_photo FROM downloads`);
}

module.exports = {
  getUserDownloads,
  addDownload,
  getAllDownloads,
};
