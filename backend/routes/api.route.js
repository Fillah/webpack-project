import express from 'express'

const router = express.Router()
const User = require('./../models/user')

module.exports = () => {
    router.get('/users', (req, res) => {
        User.find((err, users) => {
            if (err) {
                return res.status(500).send(err)
            }
            return res.status(200).send(users)
        })
    })

    return router
}