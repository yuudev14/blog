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
        const article_details = await db.query("SELECT * FROM blogs WHERE blog_id = $1", [id]);
        res.send(article_details.rows[0]);
        
    } catch (err) {
        res.status(404).send('false');
        
    }
}

module.exports = {
    articles,
    article_details
}