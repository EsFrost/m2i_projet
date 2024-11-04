const express = require("express");
const categoriesRouter = express.Router();
const categoriesController = require("../controllers/CategoriesController");
const { authMiddleware, isAdmin } = require("../middleware/authMiddleware");

/* Public routes */
categoriesRouter.get("/", categoriesController.showCategories);
categoriesRouter.get("/:id", categoriesController.showCategoryById);
categoriesRouter.get("/name/:name", categoriesController.showCategoryByName);

/* Admin only routes */
categoriesRouter.post(
  "/",
  authMiddleware,
  isAdmin,
  categoriesController.createCategory
);
categoriesRouter.put(
  "/edit",
  authMiddleware,
  isAdmin,
  categoriesController.editCategory
);

module.exports = categoriesRouter;
