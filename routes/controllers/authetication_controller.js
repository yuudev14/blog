const db = require('../../db');

const register = async(req, res) => {
    console.log(req.body)
    try {
        const {email, first_name, last_name, password, retry_password} = req.body;
        if(password.length >= 8){
            if(password === retry_password){
                const newAccount = await db.query("INSERT INTO account (email, first_name, last_name, password) VALUES ($1, $2, $3, $4) RETURNING * ",
                [email, first_name, last_name, password]);
                res.send(newAccount.rows); 
            }else{
                res.send('password and retry password not the same');
            }
        }else{
            res.send('password too short');
        } 
    } catch (e) {
        console.log(e);
        if(e.constraint === 'account_email_key"'){
            res.send('email already exist');
        }else{
            res.send('complete the form');
        }
    }
}

module.exports = {
    register
}