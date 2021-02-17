const db = require('../../db');

const is_verify = async(req, res) => {
    try {
        res.send(true)
        
    } catch (error) {
        res.send(false)
        
    }
}

module.exports = {
    is_verify,
}