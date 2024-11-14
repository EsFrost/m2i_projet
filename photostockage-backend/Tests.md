# Jest Testing Guide for PhotoStockage Backend

## Introduction

This guide explains the test structure and implementation for our Node.js backend application using Jest and Supertest.

## Test Organization

### Directory Structure

```
__tests__/
├── integration/
│   ├── user.test.js
│   ├── comments.test.js
│   ├── likes.test.js
│   ├── photos.test.js
│   └── downloads.test.js
└── setup/
    └── testDb.js
```

### Key Components

- **Jest**: Testing framework
- **Supertest**: HTTP assertions library
- **Pool**: PostgreSQL connection pool
- **JWT**: JSON Web Tokens for authentication

## Test Setup Explained

```javascript
// Basic test file structure
const request = require("supertest");
const app = require("../../index");
const { pool } = require("../../utils/db");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

describe("Feature Group", () => {
  // Setup before tests
  beforeAll(async () => {
    // Database setup code
  });

  // Cleanup after tests
  afterAll(async () => {
    // Database cleanup code
  });

  describe("Specific Feature", () => {
    // Individual test cases
  });
});
```

### Important Concepts

#### 1. Test Lifecycle Hooks

- `beforeAll`: Runs once before all tests
- `afterAll`: Runs once after all tests
- `beforeEach`: Runs before each test
- `afterEach`: Runs after each test

```javascript
beforeAll(async () => {
  // Create test user
  const userId = uuidv4();
  await pool.query(
    "INSERT INTO users (id, username, email) VALUES ($1, $2, $3)",
    [userId, "testuser", "test@test.com"]
  );
});
```

#### 2. Test Structure

```javascript
describe("Feature", () => {
  it("should do something specific", async () => {
    // Arrange (setup)
    const testData = {
      /* ... */
    };

    // Act (perform action)
    const response = await request(app).post("/endpoint").send(testData);

    // Assert (verify results)
    expect(response.status).toBe(200);
  });
});
```

#### 3. Authentication Testing

```javascript
// Generate auth token for testing
const authToken = jwt.sign(
  { id: userId, username: "testuser" },
  process.env.JWT_SECRET
);

// Use token in requests
const response = await request(app)
  .post("/protected-endpoint")
  .set("Cookie", [`token=${authToken}`])
  .send(data);
```

## Common Jest Assertions

```javascript
// Status codes
expect(response.status).toBe(200);

// Response body
expect(response.body).toHaveProperty("token");
expect(Array.isArray(response.body)).toBe(true);
expect(response.body.message).toContain("success");

// Database checks
const dbResult = await pool.query("SELECT * FROM users WHERE id = $1", [
  userId,
]);
expect(dbResult.rows).toHaveLength(1);
```

## Database Testing

### Setup and Cleanup

```javascript
// Clear tables
await pool.query("TRUNCATE users CASCADE");

// Add test data
await pool.query("INSERT INTO users (...) VALUES (...)");

// Cleanup
await pool.end();
```

## Error Testing

```javascript
it("should handle invalid input", async () => {
  const response = await request(app)
    .post("/endpoint")
    .send({ invalid: "data" });

  expect(response.status).toBe(400);
  expect(response.body).toHaveProperty("error");
});
```

## Test Examples

### User Registration Test

```javascript
describe("User Registration", () => {
  it("registers new user successfully", async () => {
    const userData = {
      username: `testuser_${Date.now()}`,
      email: `test_${Date.now()}@test.com`,
      password: "Test123",
    };

    const response = await request(app).post("/user/register").send(userData);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("token");
  });
});
```

### Protected Route Test

```javascript
describe("Protected Routes", () => {
  it("requires authentication", async () => {
    const response = await request(app).get("/protected-route");

    expect(response.status).toBe(401);
  });

  it("allows access with valid token", async () => {
    const response = await request(app)
      .get("/protected-route")
      .set("Cookie", [`token=${validToken}`]);

    expect(response.status).toBe(200);
  });
});
```

## Running Tests

```bash
# Run all tests
npm test

# Run specific test file
npm test -- __tests__/integration/user.test.js

# Run tests in watch mode
npm run test:watch
```

## Best Practices

1. Use unique identifiers (timestamps, UUIDs) for test data
2. Clean up database after tests
3. Test both success and error cases
4. Keep tests independent
5. Use meaningful test descriptions
6. Mock external services when necessary
7. Test API endpoints with different authentication states
8. Verify database state after operations
9. Use appropriate timeout values for async operations
10. Follow the Arrange-Act-Assert pattern

## Common Pitfalls

- Not handling async operations properly
- Database connection leaks
- Dependency on test order
- Missing error cases
- Hardcoded test data
- Not cleaning up test data
- Inadequate authentication testing
