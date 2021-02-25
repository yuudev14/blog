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
        if([title, blog].some(el => el === '')){
            res.status(404).send('fill up title and blog');
        }
        const addedBlog = await db.query("INSERT INTO blogs (user_id, title, preview_img, blog) VALUES ($1, $2, $3, $4)", [user, title, preview_img, blog]);
        res.send(true);
        
    } catch (err) {
        console.log(err);
        res.status(404).send(err.error);
        
    }
}

const get_all_users_blog = async(req, res) => {
    try {
        const allBlog = await db.query("SELECT * FROM blogs WHERE user_id = $1 ORDER BY date", [req.user]);
        res.send(allBlog.rows);
    } catch (err) {
        res.status(404).send(err.error);
        
    }
}

const deleteBlog = async(req, res) => {

    try {
        await db.query("DELETE FROM reactions WHERE blog_id = $1", [req.params.id]);
        await db.query("DELETE FROM blogs WHERE user_id = $1 AND blog_id = $2",[req.user, req.params.id]);
        const allBlog = await db.query("SELECT * FROM blogs WHERE user_id = $1 ORDER BY date", [req.user]);
        res.send(allBlog.rows);
    } catch (err) {
        res.status(404).send(err.error);
    }
}

const updateBlog = async(req, res) => {
    try {
        const {title, preview_img, blog, blog_id} = req.body;
        console.log(req.body);
        if([title, blog].some(el => el === '')){
            res.status(404).send('fill up title and blog');
        }
        await db.query("UPDATE blogs SET title = $1, preview_img = $2, blog = $3 WHERE blog_id = $4", [title, preview_img, blog, blog_id]);
        res.send(true);
        
    } catch (err) {
        res.status(404).send(err.error);
        
    }
}

const check_blog_reaction = async(req, res) => {
    try {
        const id = req.params.id;
        const check = await db.query("SELECT * FROM reactions WHERE blog_id = $1 AND user_id = $2", [id, req.user]);
        res.send(check.rows.length === 1 ? true : false)
        
    } catch (err) {
        console.log(err);
        
    }
}

const likeBlog = async(req, res) => {
    try {
        await db.query("INSERT INTO reactions (user_id, blog_id, reaction) VALUES ($1, $2, 'LIKE')", [req.user, req.params.id]);
        const reacts = await db.query("select blog_id from reactions where blog_id=$1", [req.params.id]);
        res.send({reacts : reacts.rowCount});
    } catch (err) {
        console.log(err);
        
    }
}

const unlikeBlog = async(req, res) => {
    try {
        await db.query("DELETE FROM reactions WHERE user_id = $1 AND blog_id = $2", [req.user, req.params.id]);
        const reacts = await db.query("select blog_id from reactions where blog_id=$1", [req.params.id]);
        res.send({reacts : reacts.rowCount});
    } catch (err) {
        console.log(err);
        
    }
}

const search = async(req, res) => {
    try {
        const {search} = req.body;
        const search_blogs = await db.query("SELECT * FROM blogs WHERE title ILIKE $1 AND user_id = $2", [`%${search}%`, req.user]);
        res.send(search_blogs.rows);
        
    } catch (err) {
        console.log(err);
        
    }
}



module.exports = {
    is_verify,
    publish,
    get_all_users_blog,
    deleteBlog,
    updateBlog,
    check_blog_reaction, 
    likeBlog,
    unlikeBlog,
    search
}