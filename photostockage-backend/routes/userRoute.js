const express = require('express')
const userRouter = express.Router()
const userController = require('../controllers/UserController')

userRouter.get('/users', userController.showUsers)
userRouter.get('/user/:id', userController.showUser)
userRouter.get('/username/:id', userController.showUsername)

module.exports = userRouter