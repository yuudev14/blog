const db = require('../../db');
const generateToken = require('../../utils/generateToken');

const register = async(req, res) => {
    console.log(req.body)
    try {
        const {email, first_name, last_name, password, retry_password} = req.body;
        if(password.length >= 8){
            if(password === retry_password){
                const newAccount = await db.query("INSERT INTO account (email, first_name, last_name, password) VALUES ($1, $2, $3, $4) RETURNING * ",
                [email, first_name, last_name, password]);
                const token = generateToken(newAccount.rows[0].user_id);
                res.send({token}); 
            }else{
                res.status(403).send('password and retry password not the same');
            }
        }else{
            res.status(403).send('password too short');
        } 
    } catch (e) {
        console.log(e);
        if(e.constraint === 'account_email_key'){
            res.status(403).send('email already exist');
        }else{
            res.status(403).res.send('complete the form');
        }
    }
}

const login = async(req, res) => {
    try {
        const {email, password} = req.body;
        const account = await db.query("SELECT user_id FROM account WHERE email = $1 AND password = $2",
        [email, password]);
        const token = generateToken(account.rows[0].user_id);
        res.send({token});
        
    } catch (err) {
        console.log(err);
        
    }
}

module.exports = {
    register,
    login
}