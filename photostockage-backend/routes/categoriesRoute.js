const express = require('express')
const categoriesRouter = express.Router()
const categoriesController = require('../controllers/CategoriesController')

/* method GET */
categoriesRouter.get('/', categoriesController.showCategories)
categoriesRouter.get('/:id', categoriesController.showCategoryById)
categoriesRouter.get('/:name', categoriesController.showCategoryByName)

/* method POST */
/* Untested functionality */
categoriesRouter.post('/', categoriesController.createCategory)

/* method PUT */

/* method DELETE */

module.exports = categoriesRouter