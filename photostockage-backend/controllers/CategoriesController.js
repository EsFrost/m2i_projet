const { v4: uuidv4 } = require("uuid");
const categoryModel = require("../models/CategoriesModel");
const sanitizeHtml = require("sanitize-html");
const validator = require("validator");

async function showCategories(req, res) {
  try {
    const result = await categoryModel.getCategories();
    res.send(result.rows);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Internal server error", details: err.message });
  }
}

async function showCategoryById(req, res) {
  const id = sanitizeHtml(req.params.id);
  if (validator.isUUID(id)) {
    try {
      const result = await categoryModel.getCategoryById(id);
      res.status(200).json({ result: result.rows });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Failed to get category", error: err.message });
    }
  } else {
    res.status(400).json({ message: "Invalid UUID" });
  }
}

async function showCategoryByName(req, res) {
  const name = sanitizeHtml(req.params.name);
  if (validator.isString(name)) {
    try {
      const result = await categoryModel.getCategoryByName(name);
      res.status(200).json({ result: result.rows });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Failed to get category", error: err.message });
    }
  }
}

async function createCategory(req, res) {
  let { name, description } = req.body;
  const id = uuidv4();
  let sanitizedName = sanitizeHtml(name);
  let sanitizedDescription = sanitizeHtml(description);

  if (validator.isUUID(id) && name && description) {
    try {
      await categoryModel.createCategory(
        id,
        sanitizedName,
        sanitizedDescription
      );
      res.status(201).json({ message: "Category created successfully" });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Failed to create category", error: err.message });
    }
  } else {
    res.status(400).json({ message: "Invalid input data" });
  }
}

/* Edit category, admin only */
async function editCategory(req, res) {
  let { cid, name, description } = req.body;

  const sanitizedName = sanitizeHtml(name);
  const sanitizedDescription = sanitizeHtml(description);

  if (
    validator.isUUID(cid) &&
    name !== null &&
    name !== undefined &&
    description !== null &&
    description !== undefined
  ) {
    try {
      await categoryModel.editCategory(
        cid,
        sanitizedName,
        sanitizedDescription
      );
      res.status(200).json({ message: "Category edited successfully" });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Failed to edit category", error: err.message });
    }
  } else {
    res.status(400).json({ message: "Invalid input data" });
  }
}

module.exports = {
  showCategories,
  createCategory,
  showCategoryById,
  showCategoryByName,
  editCategory,
};
