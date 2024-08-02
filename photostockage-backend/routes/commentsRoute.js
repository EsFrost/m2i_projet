const express = require('express')
const commentsRouter = express.Router()
const commentsController = require('../controllers/CommentsController')

/* method: GET */
commentsRouter.get('/photo/:p_id', commentsController.showActivePhotoComments)
commentsRouter.get('/c_photo/:p_id', commentsController.showAllPhotoComments)

/* method: POST */

/* method: DELETE */

/* method: PUT */

module.exports = commentsRouter