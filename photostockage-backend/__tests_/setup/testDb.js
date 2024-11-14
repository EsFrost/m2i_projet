// __tests__/setup/testDb.js
const { pool } = require("../../utils/db");

async function cleanDatabase() {
  await pool.query(
    "TRUNCATE users, photos, comments, likes, downloads, categories CASCADE"
  );
}

async function seedTestData() {
  // Create test admin user
  const adminUser = await pool.query(
    `
    INSERT INTO users (id, username, email, password, access_level)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *`,
    [
      "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11",
      "admin",
      "admin@test.com",
      "$2a$10$fakehashedpassword",
      true,
    ]
  );

  // Create test regular user
  const regularUser = await pool.query(
    `
    INSERT INTO users (id, username, email, password)
    VALUES ($1, $2, $3, $4)
    RETURNING *`,
    [
      "b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11",
      "user",
      "user@test.com",
      "$2a$10$fakehashedpassword",
    ]
  );

  // Create test category
  const category = await pool.query(
    `
    INSERT INTO categories (id, name, description)
    VALUES ($1, $2, $3)
    RETURNING *`,
    [
      "c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11",
      "Test Category",
      "Test Description",
    ]
  );

  // Create test photo
  const photo = await pool.query(
    `
    INSERT INTO photos (id, user_id, name, description, path, status)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *`,
    [
      "d0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11",
      regularUser.rows[0].id,
      "Test Photo",
      "Test Photo Description",
      "https://example.com/test.jpg",
      true,
    ]
  );

  return {
    adminUser: adminUser.rows[0],
    regularUser: regularUser.rows[0],
    category: category.rows[0],
    photo: photo.rows[0],
  };
}

module.exports = {
  cleanDatabase,
  seedTestData,
};
