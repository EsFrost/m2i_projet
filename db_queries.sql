--- Table creation ---
DROP TABLE IF EXISTS Users CASCADE;
DROP TABLE IF EXISTS Photos CASCADE;
DROP TABLE IF EXISTS Likes CASCADE;
DROP TABLE IF EXISTS Comments CASCADE;
DROP TABLE IF EXISTS Downloads CASCADE;
DROP TABLE IF EXISTS Categories CASCADE;
DROP TABLE IF EXISTS Photos_Categories CASCADE;

CREATE TABLE Users (
    id TEXT PRIMARY KEY,
    username VARCHAR(25) UNIQUE NOT NULL,
    email VARCHAR(30) UNIQUE NOT NULL,
    password TEXT NOT NULL,  -- Changed to TEXT for bcrypt hashes
    access_level BOOLEAN DEFAULT false,
    user_icon TEXT
);

CREATE TABLE Photos (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    name VARCHAR(50) NOT NULL,
    description TEXT,
    path TEXT NOT NULL,
    status BOOLEAN DEFAULT false,
    FOREIGN KEY (user_id) REFERENCES Users(id)
    ON DELETE CASCADE
);

CREATE TABLE Likes (
    id TEXT PRIMARY KEY,
    id_photo TEXT,
    id_user TEXT,
    FOREIGN KEY (id_photo) REFERENCES Photos(id),
    FOREIGN KEY (id_user) REFERENCES Users(id)
    ON DELETE CASCADE
);

CREATE TABLE Downloads (
    id TEXT PRIMARY KEY,
    id_photo TEXT,
    id_user TEXT,
    FOREIGN KEY (id_photo) REFERENCES Photos(id),
    FOREIGN KEY (id_user) REFERENCES Users(id)
    ON DELETE CASCADE
);

CREATE TABLE Comments (
    id TEXT PRIMARY KEY,
    content TEXT NOT NULL,
    id_photo TEXT,
    id_user TEXT,
    status BOOLEAN DEFAULT false,
    FOREIGN KEY (id_photo) REFERENCES Photos(id),
    FOREIGN KEY (id_user) REFERENCES Users(id)
    ON DELETE CASCADE
);

CREATE TABLE Categories (
    id TEXT PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    description TEXT NOT NULL
);

CREATE TABLE Photos_Categories (
    id TEXT PRIMARY KEY,
    id_photo TEXT,
    id_category TEXT,
    FOREIGN KEY (id_photo) REFERENCES Photos(id),
    FOREIGN KEY (id_category) REFERENCES Categories(id)
    ON DELETE CASCADE  -- Added CASCADE
);

--- Edit character limit constrain on name column in Categories table ---
ALTER TABLE Categories ALTER COLUMN name TYPE VARCHAR(100);

--- Insert data into Users table ---
-- All passwords are hashed versions of 'password123' using bcrypt
INSERT INTO Users (id, username, email, password, access_level, user_icon) VALUES
('550e8400-e29b-41d4-a716-446655440000', 'user1', 'user1@example.com', '$2a$10$6gvxYYVxZJ2uF4cdhkFZ.eZ896YU9Z0z6LrJ8TdI7YqJ0TwzR/HUi', true, ''),
('550e8400-e29b-41d4-a716-446655440001', 'user2', 'user2@example.com', '$2a$10$6gvxYYVxZJ2uF4cdhkFZ.eZ896YU9Z0z6LrJ8TdI7YqJ0TwzR/HUi', false, ''),
('550e8400-e29b-41d4-a716-446655440002', 'user3', 'user3@example.com', '$2a$10$6gvxYYVxZJ2uF4cdhkFZ.eZ896YU9Z0z6LrJ8TdI7YqJ0TwzR/HUi', false, ''),
('550e8400-e29b-41d4-a716-446655440003', 'user4', 'user4@example.com', '$2a$10$6gvxYYVxZJ2uF4cdhkFZ.eZ896YU9Z0z6LrJ8TdI7YqJ0TwzR/HUi', true, ''),
('550e8400-e29b-41d4-a716-446655440004', 'user5', 'user5@example.com', '$2a$10$6gvxYYVxZJ2uF4cdhkFZ.eZ896YU9Z0z6LrJ8TdI7YqJ0TwzR/HUi', false, ''),
('550e8400-e29b-41d4-a716-446655440005', 'user6', 'user6@example.com', '$2a$10$6gvxYYVxZJ2uF4cdhkFZ.eZ896YU9Z0z6LrJ8TdI7YqJ0TwzR/HUi', false, ''),
('550e8400-e29b-41d4-a716-446655440006', 'user7', 'user7@example.com', '$2a$10$6gvxYYVxZJ2uF4cdhkFZ.eZ896YU9Z0z6LrJ8TdI7YqJ0TwzR/HUi', true, ''),
('550e8400-e29b-41d4-a716-446655440007', 'user8', 'user8@example.com', '$2a$10$6gvxYYVxZJ2uF4cdhkFZ.eZ896YU9Z0z6LrJ8TdI7YqJ0TwzR/HUi', false, ''),
('550e8400-e29b-41d4-a716-446655440008', 'user9', 'user9@example.com', '$2a$10$6gvxYYVxZJ2uF4cdhkFZ.eZ896YU9Z0z6LrJ8TdI7YqJ0TwzR/HUi', true, ''),
('550e8400-e29b-41d4-a716-446655440009', 'user10', 'user10@example.com', '$2a$10$6gvxYYVxZJ2uF4cdhkFZ.eZ896YU9Z0z6LrJ8TdI7YqJ0TwzR/HUi', false, '');

--- Insert data into Photos table ---
INSERT INTO Photos (id, user_id, name, description, status, path) VALUES
('660e8400-e29b-41d4-a716-446655440000', '550e8400-e29b-41d4-a716-446655440000', 'Photo1', 'Description1', true, 'path/to/photo1.jpg'),
('660e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', 'Photo2', 'Description2', false, 'path/to/photo2.jpg'),
('660e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440002', 'Photo3', 'Description3', true, 'path/to/photo3.jpg'),
('660e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440003', 'Photo4', 'Description4', false, 'path/to/photo4.jpg'),
('660e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440004', 'Photo5', 'Description5', true, 'path/to/photo5.jpg'),
('660e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440005', 'Photo6', 'Description6', false, 'path/to/photo6.jpg'),
('660e8400-e29b-41d4-a716-446655440006', '550e8400-e29b-41d4-a716-446655440006', 'Photo7', 'Description7', true, 'path/to/photo7.jpg'),
('660e8400-e29b-41d4-a716-446655440007', '550e8400-e29b-41d4-a716-446655440007', 'Photo8', 'Description8', false, 'path/to/photo8.jpg'),
('660e8400-e29b-41d4-a716-446655440008', '550e8400-e29b-41d4-a716-446655440008', 'Photo9', 'Description9', true, 'path/to/photo9.jpg'),
('660e8400-e29b-41d4-a716-446655440009', '550e8400-e29b-41d4-a716-446655440009', 'Photo10', 'Description10', false, 'path/to/photo10.jpg');

--- Insert data into Likes table ---
INSERT INTO Likes (id, id_photo, id_user) VALUES
('770e8400-e29b-41d4-a716-446655440000', '660e8400-e29b-41d4-a716-446655440000', '550e8400-e29b-41d4-a716-446655440001'),
('770e8400-e29b-41d4-a716-446655440001', '660e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440002'),
('770e8400-e29b-41d4-a716-446655440002', '660e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440003'),
('770e8400-e29b-41d4-a716-446655440003', '660e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440004'),
('770e8400-e29b-41d4-a716-446655440004', '660e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440005'),
('770e8400-e29b-41d4-a716-446655440005', '660e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440006'),
('770e8400-e29b-41d4-a716-446655440006', '660e8400-e29b-41d4-a716-446655440006', '550e8400-e29b-41d4-a716-446655440007'),
('770e8400-e29b-41d4-a716-446655440007', '660e8400-e29b-41d4-a716-446655440007', '550e8400-e29b-41d4-a716-446655440008'),
('770e8400-e29b-41d4-a716-446655440008', '660e8400-e29b-41d4-a716-446655440008', '550e8400-e29b-41d4-a716-446655440009'),
('770e8400-e29b-41d4-a716-446655440009', '660e8400-e29b-41d4-a716-446655440009', '550e8400-e29b-41d4-a716-446655440000');

--- Insert data into Downloads table ---
INSERT INTO Downloads (id, id_photo, id_user) VALUES
('880e8400-e29b-41d4-a716-446655440000', '660e8400-e29b-41d4-a716-446655440000', '550e8400-e29b-41d4-a716-446655440002'),
('880e8400-e29b-41d4-a716-446655440001', '660e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440003'),
('880e8400-e29b-41d4-a716-446655440002', '660e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440004'),
('880e8400-e29b-41d4-a716-446655440003', '660e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440005'),
('880e8400-e29b-41d4-a716-446655440004', '660e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440006'),
('880e8400-e29b-41d4-a716-446655440005', '660e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440007'),
('880e8400-e29b-41d4-a716-446655440006', '660e8400-e29b-41d4-a716-446655440006', '550e8400-e29b-41d4-a716-446655440008'),
('880e8400-e29b-41d4-a716-446655440007', '660e8400-e29b-41d4-a716-446655440007', '550e8400-e29b-41d4-a716-446655440009'),
('880e8400-e29b-41d4-a716-446655440008', '660e8400-e29b-41d4-a716-446655440008', '550e8400-e29b-41d4-a716-446655440000'),
('880e8400-e29b-41d4-a716-446655440009', '660e8400-e29b-41d4-a716-446655440009', '550e8400-e29b-41d4-a716-446655440001');

--- Insert data into Comments table ---
INSERT INTO Comments (id, content, id_photo, id_user, status) VALUES
('990e8400-e29b-41d4-a716-446655440000', 'Great photo!', '660e8400-e29b-41d4-a716-446655440000', '550e8400-e29b-41d4-a716-446655440001', true),
('990e8400-e29b-41d4-a716-446655440001', 'Amazing shot!', '660e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440002', false),
('990e8400-e29b-41d4-a716-446655440002', 'Nice angle.', '660e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440003', true),
('990e8400-e29b-41d4-a716-446655440003', 'Beautiful colors!', '660e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440004', false),
('990e8400-e29b-41d4-a716-446655440004', 'Stunning!', '660e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440005', true),
('990e8400-e29b-41d4-a716-446655440005', 'I love it!', '660e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440006', false),
('990e8400-e29b-41d4-a716-446655440006', 'Great capture!', '660e8400-e29b-41d4-a716-446655440006', '550e8400-e29b-41d4-a716-446655440007', true),
('990e8400-e29b-41d4-a716-446655440007', 'So cool!', '660e8400-e29b-41d4-a716-446655440007', '550e8400-e29b-41d4-a716-446655440008', false),
('990e8400-e29b-41d4-a716-446655440008', 'Fantastic!', '660e8400-e29b-41d4-a716-446655440008', '550e8400-e29b-41d4-a716-446655440009', true),
('990e8400-e29b-41d4-a716-446655440009', 'Love this!', '660e8400-e29b-41d4-a716-446655440009', '550e8400-e29b-41d4-a716-446655440000', false);

--- Insert data into Categories table (continued) ---
INSERT INTO Categories (id, name, description) VALUES
('aa0e8400-e29b-41d4-a716-446655440000', 'Nature', 'Photos of nature and landscapes'),
('aa0e8400-e29b-41d4-a716-446655440001', 'Animals', 'Wildlife and pet photography'),
('aa0e8400-e29b-41d4-a716-446655440002', 'Urban', 'City life and street photography'),
('aa0e8400-e29b-41d4-a716-446655440003', 'People', 'Portraits and candid people photography'),
('aa0e8400-e29b-41d4-a716-446655440004', 'Sports', 'Athletic events and sports activities'),
('aa0e8400-e29b-41d4-a716-446655440005', 'Travel', 'Travel destinations and experiences'),
('aa0e8400-e29b-41d4-a716-446655440006', 'Food', 'Culinary and food photography'),
('aa0e8400-e29b-41d4-a716-446655440007', 'Architecture', 'Buildings and architectural details'),
('aa0e8400-e29b-41d4-a716-446655440008', 'Art', 'Artistic and abstract photography'),
('aa0e8400-e29b-41d4-a716-446655440009', 'Fashion', 'Fashion and style photography');

--- Insert data into Photos_Categories table ---
INSERT INTO Photos_Categories (id, id_photo, id_category) VALUES
('bb0e8400-e29b-41d4-a716-446655440000', '660e8400-e29b-41d4-a716-446655440000', 'aa0e8400-e29b-41d4-a716-446655440000'),
('bb0e8400-e29b-41d4-a716-446655440001', '660e8400-e29b-41d4-a716-446655440001', 'aa0e8400-e29b-41d4-a716-446655440001'),
('bb0e8400-e29b-41d4-a716-446655440002', '660e8400-e29b-41d4-a716-446655440002', 'aa0e8400-e29b-41d4-a716-446655440002'),
('bb0e8400-e29b-41d4-a716-446655440003', '660e8400-e29b-41d4-a716-446655440003', 'aa0e8400-e29b-41d4-a716-446655440003'),
('bb0e8400-e29b-41d4-a716-446655440004', '660e8400-e29b-41d4-a716-446655440004', 'aa0e8400-e29b-41d4-a716-446655440004'),
('bb0e8400-e29b-41d4-a716-446655440005', '660e8400-e29b-41d4-a716-446655440005', 'aa0e8400-e29b-41d4-a716-446655440005'),
('bb0e8400-e29b-41d4-a716-446655440006', '660e8400-e29b-41d4-a716-446655440006', 'aa0e8400-e29b-41d4-a716-446655440006'),
('bb0e8400-e29b-41d4-a716-446655440007', '660e8400-e29b-41d4-a716-446655440007', 'aa0e8400-e29b-41d4-a716-446655440007'),
('bb0e8400-e29b-41d4-a716-446655440008', '660e8400-e29b-41d4-a716-446655440008', 'aa0e8400-e29b-41d4-a716-446655440008'),
('bb0e8400-e29b-41d4-a716-446655440009', '660e8400-e29b-41d4-a716-446655440009', 'aa0e8400-e29b-41d4-a716-446655440009');