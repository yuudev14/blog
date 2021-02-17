const express = require('express');
const authentication = require('./controllers/authetication_controller');
const verifyInfo = require('../middleware/verifyInfo');

const route = express.Router();

route.post('/register', verifyInfo, authentication.register);
route.post('/login', authentication.login);
route.post('/logout', authentication.logout);

module.exports = route;