const request = require("supertest");
const app = require("../../index");
const { pool } = require("../../utils/db");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

let authToken;
let testPhotoId;

beforeAll(async () => {
  // Create test user
  const userId = uuidv4();
  await pool.query(
    "INSERT INTO users (id, username, email, password) VALUES ($1, $2, $3, $4)",
    [userId, "testuser", "test@test.com", "password123"]
  );

  // Create test photo
  testPhotoId = uuidv4();
  await pool.query(
    "INSERT INTO photos (id, user_id, name, description, path, status) VALUES ($1, $2, $3, $4, $5, $6)",
    [testPhotoId, userId, "Test Photo", "Description", "path/to/photo", true]
  );

  // Create test like
  const likeId = uuidv4();
  await pool.query(
    "INSERT INTO likes (id, id_user, id_photo) VALUES ($1, $2, $3)",
    [likeId, userId, testPhotoId]
  );

  authToken = jwt.sign(
    { id: userId, username: "testuser" },
    process.env.JWT_SECRET
  );
});

afterAll(async () => {
  await pool.query("TRUNCATE users, photos, likes CASCADE");
  await pool.end();
});

describe("Like Management", () => {
  describe("GET /likes/photo/:p_id", () => {
    it("returns photo likes count", async () => {
      const response = await request(app).get(`/likes/likes/${testPhotoId}`);

      expect(response.status).toBe(200);
      expect(response.body[0]).toHaveProperty("count");
      expect(parseInt(response.body[0].count)).toBe(1);
    });
  });

  describe("POST /likes/like/:id_photo", () => {
    it("prevents duplicate likes", async () => {
      const response = await request(app)
        .post(`/likes/like/${testPhotoId}`)
        .set("Cookie", [`token=${authToken}`]);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("warning");
    });
  });
});
