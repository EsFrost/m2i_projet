const express = require("express");
const downloadsRouter = express.Router();
const downloadsController = require("../controllers/DownloadsController");
const verifyJwtToken = require("../middleware/authMiddleware");

/* method: GET */
downloadsRouter.get(
  "/user/:u_id",
  verifyJwtToken,
  downloadsController.showUserDownloads
);

/* method: POST */
downloadsRouter.post(
  "/download",
  verifyJwtToken,
  downloadsController.addDownload
);

module.exports = downloadsRouter;
