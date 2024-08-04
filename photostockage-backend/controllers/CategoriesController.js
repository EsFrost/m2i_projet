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
    createCategory
}