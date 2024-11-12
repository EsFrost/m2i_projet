const express = require("express");
const downloadsRouter = express.Router();
const downloadsController = require("../controllers/DownloadsController");
const { authMiddleware } = require("../middleware/authMiddleware");

/* method: GET */
downloadsRouter.get(
  "/user/:u_id",
  authMiddleware,
  downloadsController.showUserDownloads
);

/* method: POST */
downloadsRouter.post(
  "/download",
  authMiddleware,
  downloadsController.addDownload
);

module.exports = downloadsRouter;
