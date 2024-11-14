// __tests__/integration/user.test.js
const request = require("supertest");
const app = require("../../index");
const { pool } = require("../../utils/db");
const jwt = require("jsonwebtoken");
require("dotenv").config();

describe("User Management", () => {
  let userId;
  let authToken;

  beforeAll(async () => {
    await pool.query("TRUNCATE users CASCADE");

    // Create test user directly in database
    userId = "550e8400-e29b-41d4-a716-446655440000";
    await pool.query(
      "INSERT INTO users (id, username, email, password) VALUES ($1, $2, $3, $4)",
      [userId, "testuser", "test@test.com", "hashedpassword"]
    );

    // Generate auth token
    authToken = jwt.sign(
      { id: userId, username: "testuser", email: "test@test.com" },
      process.env.JWT_SECRET
    );
  });

  afterAll(async () => {
    await pool.end();
  });

  describe("Profile Management", () => {
    it("updates profile successfully", async () => {
      const updatedProfile = {
        username: "updateduser",
        user_icon: "https://example.com/newicon.jpg",
      };

      const response = await request(app)
        .put(`/user/changeuser/${userId}`)
        .set("Cookie", [`token=${authToken}`])
        .send(updatedProfile);

      expect(response.status).toBe(200);
    });
  });
});
