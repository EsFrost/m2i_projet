const express = require("express");
const photoRouter = express.Router();
const photoController = require("../controllers/PhotoController");
const authMiddleware = require("../middleware/authMiddleware");

/* method: GET */
photoRouter.get("/photos/admin", photoController.showPhotos);
photoRouter.get("/photos", photoController.showActivePhotos);
photoRouter.get("/photo/:id", photoController.showPhoto);
photoRouter.get("/photos/user/:id", photoController.showUserPhotos);
photoRouter.get("/photo/user/:p_id/:u_id", photoController.showUserPhotoById);

/* method: POST */
photoRouter.post("/add_photo", authMiddleware, photoController.newPhoto);

/* method: DELETE */
photoRouter.delete("/delete/:id", authMiddleware, photoController.deletePhoto);

/* method: PUT */
photoRouter.put("/edit/:id", authMiddleware, photoController.editPhoto);

module.exports = photoRouter;
