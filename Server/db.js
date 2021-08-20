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
pool.getConnection()
    .then(conn => {

        conn.query("SELECT 1 as val")
            .then((rows) => {
                // console.log(rows)

            })
            .then((res) => {
                // console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }
                conn.end();
            })
            .catch(err => {
                //handle error
                // console.log(err);
                conn.end();
            })

    }).catch(err => {
    //not connected
});


module.exports = pool;

