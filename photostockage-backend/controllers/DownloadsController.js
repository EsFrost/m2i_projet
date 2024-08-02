const downloadsModel = require('../models/DownloadsModel')
const sanitizeHtml = require('sanitize-html')
const validator = require('validator')
const { v4: uuidv4 } = require('uuid')

/* Helper function */
async function checkDownloads(id_user, id_photo) {
    try {
        const result = await downloadsModel.getAllDownloads()
        return result.rows.some(item => item.id_photo === id_photo && item.id_user === id_user)
    } catch (err) {
        console.log(err)
        throw err
    }
}

async function addDownload(req, res) {
    let { id_user, id_photo } = req.body
    id_user = sanitizeHtml(id_user)
    id_photo = sanitizeHtml(id_photo)
    const id = uuidv4()

    if (validator.isUUID(id) && validator.isUUID(id_user) && validator.isUUID(id_photo)) {
        try {
            const check = await checkDownloads(id_user, id_photo)
            if (check === true) {
                res.status(201).json({ "warning": "You have already downloaded this photo!" })
            }
            else {
                downloadsModel.addDownload(id, id_user, id_photo)
                    .then(() => {
                        res.status(201).json({ "message": "Download added to library successfully!" })
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

async function showUserDownloads(req, res) {
    let u_id = req.params.u_id
    u_id = sanitizeHtml(u_id)
    if (validator.isUUID(u_id)) {
        downloadsModel.getUserDownloads(u_id)
            .then(result => {
                res.status(201).json(result.rows)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
    else {
        res.send(400).json({ "message" : "Invalid user id!" })
    }
}

module.exports = {
    showUserDownloads,
    addDownload
}