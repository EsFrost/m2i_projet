const { pool } = require("../utils/db");

function getUsers() {
  return pool.query(`SELECT * FROM users`);
}

function getUser(id) {
  const req = `SELECT * FROM users WHERE id = $1`;
  return pool.query(req, [id]);
}

function getUserByEmail(email) {
  const req = `SELECT * FROM users WHERE email = $1`;
  return pool.query(req, [email]);
}

function getUsername(id) {
  const req = `SELECT username FROM users WHERE id = $1`;
  return pool.query(req, [id]);
}

function newUser(id, username, email, password, user_icon) {
  const req = `INSERT INTO users (id, username, email, password, user_icon) VALUES ($1, $2, $3, $4, $5) RETURNING (username)`;
  return pool.query(req, [id, username, email, password, user_icon]);
}

function deleteUser(email) {
  const req = `DELETE FROM users WHERE email = $1 RETURNING (username)`;
  return pool.query(req, [email]);
}

function editUser(username, user_icon, id) {
  const req = `UPDATE users SET username = $1, user_icon = $2 WHERE id = $3 RETURNING (username)`;
  return pool.query(req, [username, user_icon, id]);
}

async function editPassword(password, email) {
  const req = `UPDATE users SET password = $1 WHERE email = $2 RETURNING (username)`;
  return pool.query(req, [password, email]);
}

module.exports = {
  getUsers,
  getUser,
  getUsername,
  newUser,
  getUserByEmail,
  deleteUser,
  editUser,
  editPassword,
};
