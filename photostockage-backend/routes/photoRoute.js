const express = require('express')
const photoRouter = express.Router()
const photoController = require('../controllers/PhotoController')

photoRouter.get('/photos/admin', photoController.showPhotos)

photoRouter.get('/photos', photoController.showActivePhotos)

photoRouter.get('/photo/:id', photoController.showPhoto)

photoRouter.get('/photos/user/:id', photoController.showUserPhotos)

photoRouter.get('/photo/user/:p_id/:u_id', photoController.showUserPhotoById)

module.exports = photoRouter