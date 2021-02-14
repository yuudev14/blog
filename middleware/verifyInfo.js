module.exports = async(req, res, next) => {
    try {
        const {first_name, last_name, password, email, retry_password} = req.body;
        if([first_name, last_name, password, email, retry_password].some(info => info == false)){
            res.send('missing credentials');
        }else{
            next();
        }
        
    } catch (err) {
        console.log(err.message);
        res.send('missing credentials');
        
    }
}