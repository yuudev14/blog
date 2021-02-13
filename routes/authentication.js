const express = require('express');
const authentication = require('./controllers/authetication_controller');
const verifyInfo = require('../middleware/verifyInfo');

const route = express.Router();

route.post('/register', verifyInfo, authentication.register);

module.exports = route;