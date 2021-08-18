const mariadb = require("mariadb/callback");
require("dotenv").config();

const pool = mariadb.createConnection({
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  allowPublicKeyRetrieval: true,
});
module.exports = pool;

