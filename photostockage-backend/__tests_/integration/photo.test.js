const request = require("supertest");
const app = require("../../index");
const { pool } = require("../../utils/db");
const jwt = require("jsonwebtoken");

let authToken;
let testUser;

beforeAll(async () => {
  // Create test user
  const userData = {
    username: "testuser",
    email: "test@example.com",
    password: "Test123",
  };

  const registerResponse = await request(app)
    .post("/user/register")
    .send(userData);

  authToken = registerResponse.body.token;
  testUser = registerResponse.body.user;
});

afterAll(async () => {
  await pool.query("TRUNCATE users, photos CASCADE");
  await pool.end();
});

describe("Photo Management", () => {
  describe("Photo Creation", () => {
    const testPhoto = {
      name: "Test Photo",
      description: "Test Description",
      path: "https://example.com/test.jpg",
      status: true,
    };

    it("should create a new photo successfully", async () => {
      const response = await request(app)
        .post("/photos/add_photo")
        .set("Cookie", [`token=${authToken}`])
        .send(testPhoto);

      expect(response.status).toBe(201);
    });

    it("should reject photo creation without auth", async () => {
      const response = await request(app)
        .post("/photos/add_photo")
        .send(testPhoto);

      expect(response.status).toBe(401);
    });
  });

  describe("Photo Retrieval", () => {
    it("should get active photos", async () => {
      const response = await request(app).get("/photos/photos");

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });
});
