const express = require('express')
const downloadsRouter = express.Router()
const downloadsController = require('../controllers/DownloadsController')

/* method: GET */
downloadsRouter.get('/user/:u_id', downloadsController.showUserDownloads)

/* method: POST */
downloadsRouter.post('/download', downloadsController.addDownload)

module.exports = downloadsRouter