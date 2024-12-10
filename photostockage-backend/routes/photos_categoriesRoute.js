const express = require("express");
const photosCategoriesRouter = express.Router();
const photosCategoriesController = require("../controllers/Photos_CategoriesController");
const { authMiddleware } = require("../middleware/authMiddleware");

photosCategoriesRouter.post(
  "/add",
  authMiddleware,
  photosCategoriesController.addPhotoCategory
);
photosCategoriesRouter.get(
  "/photo/:id",
  photosCategoriesController.getPhotoCategory
);
photosCategoriesRouter.get(
  "/category/:id",
  photosCategoriesController.getCategoryPhotos
);

module.exports = photosCategoriesRouter;
