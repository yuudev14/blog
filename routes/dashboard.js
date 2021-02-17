const express = require('express');
const verifyToken = require('../middleware/verifyToken');
const dashboard = require('./controllers/dashboard_controller');


const route = express.Router();

route.get('/isVerify', verifyToken, dashboard.is_verify);

module.exports = route;