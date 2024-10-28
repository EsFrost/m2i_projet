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
    `INSERT INTO categories (id, name, description) VALUES ($1, $2, $3)`,
    [id, name, description]
  );
}

/* Edit category, admin only */
function editCategory() {}

module.exports = {
  getCategories,
  createCategory,
  getCategoryById,
  getCategoryByName,
};
