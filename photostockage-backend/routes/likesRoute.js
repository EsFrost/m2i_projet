const express = require("express");
const likesRouter = express.Router();
const likesController = require("../controllers/LikesController");
const verifyJwtToken = require("../middleware/authMiddleware");

/* method: GET */
likesRouter.get("/likes/:p_id", likesController.showLikes);
likesRouter.get("/user/:u_id", verifyJwtToken, likesController.getUserLikes);
likesRouter.get("/photo/:p_id", likesController.getPhotoLikes);

/* method: POST */
likesRouter.post("/like", verifyJwtToken, likesController.addLike);

/* method: DELETE */
likesRouter.delete(
  "/like/:id_photo",
  verifyJwtToken,
  likesController.deleteLike
);

module.exports = likesRouter;
