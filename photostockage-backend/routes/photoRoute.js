const express = require('express')
const photoRouter = express.Router()
const photoController = require('../controllers/PhotoController')

photoRouter.get('/photos/admin', photoController.showPhotos)

photoRouter.get('/photos', photoController.showActivePhotos)

module.exports = photoRouter