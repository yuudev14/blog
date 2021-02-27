const Pool = require('pg').Client;

require('dotenv').config();

// const dev_config = {
//     host : process.env.PG_HOST,
//     user : process.env.PG_USER,
//     password : process.env.PG_PASSWORD,
//     port : process.env.PG_PORT,
//     database : process.env.PG_DATABASE
// }

const dev_config = {
    connectionString :`postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`
}

const pro_config = {
    connectionString :process.env.PG_DATABASE,
    ssl: {
        rejectUnauthorized: false
    }
}
const pool = new Pool(process.env.NODE_ENV === 'production' ? pro_config : dev_config);

module.exports = pool;