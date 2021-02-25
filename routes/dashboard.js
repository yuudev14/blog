const express = require('express');
const verifyToken = require('../middleware/verifyToken');
const dashboard = require('./controllers/dashboard_controller');


const route = express.Router();

route.post('/like-blog/:id', verifyToken, dashboard.likeBlog);
route.delete('/unlike-blog/:id', verifyToken, dashboard.unlikeBlog);
route.get('/isVerify', verifyToken, dashboard.is_verify);
route.get('/user', verifyToken, dashboard.get_all_users_blog);
route.post('/create-blog', verifyToken, dashboard.publish);
route.delete('/delete-blog/:id', verifyToken, dashboard.deleteBlog);
route.post('/update-blog', verifyToken, dashboard.updateBlog);
route.get('/check-blog-reaction/:id', verifyToken, dashboard.check_blog_reaction);
route.post('/search_blog', verifyToken, dashboard.search);



module.exports = route;