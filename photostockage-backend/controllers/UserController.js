const userModel = require('../models/UserModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const secret = process.env.JWT_SECRET
const sanitizeHtml = require('sanitize-html')
const validator = require('validator')
const { v4: uuidv4 } = require('uuid')

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

async function showUserByEmail(req, res) {
    let email = req.params.email
    email = sanitizeHtml(email)

    if (validator.isEmail(email)) {
        try {
            const result = await userModel.getUserByEmail(email)
            res.send(result.rows)
        }
        catch (err) {
            res.send(err)
        }
    }
}

function registerUser(req, res) {
    let { username, password, email, user_icon } = req.body
    const id = uuidv4()
    username = sanitizeHtml(username)
    password = sanitizeHtml(password)
    email = sanitizeHtml(email)
    user_icon = sanitizeHtml(user_icon)

    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)

    if (validator.isUUID(id) && validator.isAlphanumeric(username) && validator.isEmail(email) && validator.isAlphanumeric(password) && (validator.isURL(user_icon) || user_icon === '' || user_icon === null || user_icon === undefined)) {
        userModel.newUser(id, username, email, hash, user_icon)
        .then(() => {
            res.status(201).json({ "message": `User ${email} created successfully!` })
        })
        .catch(err => {
            if (err.code === '23505') {
                res.status(400).json({ "message": `Email or username already exists!` })
            }
            else if (err.code === '22P02') {
                res.status(400).json({ "message": `Invalid data!` })
            }
            else {
                res.status(500).json({ "error" : "Internal server error! "})
            }
        })   
    }
    else {
        res.status(400).json({ "error" :'Invalid data!' })
    }
}

function delUser(req, res) {
    let email = req.params.email
    email = sanitizeHtml(email)

    if (validator.isEmail(email)) {
        try {
            userModel.deleteUser(email)
            res.send({"message": `User ${email} deleted successfully!`})
        }
        catch (err) {
            res.send(err)
        }
    }
    else {
        res.send('Invalid data!')
    }
}

// need to validate using jwt and compare hashed password / id / email / username
function changePass(req, res) {
    let { email, password } = req.body

    email = sanitizeHtml(email)
    password = sanitizeHtml(password)

    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)

    if (validator.isEmail(email) && validator.isAlphanumeric(password)) {
        userModel.editPassword(hash, email)
            .then(() => {
                res.status(201).json({ "message": `Password updated successfully!` })
            })
            .catch(err => {
                res.status(500).json({ "error" : "Internal server error! "})
            })
    }
    else {
        res.status(400).json({ "error" :'Invalid data!' })
    }
}

// validation needed here also
function changeUser(req, res) {
    let { username, user_icon } = req.body
    let id = req.params.id

    username = sanitizeHtml(username)
    user_icon = sanitizeHtml(user_icon)

    if (validator.isUUID(id) && validator.isAlphanumeric(username) && (validator.isURL(user_icon) || user_icon === '' || user_icon === null || user_icon === undefined)) {
        userModel.editUser(username, user_icon, id)
            .then(() => {
                res.status(201).json({ "message": `User updated successfully!` })
            })
            .catch(err => {
                res.status(500).json({ "error" : "Internal server error! "})
            })
    }
}

module.exports = {
    showUsers,
    showUser,
    showUsername,
    registerUser,
    showUserByEmail,
    delUser,
    changePass,
    changeUser
}