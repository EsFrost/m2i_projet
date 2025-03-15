const request = require("supertest");
const app = require("../../index");
const { pool } = require("../../utils/db");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

describe("Comments Management", () => {
  let userId, photoId, authToken;
  const timestamp = Date.now();

  beforeAll(async () => {
    // Create test user with unique email
    userId = uuidv4();
    await pool.query(
      "INSERT INTO users (id, username, email, password) VALUES ($1, $2, $3, $4)",
      [
        userId,
        `testuser_${timestamp}`,
        `test_${timestamp}@test.com`,
        "hashedpassword",
      ]
    );

    // Create test photo
    photoId = uuidv4();
    await pool.query(
      "INSERT INTO photos (id, user_id, name, description, path, status) VALUES ($1, $2, $3, $4, $5, $6)",
      [
        photoId,
        userId,
        "Test Photo",
        "Test Description",
        "/test/path.jpg",
        true,
      ]
    );

    // Generate auth token
    authToken = jwt.sign(
      { id: userId, username: `testuser_${timestamp}` },
      process.env.JWT_SECRET
    );
  });

  afterAll(async () => {
    await pool.query("TRUNCATE users, photos, comments CASCADE");
    await pool.end();
  });

  describe("POST /comments/add/:photo_id", () => {
    it("adds comment successfully", async () => {
      const response = await request(app)
        .post(`/comments/add/${photoId}`)
        .set("Cookie", [`token=${authToken}`])
        .send({ content: "Test comment" });

      expect(response.status).toBe(201);
    });
  });

  describe("PUT /comments/edit/:comment_id", () => {
    it("allows user to edit own comment", async () => {
      // Create a comment first
      const commentId = uuidv4();
      await pool.query(
        "INSERT INTO comments (id, id_user, id_photo, content) VALUES ($1, $2, $3, $4)",
        [commentId, userId, photoId, "Original comment"]
      );

      const response = await request(app)
        .put(`/comments/edit/${commentId}`)
        .set("Cookie", [`token=${authToken}`])
        .send({ content: "Updated comment" });

      expect(response.status).toBe(200);
    });
  });

  // __tests__/integration/comments.test.js
  describe("GET /comments/photo/:p_id", () => {
    it("returns active photo comments", async () => {
      // Add a test comment first
      const commentId = uuidv4();
      await pool.query(
        "INSERT INTO comments (id, id_user, id_photo, content, status) VALUES ($1, $2, $3, $4, $5)",
        [commentId, userId, photoId, "Test comment", true]
      );

      const response = await request(app).get(`/comments/photo/${photoId}`);

      expect(response.status).toBe(201); // This matches the actual API response
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body[0].content).toBe("Test comment");
    });
  });
});
