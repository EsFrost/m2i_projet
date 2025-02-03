const { pool } = require("../utils/db");

function addPhotoCategory(id, photo_id, category_id) {
  return pool.query(
    `INSERT INTO photos_categories (id, id_photo, id_category) 
     VALUES ($1, $2, $3)`,
    [id, photo_id, category_id]
  );
}

function getPhotoCategory(photo_id) {
  return pool.query(
    `SELECT c.* FROM categories c 
     JOIN photos_categories pc ON c.id = pc.id_category 
     WHERE pc.id_photo = $1`,
    [photo_id]
  );
}

function getCategoryPhotos(category_id) {
  return pool.query(
    `SELECT p.* FROM photos p 
     JOIN photos_categories pc ON p.id = pc.id_photo 
     WHERE pc.id_category = $1 AND p.status = true`,
    [category_id]
  );
}

module.exports = {
  addPhotoCategory,
  getPhotoCategory,
  getCategoryPhotos,
};
