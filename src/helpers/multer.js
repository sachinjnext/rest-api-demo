const multer = require('multer')
const path = require('path')
const random = require('randomstring')

var storage = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, path.join(__dirname, '../public/'))
    },
    filename: function (req, res, cb) {
        file.originalname = `${Date.now()}-${random.generate(10)}${path.extname(file.originalname)}`
        cb(null, file.originalname)
    }
})

exports.uploadFile = multer({ storage: storage })