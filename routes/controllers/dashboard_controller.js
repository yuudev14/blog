const db = require('../../db');

const is_verify = async(req, res) => {
    try {
        res.send(true)
        
    } catch (error) {
        res.send(false)
        
    }
}

const publish = async(req, res) => {
    try {
        const user = req.user;
        const {title, blog, preview_img} = req.body
        const addedBlog = await db.query("INSERT INTO blogs (user_id, title, preview_img, blog) VALUES ($1, $2, $3, $4)", [user, title, preview_img, blog]);
        res.send(true);
        
    } catch (err) {
        console.log(err);
        res.send(false);
        
    }
}

const get_all_users_blog = async(req, res) => {
    try {
        const allBlog = await db.query("SELECT * FROM blogs WHERE user_id = $1 ORDER BY date", [req.user]);
        res.send(allBlog.rows);
    } catch (err) {
        console.log(err);
        
    }
}

const deleteBlog = async(req, res) => {
    try {
        await db.query("DELETE FROM blogs WHERE user_id = $1 AND blog_id = $2",[req.user, req.params.id]);
        const allBlog = await db.query("SELECT * FROM blogs WHERE user_id = $1 ORDER BY date", [req.user]);
        res.send(allBlog.rows);
    } catch (err) {
        console.log(err);
    }
}

const updateBlog = async(req, res) => {
    try {
        const {title, preview_img, blog, blog_id} = req.body;
        console.log(req.body);
        await db.query("UPDATE blogs SET title = $1, preview_img = $2, blog = $3 WHERE blog_id = $4", [title, preview_img, blog, blog_id]);
        res.send(true);
        
    } catch (err) {
        console.log(err);
        
    }
}



module.exports = {
    is_verify,
    publish,
    get_all_users_blog,
    deleteBlog,
    updateBlog
}