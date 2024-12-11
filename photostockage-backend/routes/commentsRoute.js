const express = require("express");
const commentsRouter = express.Router();
const commentsController = require("../controllers/CommentsController");
const { authMiddleware, isAdmin } = require("../middleware/authMiddleware");

/* Public routes */
commentsRouter.get("/photo/:p_id", commentsController.showActivePhotoComments);
commentsRouter.get("/c_photo/:p_id", commentsController.showAllPhotoComments);
commentsRouter.get(
  "/user/:user_id",
  authMiddleware,
  commentsController.showUserComments
);
commentsRouter.get(
  "/",
  authMiddleware,
  isAdmin,
  commentsController.showAllComments
);

/* Protected routes - require authentication */
// Add new comment
commentsRouter.post(
  "/add/:photo_id",
  authMiddleware,
  commentsController.addComment
);

// Edit comment
commentsRouter.put(
  "/edit/:comment_id",
  authMiddleware,
  commentsController.editComment
);

// Delete comment (accessible by comment owner or admin)
commentsRouter.delete(
  "/delete/:id",
  authMiddleware,
  commentsController.deleteComment
);

module.exports = commentsRouter;
