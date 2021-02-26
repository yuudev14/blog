const Pool = require('pg').Pool;

require('dotenv').config();

const dev_config = {
    host : process.env.PG_HOST,
    user : process.env.PG_USER,
    password : process.env.PG_PASSWORD,
    port : process.env.PG_PORT,
    database : process.env.PG_DATABASE
}

const pro_config = {
    connectionString : process.env.DATABASE_URL
}
const pool = new Pool(process.env.NODE_ENV === 'production' ? pro_config : dev_config);

module.exports = pool;