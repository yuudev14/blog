const db = require('../../db');

const register = async(req, res) => {
    console.log(req.body)
    try {
        const {email, username, password} = req.body;
        const newAccount = await db.query("INSERT INTO account (email, username, password) VALUES ($1, $2, $3) RETURNING * ",
        [email, username, password]);
        res.send(newAccount.rows);     
    } catch (e) {
        console.log(e);
        if(e.constraint === 'account_username_key'){
            res.send('username already exist');
        }else if(e.constraint === "password_length"){
            res.send('password too short');
        }else{
            res.send('email already exist');
        }
    }
}

module.exports = {
    register
}