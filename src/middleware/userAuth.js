const jwt = require('jsonwebtoken')
const User = require('../model/user')

const userAuth = async (req, res, next) => {
    try {
        // checking if token is present in header
        if (!req.headers['authorization']) {
            return res.status(400).send({ status: false, message: res.__('ERROR_TOKEN_REQUIRED') })
        }
        // removing Bearer keyword
        const token = req.headers['authorization'].replace('Bearer', '')
        // verifying token
        const decode = jwt.verify(token, global.config.JWT_SECRATE, { ignoreExpiration: true })
        // finding user with details decoded for token
        const UserData = await User.findOne({ where: { _id: decode._id } })
        if (!UserData) {
            return res.status(400).send({ status: false, message: res.__('ERROR_INVALID_TOKEN') })
        }

        // setting req.user to user found from token and req.token to token
        req.token = token
        req.user = UserData
    } catch (e) {
        console.log('e');
        return res.status(400).send({ status: false, message: e.message })
    }
}

module.exports = { userAuth }