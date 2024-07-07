--- View photos as guest or normal user ---
SELECT * FROM Photos WHERE status = true;

--- View photos as admin ---
SELECT * FROM Photos;

--- View all users as admin ---
SELECT * FROM Users;

--- View all users as guest / user ---
SELECT username FROM Users;