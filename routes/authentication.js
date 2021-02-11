const express = require('express');
const authentication = require('./controllers/authetication_controller');

const route = express.Router();

route.post('/register', authentication.register);

module.exports = route;