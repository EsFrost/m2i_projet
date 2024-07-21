--- View photos as guest or normal user ---
SELECT * FROM Photos WHERE status = true;
--- View photos as admin ---
SELECT * FROM Photos;
--- View all users as admin ---
SELECT * FROM Users;
--- View particular user ---
SELECT * FROM users where id = :id;
--- View all users as guest / user ---
SELECT username FROM Users;
--- View categories ---
SELECT * FROM categories;
--- Create account as user ---
INSERT INTO users (id, username, email, password, user_icon)
VALUES (:id, :username, :email, :password, :user_icon);
--- View own photos ---
SELECT * FROM photos WHERE user_id = :user_id;
--- Upload photo ---
INSERT INTO photos (id, user_id, name, description, status)
VALUES (:id, :user_id, :name, :description, :status);
--- Delete photo ---
DELETE FROM photos WHERE id = :id;
--- Edit photo ---
UPDATE photos SET name = :name, description = :description, status = :status
WHERE id = :id;
-- Edit account ---
UPDATE users SET username = :username, email = :email, password = :password, user_icon = :user_icon
WHERE id = :id;
--- Delete account ---
DELETE FROM users WHERE id = :id; --- In theory this should delete photos / likes / downloads too ---
--- Create comment ---
INSERT INTO comments (id, user_id, photo_id, comment) VALUES (:id, :user_id, :photo_id, :comment);
--- View comments ---
SELECT * FROM comments WHERE photo_id = :photo_id;
--- Delete comment ---
DELETE FROM comments WHERE id = :id;
--- Delete comment user ---
DELETE FROM comments WHERE id = :id AND id_user = :id_user;
--- Add category to photo ---
INSERT INTO photos_categories (id, id_photo, id_category) VALUES (:id, :id_photo, :id_cateogry);
--- Delete category from photo ---
DELETE FROM photos_categories WHERE id_photo = :id_photo AND id_category = :id_category;
--- Add to liked photos ---
INSERT INTO likes (id, id_user, id_photo) VALUES (:id, :id_user, :id_photo);
--- Remove from liked photos ---
DELETE FROM likes WHERE id = :id;
--- Count likes ---
SELECT COUNT(id) FROM likes WHERE id_photo = :id_photo;
--- View liked photos ---
SELECT * FROM likes l
LEFT JOIN photos p ON l.id_photo = p.id
LEFT JOIN users u ON l.id_user = u.id
WHERE l.id_user = :id;
--- Unlike a photo ---
DELETE FROM likes WHERE id = :id;