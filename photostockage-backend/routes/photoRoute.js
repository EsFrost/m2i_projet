const express = require("express");
const photoRouter = express.Router();
const photoController = require("../controllers/PhotoController");
const verifyJwtToken = require("../middleware/authMiddleware");

/* method: GET */
photoRouter.get("/photos/admin", photoController.showPhotos);
photoRouter.get("/photos", photoController.showActivePhotos);
photoRouter.get("/photo/:id", photoController.showPhoto);
photoRouter.get("/photos/user/:id", photoController.showUserPhotos);
photoRouter.get("/photo/user/:p_id/:u_id", photoController.showUserPhotoById);

/* method: POST */
photoRouter.post("/add_photo", verifyJwtToken, photoController.newPhoto);

/* method: DELETE */
photoRouter.delete("/delete/:id", verifyJwtToken, photoController.deletePhoto);

/* method: PUT */
photoRouter.put("/edit/:id", verifyJwtToken, photoController.editPhoto);

module.exports = photoRouter;
