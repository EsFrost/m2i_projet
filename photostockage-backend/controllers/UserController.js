const userModel = require('../models/UserModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const secret = process.env.JWT_SECRET
const sanitizeHtml = require('sanitize-html')
const validator = require('validator')

async function showUsers(req, res) {
    try {
        const result = await userModel.getUsers()
        res.send(result.rows)
    }
    catch (err) {
        res.send(err)
    }  
}

async function showUser(req, res) {
    let id = req.params.id
    id = sanitizeHtml(id)

    if (validator.isUUID(id)) {
        try {
            const result = await userModel.getUser(id)
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

async function showUsername(req, res) {
    let id = req.params.id
    id = sanitizeHtml(id)

    if (validator.isUUID(id)) {
        try {
            const result = await userModel.getUsername(id)
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
    showUsers,
    showUser,
    showUsername
}