const { v4: uuidv4 } = require("uuid");
const photosCategoriesModel = require("../models/Photos_CategoriesModel");
const sanitizeHtml = require("sanitize-html");
const validator = require("validator");

async function addPhotoCategory(req, res) {
  const { photo_id, category_id } = req.body;
  const id = uuidv4();

  if (
    validator.isUUID(id) &&
    validator.isUUID(photo_id) &&
    validator.isUUID(category_id)
  ) {
    try {
      await photosCategoriesModel.addPhotoCategory(id, photo_id, category_id);
      res
        .status(201)
        .json({ message: "Category assigned to photo successfully" });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Failed to assign category", error: err.message });
    }
  } else {
    res.status(400).json({ message: "Invalid input data" });
  }
}

async function getPhotoCategory(req, res) {
  const photo_id = sanitizeHtml(req.params.id);

  if (validator.isUUID(photo_id)) {
    try {
      const result = await photosCategoriesModel.getPhotoCategory(photo_id);
      res.status(200).json(result.rows);
    } catch (err) {
      res
        .status(500)
        .json({ message: "Failed to get category", error: err.message });
    }
  } else {
    res.status(400).json({ message: "Invalid photo ID" });
  }
}

async function getCategoryPhotos(req, res) {
  const category_id = sanitizeHtml(req.params.id);

  if (validator.isUUID(category_id)) {
    try {
      const result = await photosCategoriesModel.getCategoryPhotos(category_id);
      res.status(200).json(result.rows);
    } catch (err) {
      res
        .status(500)
        .json({ message: "Failed to get photos", error: err.message });
    }
  } else {
    res.status(400).json({ message: "Invalid category ID" });
  }
}

module.exports = {
  addPhotoCategory,
  getPhotoCategory,
  getCategoryPhotos,
};
