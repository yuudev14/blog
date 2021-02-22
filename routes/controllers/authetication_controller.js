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
                const blogtoken = generateToken(newAccount.rows[0].user_id);
                await db.query("INSERT INTO activeTokens (token) VALUES ($1)", [blogtoken]);
                res.send({blogtoken}); 
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
        if([email, password].some(info => !info)){
            res.status(403).send('fill in missing credentials');
        }else{
            const account = await db.query("SELECT user_id, password FROM account WHERE email = $1",
            [email]);
            if(account.rows.length === 1){
                if(account.rows[0].password === password){
                    const blogtoken = generateToken(account.rows[0].user_id);
                    await db.query("INSERT INTO activeTokens (token) VALUES ($1)", [blogtoken]);
                    res.send({blogtoken});
                }else{
                    res.status(403).send('wrong password');
                }  
            }else{
                res.status(403).send('email not registered');
            }  

        }
        
    } catch (err) {
        console.log(err);
    }
}

const logout = async(req, res) => {
    console.log(req.headers.token);
    try {
        await db.query("DELETE from activeTokens WHERE token = $1", [req.headers.token]);
        res.send(true);
        
    } catch (err) {
        res.send(false)
    }
}
module.exports = {
    register,
    login,
    logout
}