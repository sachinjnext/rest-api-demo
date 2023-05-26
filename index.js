const express = require('express');
const bodyParser = require('body-parser')
const app = express();


let env = process.env.NODE_ENV || 'development'
global.config = require('./src/config/config.json')[env]

const dotenv = require('dotenv')
dotenv.config();
const cors = require('cors')
const port = global.config.PORT;
const http = require('http')
const hostname = '127.0.0.1';

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))

const db = require('./src/model/index')
db.sequelize.sync({ alter: true }).then(() => {
    console.log("⚡️[sequelize]: re-sync db.");
}).catch((err) => {
    console.log("DB Error", err)
    throw new Error(err)
});

const { HandleErrorMessage } = require('./src/middleware/fieldValidator')
const i18n = require('./src/helpers/i18n')
app.use(i18n.init)
app.use(HandleErrorMessage);

app.use(cors())
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Require routers ...
const userAuth = require('./src/middleware/userAuth')
app.use('/private', userAuth)
const { publicRoute, privateRoute } = require('./src/router/index.routes');
app.get('/', (req, res) => {
    res.send("⚡️[server]: Express server is running")
})
app.use('/private', privateRoute);
app.use('/public', publicRoute);


app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at ${port}`);
})