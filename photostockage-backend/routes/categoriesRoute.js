const express = require('express')
const categoriesRouter = express.Router()
const categoriesController = require('../controllers/CategoriesController')

categoriesRouter.get('/', categoriesController.showCategories)

module.exports = categoriesRouter