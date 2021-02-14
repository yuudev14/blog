const jtoken = require('jsonwebtoken');

require('dotenv').config();

module.exports = (user_id) => {
    const payload = {
        user : user_id
    };

    return jtoken.sign(payload, process.env.jwtSecret, {expiresIn : '1day'});

}