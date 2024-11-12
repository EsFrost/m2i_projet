const userModel = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.JWT_SECRET;
const sanitizeHtml = require("sanitize-html");
const validator = require("validator");
const { v4: uuidv4 } = require("uuid");

// Token generation
function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      username: user.username,
      email: user.email,
      access_level: user.access_level,
    },
    secret,
    { expiresIn: "30d" }
  );
}

async function loginUser(req, res) {
  let { email, password } = req.body;
  email = sanitizeHtml(email);
  password = sanitizeHtml(password);

  if (validator.isEmail(email) && validator.isAlphanumeric(password)) {
    try {
      const user = await userModel.getUserByEmail(email);
      if (user.rows.length === 0) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const isMatch = await bcrypt.compare(password, user.rows[0].password);
      if (!isMatch) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const token = jwt.sign(
        {
          id: user.rows[0].id,
          username: user.rows[0].username,
          email: user.rows[0].email,
          access_level: user.rows[0].access_level, // Add access_level to token payload
        },
        secret,
        { expiresIn: "30d" }
      );

      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        sameSite: "strict", // Added security measure
      });

      res.status(200).json({
        message: "Login successful",
        token: token,
      });
    } catch (err) {
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.status(400).json({ error: "Invalid data!" });
  }
}

async function showUsers(req, res) {
  try {
    const result = await userModel.getUsers();
    res.send(result.rows);
  } catch (err) {
    res.send(err);
  }
}

async function showUser(req, res) {
  let id = req.params.id;
  id = sanitizeHtml(id);

  if (validator.isUUID(id)) {
    try {
      const result = await userModel.getUser(id);
      res.send(result.rows);
    } catch (err) {
      res.send(err);
    }
  } else {
    res.send("Invalid id!");
  }
}

async function showUsername(req, res) {
  let id = req.params.id;
  id = sanitizeHtml(id);

  if (validator.isUUID(id)) {
    try {
      const result = await userModel.getUsername(id);
      res.send(result.rows);
    } catch (err) {
      res.send(err);
    }
  } else {
    res.send("Invalid id!");
  }
}

async function showUserByEmail(req, res) {
  let email = req.params.email;
  email = sanitizeHtml(email);

  if (validator.isEmail(email)) {
    try {
      const result = await userModel.getUserByEmail(email);
      res.send(result.rows);
    } catch (err) {
      res.send(err);
    }
  }
}

async function registerUser(req, res) {
  let { username, password, email, user_icon } = req.body;
  const id = uuidv4();
  username = sanitizeHtml(username);
  password = sanitizeHtml(password);
  email = sanitizeHtml(email);
  user_icon = sanitizeHtml(user_icon);

  if (
    validator.isUUID(id) &&
    validator.isAlphanumeric(username) &&
    validator.isEmail(email) &&
    validator.isAlphanumeric(password) &&
    (validator.isURL(user_icon) ||
      user_icon === "" ||
      user_icon === null ||
      user_icon === undefined)
  ) {
    try {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);

      await userModel.newUser(id, username, email, hash, user_icon);

      const user = { id, email, username };
      const token = generateToken(user);

      res.status(201).json({
        message: `User ${email} created successfully!`,
        token,
        user,
      });
    } catch (err) {
      if (err.code === "23505") {
        res.status(400).json({ message: `Email or username already exists!` });
      } else if (err.code === "22P02") {
        res.status(400).json({ message: `Invalid data!` });
      } else {
        console.error(err);
        res
          .status(500)
          .json({ error: "Internal server error", details: err.message });
      }
    }
  } else {
    res.status(400).json({ error: "Invalid data!" });
  }
}

async function delUser(req, res) {
  let email = req.params.email;
  email = sanitizeHtml(email);

  if (validator.isEmail(email)) {
    if (email !== req.user.email) {
      return res
        .status(403)
        .json({ error: "Not authorized to delete this user" });
    }
    try {
      await userModel.deleteUser(email);
      res.clearCookie("token");
      res.status(200).json({ message: `User ${email} deleted successfully!` });
    } catch (err) {
      res
        .status(500)
        .json({ error: "Internal server error", details: err.message });
    }
  } else {
    res.status(400).json({ error: "Invalid email format" });
  }
}

// need to validate using jwt and compare hashed password / id / email / username
async function changePass(req, res) {
  let { email, currentPassword, newPassword } = req.body;

  email = sanitizeHtml(email);
  currentPassword = sanitizeHtml(currentPassword);
  newPassword = sanitizeHtml(newPassword);

  if (email !== req.user.email) {
    return res
      .status(403)
      .json({ error: "Not authorized to change this user's password" });
  }

  if (
    !validator.isEmail(email) ||
    !validator.isAlphanumeric(currentPassword) ||
    !validator.isAlphanumeric(newPassword)
  ) {
    return res.status(400).json({ error: "Invalid data!" });
  }

  try {
    const user = await userModel.getUserByEmail(email);
    if (user.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const isMatch = await bcrypt.compare(
      currentPassword,
      user.rows[0].password
    );
    if (!isMatch) {
      return res.status(401).json({ error: "Current password is incorrect" });
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(newPassword, salt);

    await userModel.editPassword(hash, email);
    res.status(200).json({ message: "Password updated successfully!" });
  } catch (err) {
    console.error("Error in changePass:", err);
    res
      .status(500)
      .json({ error: "Internal server error", details: err.message });
  }
}

// validation needed here also
async function changeUser(req, res) {
  let { username, user_icon } = req.body;
  let id = req.params.id;

  username = sanitizeHtml(username);
  user_icon = sanitizeHtml(user_icon);

  if (id !== req.user.id) {
    return res
      .status(403)
      .json({ error: "Not authorized to change this user's information" });
  }

  if (
    validator.isUUID(id) &&
    validator.isAlphanumeric(username) &&
    (validator.isURL(user_icon) ||
      user_icon === "" ||
      user_icon === null ||
      user_icon === undefined)
  ) {
    try {
      await userModel.editUser(username, user_icon, id);
      res.status(200).json({ message: "User updated successfully!" });
    } catch (err) {
      res
        .status(500)
        .json({ error: "Internal server error", details: err.message });
    }
  } else {
    res.status(400).json({ error: "Invalid data!" });
  }
}

async function logoutUser(req, res) {
  try {
    // Clear the JWT cookie
    res.clearCookie("token");
    res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Internal server error", details: err.message });
  }
}

module.exports = {
  showUsers,
  showUser,
  showUsername,
  registerUser,
  showUserByEmail,
  delUser,
  changePass,
  changeUser,
  loginUser,
  logoutUser,
};
