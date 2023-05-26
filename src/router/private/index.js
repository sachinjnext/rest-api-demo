const routes = require('express').Router()

const authRoute = require('./userAuthRoute')

routes.use('/user', authRoute)

module.exports = { routes }
