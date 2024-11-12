const express = require("express");
const likesRouter = express.Router();
const likesController = require("../controllers/LikesController");
const { authMiddleware } = require("../middleware/authMiddleware");

/* method: GET */
likesRouter.get("/likes/:p_id", likesController.showLikes);
likesRouter.get("/user/:u_id", authMiddleware, likesController.getUserLikes);
likesRouter.get("/photo/:p_id", likesController.getPhotoLikes);

/* method: POST */
likesRouter.post("/like", authMiddleware, likesController.addLike);

/* method: DELETE */
likesRouter.delete(
  "/like/:id_photo",
  authMiddleware,
  likesController.deleteLike
);

module.exports = likesRouter;
