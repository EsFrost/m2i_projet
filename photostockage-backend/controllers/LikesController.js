const likesModel = require('../models/LikesModel')
const sanitizeHtlm = require('sanitize-html')
const validator = require('validator')
const { v4: uuidv4 } = require('uuid')

async function showLikes(req, res) {
    let p_id = req.params.p_id
    p_id = sanitizeHtlm(p_id)
    if (validator.isUUID(p_id)) {
        likesModel.countPhotoLikes(p_id)
            .then(result => {
                res.status(201).json(result.rows)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
    else {
        res.status(400).json({ "error": "Invalid photo id!" })
    }
}

async function getUserLikes(req, res) {
    let u_id = req.params.u_id
    u_id = sanitizeHtlm(u_id)
    if (validator.isUUID(u_id)) {
        likesModel.getUserLikes(u_id)
            .then(result => {
                res.status(201).json(result.rows)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
    else {
        res.status(400).json({ "error": "Invalid user id!" })
    }
}

async function getPhotoLikes(req, res) {
    let p_id = req.params.p_id
    p_id = sanitizeHtlm(p_id)
    if (validator.isUUID(p_id)) {
        likesModel.getPhotoLikes(p_id)
            .then(result => {
                res.status(201).json(result.rows)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
    else {
        res.status(400).json({ "error": "Invalid photo id!" })
    }
}

/* Helper function */
async function checkLikes(id_user, id_photo) {
    try {
        const result = await likesModel.getAllLikes()
        return result.rows.some(item => item.id_photo === id_photo && item.id_user === id_user)
    } catch (err) {
        throw err
    }
}

/* If the user has already liked the photo, the request has to fail */
async function addLike(req, res) {
    let { id_user, id_photo } = req.body
    id_user = sanitizeHtlm(id_user)
    id_photo = sanitizeHtlm(id_photo)
    const id = uuidv4()

    if (validator.isUUID(id) && validator.isUUID(id_user) && validator.isUUID(id_photo)) {
        try {
            const check = await checkLikes(id_user, id_photo)
            if (check === true) {
                res.status(201).json({ "warning": "You have already liked this photo!" })
            }
            else {
                likesModel.likePhoto(id, id_user, id_photo)
                    .then(() => {
                        res.status(201).json({ "message": "Like added successfully!" })
                    })
                    .catch(err => {
                        res.status(500).json({ "error": "Internal server error!", err })
                    })
                }
            }
        catch (err) {
            res.status(500).json({ "error": "Internal server error!", err })
        }
    }
    else {
        res.status(400).json({ "error": "Invalid data!" })
    }
}

async function deleteLike(req, res) {
    let { id_user, id_photo } = req.params
    id_user = sanitizeHtlm(id_user)
    id_photo = sanitizeHtlm(id_photo)
    if (validator.isUUID(id_user) && validator.isUUID(id_photo)) {
        try {
            const check = await checkLikes(id_user, id_photo)
            if (check === true) {
                likesModel.unlikePhoto(id_user, id_photo)
                    .then(() => {
                        res.status(201).json({ "message": "Photo unliked!" })
                    })
                    .catch(err => {
                        res.status(500).json({ "error": "Internal server error!", err })
                    })
                }
            else {
                res.status(201).json({ "warning": "You have not liked this photo!" })
            }
        }
        catch (err) {
            res.status(500).json({ "error": "Internal server error!", err })
        }
    }
    else {
        res.status(400).json({ "error": "Invalid data!" })
    }
}

module.exports = { 
    showLikes,
    getUserLikes,
    getPhotoLikes,
    addLike,
    deleteLike
}