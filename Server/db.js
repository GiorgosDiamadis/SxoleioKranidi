const mariadb = require("mariadb");
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}
const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    connectionLimit: 5
});

module.exports = pool;

