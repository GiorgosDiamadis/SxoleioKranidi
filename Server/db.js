const mariadb = require("mariadb");
require('dotenv').config()

const pool = mariadb.createPool({
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    allowPublicKeyRetrieval: true,
    connectionLimit: 5
})

module.exports = pool;
