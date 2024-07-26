const photoModel = require('../models/PhotoModel')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const sanitizeHtml = require('sanitize-html')
const validator = require('validator')

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

async function showPhoto(req, res) {
    let id = req.params.id
    id = sanitizeHtml(id)

    if (validator.isUUID(id)) {
        try {
            const result = await photoModel.getPhoto(id)
            res.send(result.rows)
        }
        catch (err) {
            res.send(err)    
        }
    }
    else {
        res.send('Invalid id!')
    }
}

async function showUserPhotos(req, res) {
    let id = req.params.id
    id = sanitizeHtml(id)

    if (validator.isUUID(id)) {
        try {
            const result = await photoModel.getUserPhotos(id)
            res.send(result.rows)
        }
        catch (err) {
            res.send(err)
        }
    }
    else {
        res.send('Invalid id!')
    }
}

async function showUserPhotoById(req, res) {
    let p_id = req.params.p_id
    p_id = sanitizeHtml(p_id)
    let u_id = req.params.u_id
    u_id = sanitizeHtml(u_id)

    if (validator.isUUID(p_id) && validator.isUUID(u_id)) {
        try {
            const result = await photoModel.getUserPhotoById(p_id, u_id)
            res.send(result.rows)
        }
        catch (err) {
            res.send(err)
        }
    }
    else {
        res.send('Invalid id!')
    }
}

module.exports = {
    showActivePhotos,
    showPhotos,
    showPhoto,
    showUserPhotos,
    showUserPhotoById
}