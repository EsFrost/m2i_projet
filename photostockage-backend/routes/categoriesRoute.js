const express = require("express");
const categoriesRouter = express.Router();
const categoriesController = require("../controllers/CategoriesController");
const verifyJwtToken = require("../middleware/authMiddleware");

/* method GET */
categoriesRouter.get("/", categoriesController.showCategories);
categoriesRouter.get("/:id", categoriesController.showCategoryById);
categoriesRouter.get("/:name", categoriesController.showCategoryByName);

/* method POST */
categoriesRouter.post("/", verifyJwtToken, categoriesController.createCategory);

module.exports = categoriesRouter;
