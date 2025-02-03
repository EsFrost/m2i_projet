// __tests__/integration/category.test.js
const request = require("supertest");
const app = require("../../index");
const { pool } = require("../../utils/db");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

let adminToken;
let userToken;

beforeAll(async () => {
  // Create admin user
  const adminData = {
    username: "admin",
    email: "admin@test.com",
    password: "Admin123",
    access_level: true,
  };

  await pool.query(
    "INSERT INTO users (id, username, email, password, access_level) VALUES ($1, $2, $3, $4, $5)",
    [
      uuidv4(),
      adminData.username,
      adminData.email,
      adminData.password,
      adminData.access_level,
    ]
  );

  // Create test category
  await pool.query(
    "INSERT INTO categories (id, name, description) VALUES ($1, $2, $3)",
    [uuidv4(), "Test Category", "Test Description"]
  );

  adminToken = jwt.sign(
    {
      username: adminData.username,
      email: adminData.email,
      access_level: true,
    },
    process.env.JWT_SECRET
  );

  // Create regular user
  const userData = {
    username: "user",
    email: "user@test.com",
    password: "User123",
  };

  await pool.query(
    "INSERT INTO users (id, username, email, password) VALUES ($1, $2, $3, $4)",
    [uuidv4(), userData.username, userData.email, userData.password]
  );

  userToken = jwt.sign(
    { username: userData.username, email: userData.email },
    process.env.JWT_SECRET
  );
});

afterAll(async () => {
  await pool.query("TRUNCATE users, categories CASCADE");
  await pool.end();
});

describe("Category Management", () => {
  describe("GET /categories", () => {
    it("returns all categories", async () => {
      const response = await request(app).get("/categories");

      expect(response.status).toBe(200);
      expect(response.body[0].name).toBe("Test Category");
    });
  });

  describe("POST /categories", () => {
    it("allows admin to create category", async () => {
      const response = await request(app)
        .post("/categories")
        .set("Cookie", [`token=${adminToken}`])
        .send({
          name: "New Category",
          description: "New Description",
        });

      expect(response.status).toBe(201);
    });

    it("prevents non-admin from creating category", async () => {
      const response = await request(app)
        .post("/categories")
        .set("Cookie", [`token=${userToken}`])
        .send({
          name: "New Category",
          description: "New Description",
        });

      expect(response.status).toBe(403);
    });
  });
});
