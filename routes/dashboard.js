const express = require('express');
const verifyToken = require('../middleware/verifyToken');
const dashboard = require('./controllers/dashboard_controller');


const route = express.Router();

route.get('/isVerify', verifyToken, dashboard.is_verify);
route.get('/user', verifyToken, dashboard.get_all_users_blog);
route.post('/create-blog', verifyToken, dashboard.publish);
route.delete('/delete-blog/:id', verifyToken, dashboard.deleteBlog);
route.post('/update-blog', verifyToken, dashboard.updateBlog);


module.exports = route;