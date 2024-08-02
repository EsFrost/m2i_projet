const epxress = require('express')
const likesRouter = epxress.Router()
const likesController = require('../controllers/LikesController')

/* method: GET */
likesRouter.get('/likes/:p_id', likesController.showLikes)
likesRouter.get('/user/:u_id', likesController.getUserLikes)
likesRouter.get('/photo/:p_id', likesController.getPhotoLikes)

/* method: POST */
likesRouter.post('/like', likesController.addLike)

/* method: DELETE */
likesRouter.delete('/like/:id_user/:id_photo', likesController.deleteLike)

module.exports = likesRouter