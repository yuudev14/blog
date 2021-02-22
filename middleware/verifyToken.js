const jwt =  require('jsonwebtoken');
const db = require('../db');

require('dotenv').config();

module.exports = async(req, res, next) => {
    try {
        const token = req.headers.token;
        if(!token){
            res.status(403).send('not authorize');
        }else{
            const activeToken = await db.query("SELECT * FROM activeTokens WHERE token = $1", [token]);
            if(activeToken.rows.length === 0){
                res.status(403).send('not authorize');
            }else{
                const payload = jwt.verify(token, process.env.jwtSecret);
                req.user = payload.user;
                next();
            }
        }
    } catch (err) {
        console.log(err);
        res.status(403).send('not authorize');
        await db.query("SELECT * FROM activeTokens WHERE token = $1", [req.headers.token]);
    }
}