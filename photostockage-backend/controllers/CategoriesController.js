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
  if (name && typeof name === "string") {
    try {
      const result = await categoryModel.getCategoryByName(name);
      res.status(200).json({ result: result.rows });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Failed to get category", error: err.message });
    }
  } else {
    res.status(400).json({ message: "Invalid name format" });
  }
}

async function createCategory(req, res) {
  // Check if user has admin access (belt and suspenders, since middleware also checks)
  if (!req.user || !req.user.access_level) {
    return res.status(403).json({ error: "Admin access required" });
  }

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
  const id = sanitizeHtml(req.params.id);
  let { name, description } = req.body;

  name = sanitizeHtml(name);
  description = sanitizeHtml(description);

  if (
    validator.isUUID(id) &&
    name &&
    name.trim() !== "" &&
    description &&
    description.trim() !== ""
  ) {
    try {
      await categoryModel.editCategory(id, name, description);
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

async function deleteCategory(req, res) {
  const id = sanitizeHtml(req.params.id);

  if (validator.isUUID(id)) {
    try {
      await categoryModel.deleteCategory(id);
      res.status(200).json({ message: "Category deleted successfully" });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Failed to delete category", error: err.message });
    }
  } else {
    res.status(400).json({ message: "Invalid category ID" });
  }
}

module.exports = {
  showCategories,
  createCategory,
  showCategoryById,
  showCategoryByName,
  editCategory,
  deleteCategory,
};
