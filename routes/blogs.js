const express = require('express');

const blog= require('./controllers/blog_controller');


const route = express.Router();

route.get('/get-articles', blog.articles);
route.get('/article/:id', blog.article_details);

module.exports = route;