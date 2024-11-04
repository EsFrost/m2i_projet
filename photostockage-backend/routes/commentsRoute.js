const express = require("express");
const commentsRouter = express.Router();
const commentsController = require("../controllers/CommentsController");
const { authMiddleware, isAdmin } = require("../middleware/authMiddleware");

/* Public routes */
commentsRouter.get("/photo/:p_id", commentsController.showActivePhotoComments);
commentsRouter.get("/c_photo/:p_id", commentsController.showAllPhotoComments);

/* Protected routes - require authentication */
// Add new comment
commentsRouter.post("/add", authMiddleware, commentsController.addComment);

// Edit comment
commentsRouter.put("/edit", authMiddleware, commentsController.editComment);

// Delete comment (accessible by comment owner or admin)
commentsRouter.delete(
  "/delete/:id",
  authMiddleware,
  commentsController.deleteComment
);

module.exports = commentsRouter;
