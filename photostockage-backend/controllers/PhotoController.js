const photoModel = require('../models/PhotoModel')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const sanitizeHtml = require('sanitize-html')
const validator = require('validator')
const { v4: uuidv4 } = require('uuid')

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

function newPhoto(req, res) {
    let { name, description, path, status } = req.body
    let user_id = req.params.id
    let id = uuidv4()

    if (status === undefined || status === '' || status === null || path === undefined || path === null || path === '') {
        status = false
    }

    id = sanitizeHtml(id)
    user_id = sanitizeHtml(user_id)
    name = sanitizeHtml(name)
    description = sanitizeHtml(description)
    path = sanitizeHtml(path)
    
    if (validator.isUUID(user_id) && validator.isUUID(id) && (validator.isURL(path) || path === '' || path === null || path === undefined) && (status === true || status === false)) {
        photoModel.createPhoto(id, user_id, name, description, path, status)
        .then(() => {
            res.status(201).json({ "message": `Photo ${name} created successfully!` })
        })
        .catch(err => {
            res.status(500).json({ "error" : "Internal server error!", err})
        })
    }
    else {
        res.status(400).json({ "error" :'Invalid data!' })
    }
}

function deletePhoto(req, res) {
    let id = req.params.id
    id = sanitizeHtml(id)
    if (validator.isUUID(id)) {
        photoModel.deletePhoto(id)
            .then(() => {
                res.status(201).json({ "message": `Photo deleted successfully!` })
            })
            .catch(err => {
                res.status(500).json({ "error" : "Internal server error!", err})
            })
    }
    else {
        res.status(400).json({ "error" :'Invalid data!' })
    }
}

function editPhoto(req, res) {
    let id = req.params.id
    let { name, description, status } = req.body

    id = sanitizeHtml(id)
    name = sanitizeHtml(name)
    description = sanitizeHtml(description)

    if (validator.isUUID(id) && (status === true || status === false) && name !== undefined && name !== '' && name !== null) {
        photoModel.editPhoto(name, description, status, id)
            .then(() => {
                res.status(201).json({ "message": `Photo updated successfully!` })
            })
            .catch(err => {
                res.status(500).json({ "error" : "Internal server error!", err})
            })
    }
    else {
        res.status(400).json({ "error" :'Invalid data!' })
    }
}

module.exports = {
    showActivePhotos,
    showPhotos,
    showPhoto,
    showUserPhotos,
    showUserPhotoById,
    newPhoto,
    deletePhoto,
    editPhoto
}