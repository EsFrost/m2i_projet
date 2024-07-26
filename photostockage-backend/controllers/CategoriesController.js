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

module.exports = {
    showCategories
}