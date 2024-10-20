const commentsModel = require("../models/CommentsModel");
const sanitizeHtml = require("sanitize-html");
const validator = require("validator");
const { v4: uuidv4 } = require("uuid");

async function showActivePhotoComments(req, res) {
  let { p_id } = req.params;
  p_id = sanitizeHtml(p_id);

  if (validator.isUUID(p_id)) {
    commentsModel
      .getPhotoComments(p_id)
      .then((result) => {
        res.status(201).json(result.rows);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  } else {
    res.status(400).json({ error: "Invalid photo id!" });
  }
}

async function showAllPhotoComments(req, res) {
  let { p_id } = req.params;
  p_id = sanitizeHtml(p_id);

  if (validator.isUUID(p_id)) {
    commentsModel
      .getAllPhotoComments(p_id)
      .then((result) => {
        res.status(201).json(result.rows);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  } else {
    res.status(400).json({ error: "Invalid photo id!" });
  }
}

module.exports = {
  showActivePhotoComments,
  showAllPhotoComments,
};
