# PhotoStockage Backend Documentation

## Table of Contents

1. [Project Overview](#project-overview)
2. [System Architecture](#system-architecture)
3. [Getting Started](#getting-started)
4. [API Reference](#api-reference)
5. [Database Schema](#database-schema)
6. [Authentication & Authorization](#authentication--authorization)
7. [Security Features](#security-features)
8. [Testing](#testing)
9. [Error Handling](#error-handling)

## Project Overview

PhotoStockage is a secure backend service for managing photo storage and sharing. It provides a RESTful API that handles user management, photo uploads, social interactions (likes, comments), and content categorization.

### Key Features

- User authentication and authorization
- Photo management (upload, edit, delete)
- Social features (likes, comments)
- Download tracking
- Category management
- Admin functionality

### Tech Stack

- Node.js
- Express.js
- PostgreSQL
- JWT for authentication
- Jest for testing

## System Architecture

### Core Components

1. **Server Configuration (index.js)**

   - Express application setup
   - Middleware configuration
   - Route registration
   - CORS and security settings

2. **Middleware Layer (middleware/)**

   - Authentication validation
   - Admin access control
   - Rate limiting
   - Security headers (Helmet)

3. **Controllers Layer (controllers/)**

   - Business logic implementation
   - Request handling
   - Response formatting
   - Error management

4. **Models Layer (models/)**

   - Database interactions
   - Data validation
   - Query execution

5. **Routes Layer (routes/)**
   - API endpoint definitions
   - Route protection
   - Request routing

### Directory Structure

```
├── controllers/
│   ├── CategoriesController.js
│   ├── CommentsController.js
│   ├── DownloadsController.js
│   ├── LikesController.js
│   ├── PhotoController.js
│   └── UserController.js
├── middleware/
│   └── authMiddleware.js
├── models/
│   ├── CategoriesModel.js
│   ├── CommentsModel.js
│   ├── DownloadsModel.js
│   ├── LikesModel.js
│   ├── PhotoModel.js
│   └── UserModel.js
├── routes/
│   ├── categoriesRoute.js
│   ├── commentsRoute.js
│   ├── downloadsRoute.js
│   ├── likesRoute.js
│   ├── photoRoute.js
│   └── userRoute.js
├── utils/
│   └── db.js
└── index.js
```

## Getting Started

### Prerequisites

- Node.js v12 or higher
- PostgreSQL 12 or higher
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```env
DATABASE_URL=postgresql://username:password@localhost:5432/database
JWT_SECRET=your_jwt_secret
NODE_ENV=development
```

4. Start the server:

```bash
npm start
```

## API Reference

### User Management

#### Register User

```http
POST /user/register
Content-Type: application/json

{
  "username": "string",
  "email": "string",
  "password": "string",
  "user_icon": "string" (optional)
}
```

#### Login

```http
POST /user/login
Content-Type: application/json

{
  "email": "string",
  "password": "string"
}
```

### Photo Management

#### Upload Photo

```http
POST /photos/add_photo
Authorization: Bearer token
Content-Type: application/json

{
  "name": "string",
  "description": "string",
  "path": "string",
  "status": boolean
}
```

#### Get Photos

```http
GET /photos/photos
```

### Categories

#### Create Category (Admin only)

```http
POST /categories
Authorization: Bearer token
Content-Type: application/json

{
  "name": "string",
  "description": "string"
}
```

## Database Schema

### Users Table

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  user_icon VARCHAR(255),
  access_level BOOLEAN DEFAULT FALSE
);
```

### Photos Table

```sql
CREATE TABLE photos (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  path VARCHAR(255),
  status BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Authentication & Authorization

### JWT Implementation

- Tokens generated upon login/registration
- 30-day expiration
- Stored in HTTP-only cookies
- Contains user ID, username, email, and access level

### Middleware Protection

```javascript
const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }
  // Token verification and user attachment to request
};
```

## Security Features

1. **Input Sanitization**

   - HTML sanitization using `sanitize-html`
   - Data validation with `validator`

2. **Rate Limiting**

   - 100 requests per 15 minutes per IP

3. **Security Headers**

   - Helmet middleware implementation
   - XSS protection
   - Content Security Policy
   - Frame protection

4. **Password Security**
   - Bcrypt hashing
   - Salt rounds: 10

## Testing

### Test Structure

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

### Running Tests

```bash
npm test
```

### Coverage Areas

- User authentication
- CRUD operations
- Permission validation
- Error handling
- Input validation

## Error Handling

### Standard Error Response Format

```javascript
{
  error: string,
  details?: string,
  message?: string
}
```

### HTTP Status Codes

- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error
