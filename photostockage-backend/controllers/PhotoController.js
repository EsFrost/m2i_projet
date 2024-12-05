const photoModel = require("../models/PhotoModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const sanitizeHtml = require("sanitize-html");
const validator = require("validator");
const { v4: uuidv4 } = require("uuid");

async function showActivePhotos(req, res) {
  try {
    const result = await photoModel.getActivePhotos();
    res.status(200).json(result.rows);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Internal server error", details: err.message });
  }
}

async function showPhotos(req, res) {
  try {
    const result = await photoModel.getPhotos();
    res.status(200).json(result.rows);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Internal server error", details: err.message });
  }
}

async function showPhoto(req, res) {
  let id = sanitizeHtml(req.params.id);

  if (validator.isUUID(id)) {
    try {
      const result = await photoModel.getPhoto(id);
      if (result.rows.length === 0) {
        return res.status(404).json({ error: "Photo not found" });
      }
      res.status(200).json(result.rows[0]);
    } catch (err) {
      res
        .status(500)
        .json({ error: "Internal server error", details: err.message });
    }
  } else {
    res.status(400).json({ error: "Invalid id!" });
  }
}

async function showUserPhotos(req, res) {
  let id = sanitizeHtml(req.params.id);

  if (validator.isUUID(id)) {
    try {
      const result = await photoModel.getUserPhotos(id);
      res.status(200).json(result.rows);
    } catch (err) {
      res
        .status(500)
        .json({ error: "Internal server error", details: err.message });
    }
  } else {
    res.status(400).json({ error: "Invalid id!" });
  }
}

async function showUserPhotoById(req, res) {
  let p_id = sanitizeHtml(req.params.p_id);
  let u_id = sanitizeHtml(req.params.u_id);

  if (validator.isUUID(p_id) && validator.isUUID(u_id)) {
    try {
      const result = await photoModel.getUserPhotoById(p_id, u_id);
      if (result.rows.length === 0) {
        return res.status(404).json({ error: "Photo not found" });
      }
      res.status(200).json(result.rows[0]);
    } catch (err) {
      res
        .status(500)
        .json({ error: "Internal server error", details: err.message });
    }
  } else {
    res.status(400).json({ error: "Invalid id!" });
  }
}

async function newPhoto(req, res) {
  let { name, description, path, status } = req.body;
  let user_id = req.user.id; // Get user id from the authenticated token
  let id = uuidv4();

  if (
    status === undefined ||
    status === "" ||
    status === null ||
    path === undefined ||
    path === null ||
    path === ""
  ) {
    status = false;
  }

  name = sanitizeHtml(name);
  description = sanitizeHtml(description);
  path = sanitizeHtml(path);

  if (
    validator.isUUID(user_id) &&
    validator.isUUID(id) &&
    (validator.isAlphanumeric(path) ||
      path === "" ||
      path === null ||
      path === undefined) &&
    (status === true || status === false) &&
    name &&
    name.trim() !== ""
  ) {
    try {
      await photoModel.createPhoto(
        id,
        user_id,
        name,
        description,
        path,
        status
      );
      res.status(201).json({ message: `Photo ${name} created successfully!` });
    } catch (err) {
      res
        .status(500)
        .json({ error: "Internal server error!", details: err.message });
    }
  } else {
    res.status(400).json({ error: "Invalid data!" });
  }
}

async function deletePhoto(req, res) {
  let id = sanitizeHtml(req.params.id);
  if (validator.isUUID(id)) {
    try {
      const photo = await photoModel.getPhoto(id);
      if (photo.rows.length === 0) {
        return res.status(404).json({ error: "Photo not found" });
      }
      if (photo.rows[0].user_id !== req.user.id) {
        return res
          .status(403)
          .json({ error: "Not authorized to delete this photo" });
      }
      await photoModel.deletePhoto(id);
      res.status(200).json({ message: `Photo deleted successfully!` });
    } catch (err) {
      res
        .status(500)
        .json({ error: "Internal server error!", details: err.message });
    }
  } else {
    res.status(400).json({ error: "Invalid data!" });
  }
}

async function editPhoto(req, res) {
  let id = sanitizeHtml(req.params.id);
  let { name, description, status } = req.body;

  name = sanitizeHtml(name);
  description = sanitizeHtml(description);

  if (
    validator.isUUID(id) &&
    (status === true || status === false) &&
    name &&
    name.trim() !== ""
  ) {
    try {
      const photo = await photoModel.getPhoto(id);
      if (photo.rows.length === 0) {
        return res.status(404).json({ error: "Photo not found" });
      }
      if (photo.rows[0].user_id !== req.user.id) {
        return res
          .status(403)
          .json({ error: "Not authorized to edit this photo" });
      }
      await photoModel.editPhoto(name, description, status, id);
      res.status(200).json({ message: `Photo updated successfully!` });
    } catch (err) {
      res
        .status(500)
        .json({ error: "Internal server error!", details: err.message });
    }
  } else {
    res.status(400).json({ error: "Invalid data!" });
  }
}

module.exports = {
  showActivePhotos,
  showPhotos,
  showPhoto,
  showUserPhotos,
  showUserPhotoById,
  newPhoto,
  deletePhoto,
  editPhoto,
};
