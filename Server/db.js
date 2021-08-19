const mariadb = require("mariadb");
const mongoose = require("mongoose");
require("dotenv").config();

// const pool = mariadb.createPool({
//     user: process.env.DB_USERNAME,
//     password: process.env.DB_PASSWORD,
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT,
//     database: process.env.DB_DATABASE,
//     connectionLimit: 5,
//     allowPublicKeyRetrieval: true,
// });
// pool.getConnection()
//     .then(conn => {
//
//         conn.query("SELECT 1 as val")
//             .then((rows) => {
//                 console.log(rows);
//             })
//             .then((res) => {
//                 console.log(res);
//                 conn.end();
//             })
//             .catch(err => {
//                 console.log("error1")
//                 console.log(err);
//                 conn.end();
//             })
//
//     }).catch(err => {
//     console.log("error2")
//     console.log(err);
//
// });

mongoose.connect(process.env.MONGO, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

module.exports = db;

