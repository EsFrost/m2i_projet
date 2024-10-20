const likesModel = require("../models/LikesModel");
const sanitizeHtml = require("sanitize-html");
const validator = require("validator");
const { v4: uuidv4 } = require("uuid");

async function showLikes(req, res) {
  let p_id = sanitizeHtml(req.params.p_id);
  if (validator.isUUID(p_id)) {
    try {
      const result = await likesModel.countPhotoLikes(p_id);
      res.status(200).json(result.rows);
    } catch (err) {
      res
        .status(500)
        .json({ error: "Internal server error", details: err.message });
    }
  } else {
    res.status(400).json({ error: "Invalid photo id!" });
  }
}

async function getUserLikes(req, res) {
  let u_id = sanitizeHtml(req.params.u_id);
  if (validator.isUUID(u_id)) {
    if (u_id !== req.user.id) {
      return res
        .status(403)
        .json({ error: "Not authorized to view these likes" });
    }
    try {
      const result = await likesModel.getUserLikes(u_id);
      res.status(200).json(result.rows);
    } catch (err) {
      res
        .status(500)
        .json({ error: "Internal server error", details: err.message });
    }
  } else {
    res.status(400).json({ error: "Invalid user id!" });
  }
}

async function getPhotoLikes(req, res) {
  let p_id = sanitizeHtml(req.params.p_id);
  if (validator.isUUID(p_id)) {
    try {
      const result = await likesModel.getPhotoLikes(p_id);
      res.status(200).json(result.rows);
    } catch (err) {
      res
        .status(500)
        .json({ error: "Internal server error", details: err.message });
    }
  } else {
    res.status(400).json({ error: "Invalid photo id!" });
  }
}

async function checkLikes(id_user, id_photo) {
  try {
    const result = await likesModel.getAllLikes();
    return result.rows.some(
      (item) => item.id_photo === id_photo && item.id_user === id_user
    );
  } catch (err) {
    throw err;
  }
}

async function addLike(req, res) {
  let { id_photo } = req.body;
  const id_user = req.user.id; // Get user id from the authenticated token
  id_photo = sanitizeHtml(id_photo);
  const id = uuidv4();

  if (
    validator.isUUID(id) &&
    validator.isUUID(id_user) &&
    validator.isUUID(id_photo)
  ) {
    try {
      const check = await checkLikes(id_user, id_photo);
      if (check === true) {
        res.status(200).json({ warning: "You have already liked this photo!" });
      } else {
        await likesModel.likePhoto(id, id_user, id_photo);
        res.status(201).json({ message: "Like added successfully!" });
      }
    } catch (err) {
      res
        .status(500)
        .json({ error: "Internal server error!", details: err.message });
    }
  } else {
    res.status(400).json({ error: "Invalid data!" });
  }
}

async function deleteLike(req, res) {
  let { id_photo } = req.params;
  const id_user = req.user.id; // Get user id from the authenticated token
  id_photo = sanitizeHtml(id_photo);
  if (validator.isUUID(id_user) && validator.isUUID(id_photo)) {
    try {
      const check = await checkLikes(id_user, id_photo);
      if (check === true) {
        await likesModel.unlikePhoto(id_user, id_photo);
        res.status(200).json({ message: "Photo unliked!" });
      } else {
        res.status(200).json({ warning: "You have not liked this photo!" });
      }
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
  showLikes,
  getUserLikes,
  getPhotoLikes,
  addLike,
  deleteLike,
};
