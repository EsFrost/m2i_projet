// __tests__/integration/downloads.test.js
const request = require("supertest");
const app = require("../../index");
const { pool } = require("../../utils/db");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

let authToken;
let testUser;
let testPhoto;

beforeAll(async () => {
  // Create test user with unique username
  const userId = uuidv4();
  const timestamp = Date.now();
  testUser = {
    id: userId,
    username: `testuser_${timestamp}`,
    email: `test_${timestamp}@test.com`,
  };

  await pool.query(
    "INSERT INTO users (id, username, email, password) VALUES ($1, $2, $3, $4)",
    [userId, testUser.username, testUser.email, "hashedpassword"]
  );

  // Create test photo
  const photoId = uuidv4();
  testPhoto = {
    id: photoId,
    name: "Test Photo",
    path: "/test/path.jpg",
    description: "Test description",
  };

  await pool.query(
    "INSERT INTO photos (id, user_id, name, path, description, status) VALUES ($1, $2, $3, $4, $5, $6)",
    [
      photoId,
      userId,
      testPhoto.name,
      testPhoto.path,
      testPhoto.description,
      true,
    ]
  );

  authToken = jwt.sign(testUser, process.env.JWT_SECRET);
});

afterAll(async () => {
  await pool.query("TRUNCATE users, photos, downloads CASCADE");
  await pool.end();
});

describe("Downloads Management", () => {
  describe("POST /downloads/download/:id_photo", () => {
    it("adds download successfully", async () => {
      const response = await request(app)
        .post(`/downloads/download/${testPhoto.id}`)
        .set("Cookie", [`token=${authToken}`]);

      expect(response.status).toBe(201);
    });
  });

  describe("GET /downloads/user/:u_id", () => {
    it("returns user downloads", async () => {
      const response = await request(app)
        .get(`/downloads/user/${testUser.id}`)
        .set("Cookie", [`token=${authToken}`]);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });
});
