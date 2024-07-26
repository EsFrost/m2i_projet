const photoModel = require('../models/PhotoModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const secret = process.env.JWT_SECRET

async function showActivePhotos(req, res) {
    try {
        const result = await photoModel.getActivePhotos()
        res.send(result.rows)
    }
    catch (err) {
        res.send(err)
    }  
}

async function showPhotos(req, res) {
    try {
        const result = await photoModel.getPhotos()
        res.send(result.rows)
    }
    catch (err) {
        res.send(err)
    }
}

module.exports = {
    showActivePhotos,
    showPhotos
}