const db = require('../../db');

const articles = async(req,res) => {
    try {
        const allArricles = await db.query("SELECT * FROM blogs ORDER BY date");
        res.send(allArricles.rows)
        
    } catch (err) {

        console.log(err);
        
    }
}

const article_details = async(req, res) => {
    try {
        const id = req.params.id;
        const article_details = await db.query("SELECT account.first_name, account.last_name, blogs.* FROM blogs LEFT JOIN account ON account.user_id = blogs.user_id WHERE blogs.blog_id = $1", [id]);
        const reacts = await db.query("select blog_id from reactions where blog_id=$1", [id]);
        // console.log(reacts);
        res.send({...article_details.rows[0], reacts : reacts.rowCount});
        
        
    } catch (err) {
        res.status(404).send('false');
        console.log(err);
    }
}

module.exports = {
    articles,
    article_details
}