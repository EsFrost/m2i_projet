const commentsModel = require("../models/CommentsModel");
const sanitizeHtml = require("sanitize-html");
const validator = require("validator");
const { v4: uuidv4 } = require("uuid");

async function showActivePhotoComments(req, res) {
  let { p_id } = req.params;
  p_id = sanitizeHtml(p_id);

  if (validator.isUUID(p_id)) {
    commentsModel
      .getPhotoComments(p_id)
      .then((result) => {
        res.status(201).json(result.rows);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  } else {
    res.status(400).json({ error: "Invalid photo id!" });
  }
}

async function showAllPhotoComments(req, res) {
  let { p_id } = req.params;
  p_id = sanitizeHtml(p_id);

  if (validator.isUUID(p_id)) {
    commentsModel
      .getAllPhotoComments(p_id)
      .then((result) => {
        res.status(201).json(result.rows);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  } else {
    res.status(400).json({ error: "Invalid photo id!" });
  }
}

// If html tags are to be added
// const sanitizeOptions = {
//   allowedTags: ["b", "i", "em", "strong", "u", "s", "h1", "h2", "h3", "p"],
//   allowedAttributes: {}, // No attributes allowed
// };

async function addComment(req, res) {
  const photo_id = sanitizeHtml(req.params.photo_id);
  const content = sanitizeHtml(req.body.content);
  const user_id = req.user.id;
  const id = uuidv4();

  if (!validator.isUUID(photo_id) || !content || content.trim() === "") {
    return res.status(400).json({ error: "Invalid input data" });
  }

  try {
    const photoStatus = await commentsModel.getPhotoStatus(photo_id);

    if (photoStatus.rows.length === 0) {
      return res.status(404).json({ error: "Photo not found" });
    }

    if (!photoStatus.rows[0].status) {
      return res
        .status(403)
        .json({ error: "Cannot comment on inactive photos" });
    }

    const result = await commentsModel.addComment(
      id,
      user_id,
      photo_id,
      content
    );
    res.status(201).json({
      message: "Comment added successfully",
      comment: result.rows[0],
    });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to add comment", details: err.message });
  }
}

async function editComment(req, res) {
  const comment_id = sanitizeHtml(req.params.comment_id);
  const { content } = req.body;
  const user_id = req.user.id;

  if (!validator.isUUID(comment_id) || !content || content.trim() === "") {
    return res.status(400).json({ error: "Invalid input data" });
  }

  try {
    const commentResult = await commentsModel.getCommentDetails(comment_id);

    if (commentResult.rows.length === 0) {
      return res.status(404).json({ error: "Comment not found" });
    }

    const comment = commentResult.rows[0];

    if (comment.id_user !== user_id) {
      return res
        .status(403)
        .json({ error: "Not authorized to edit this comment" });
    }

    const photoStatus = await commentsModel.getPhotoStatus(comment.id_photo);
    if (!photoStatus.rows[0].status) {
      return res
        .status(403)
        .json({ error: "Cannot edit comment on inactive photo" });
    }

    const result = await commentsModel.edtiComment(
      comment_id,
      user_id,
      content
    );
    res.status(200).json({
      message: "Comment updated successfully",
      comment: result.rows[0],
    });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to update comment", details: err.message });
  }
}

// Only showing the updated deleteComment function since it's the only one that needs admin logic
async function deleteComment(req, res) {
  let comment_id = sanitizeHtml(req.params.id);
  const user_id = req.user.id;
  const isAdmin = req.user.access_level; // From your JWT token

  if (!validator.isUUID(comment_id)) {
    return res.status(400).json({ error: "Invalid comment ID" });
  }

  try {
    // Check if comment exists and get its details
    const commentResult = await commentsModel.getCommentDetails(comment_id);

    if (commentResult.rows.length === 0) {
      return res.status(404).json({ error: "Comment not found" });
    }

    const comment = commentResult.rows[0];

    // Allow deletion if user is admin or comment owner
    if (!isAdmin && comment.id_user !== user_id) {
      return res
        .status(403)
        .json({ error: "Not authorized to delete this comment" });
    }

    // Check if photo is still active
    const photoStatus = await commentsModel.getPhotoStatus(comment.id_photo);
    if (!photoStatus.rows[0].status) {
      return res
        .status(403)
        .json({ error: "Cannot delete comment on inactive photo" });
    }

    await commentsModel.deleteComment(
      comment_id,
      isAdmin ? comment.id_user : user_id
    );
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to delete comment", details: err.message });
  }
}

async function showUserComments(req, res) {
  const user_id = req.params.user_id;

  if (!validator.isUUID(user_id)) {
    return res.status(400).json({ error: "Invalid user ID format" });
  }

  // Check if user is requesting their own comments
  if (user_id !== req.user.id) {
    return res
      .status(403)
      .json({ error: "Not authorized to view these comments" });
  }

  try {
    const result = await commentsModel.getUserComments(user_id);
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({
      error: "Failed to retrieve user comments",
      details: err.message,
    });
  }
}

module.exports = {
  showActivePhotoComments,
  showAllPhotoComments,
  addComment,
  editComment,
  deleteComment,
  showUserComments,
};
