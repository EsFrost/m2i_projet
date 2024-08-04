const { v4: uuidv4 } = require('uuid')
const { createCategory } = require('../models/CategoriesModel')
const sanitizeHtml = require('sanitize-html')
const validator = require('validator')

const categoryModel = require('../models/CategoriesModel')

async function showCategories(req, res) {
    try {
        const result = await categoryModel.getCategories()
        res.send(result.rows)
    }
    catch (err) {
        res.send(err)
    }
}

/* Untested functionality */
async function showCategoryById(req, res) {
    const id = req.params.id
    if (validator.isUUID(id)) {
        try {
            const result = await categoryModel.getCategoryById(id)
            res.status(201).json({result: result.rows})
        }
        catch (err) {
            res.status(500).json({message: "Failed to get category", error: err})
        }
    }
    else {
        res.status(400).json({message: "Invalid UUID"})
    }
}

/* Untested functionality */
async function showCategoryByName(req, res) {
    const name = req.params.name
    if (validator.isString(name)) {
        try {
            const result = await categoryModel.getCategoryByName(name)
            res.status(201).json({result: result.rows})
        }
        catch (err) {
            res.status(500).json({message: "Failed to get category", error: err})
        }
    }
}

/* Untested functionality */
async function createCategory(req, res) {
    let { name, description } = req.body
    const id = uuidv4()
    let sanitizedName = sanitizeHtml(name)
    let sanitizedDescription = sanitizeHtml(description)

    if (validator.isUUID(id) && (name && description)) {
        try {
            await categoryModel.createCategory(id, sanitizedName, sanitizedDescription)
            res.status(201).json({message: "Category created successfully"})
        }
        catch (err) {
            res.status(500).json({message: "Failed to create category", error: err})
        }
    }
}

module.exports = {
    showCategories,
    createCategory,
    showCategoryById,
    showCategoryByName
}