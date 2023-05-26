const routes = require('express').Router()

const authRoute = require('./user')

routes.use('/user', authRoute)

module.exports = routes