const { pool } = require("../utils/db");

function getCategories() {
  return pool.query(`SELECT * FROM categories`);
}

/* Untested functionality */
function getCategoryById(id) {
  return pool.query(`SELECT * FROM categories WHERE id = $1`, [id]);
}

/* Untested functionality */
function getCategoryByName(name) {
  return pool.query(`SELECT * FROM categories WHERE name = $1`, [name]);
}

/* Untested functionality */
function createCategory(id, name, description) {
  return pool.query(
    `INSERT INTO categories (id, name, description) VALUES ($1, $2, $3) RETURNING (id, name)`,
    [id, name, description]
  );
}

/* Edit category, admin only */
function editCategory(id, name, description) {
  return pool.query(
    `UPDATE categories SET name = $1, description = $2 WHERE id = $3 RETURNING (id, name)`,
    [id, name, description]
  );
}

/* Delete category, admin only */
function deleteCategory(id) {
  return pool.query("DELETE FROM categories WHERE id = $1 RETURNING id", [id]);
}

module.exports = {
  getCategories,
  createCategory,
  getCategoryById,
  getCategoryByName,
  editCategory,
  deleteCategory,
};
