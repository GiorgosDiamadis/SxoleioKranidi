if(process.env.NODE_ENV !== "production"){
    require("dotenv").config()
}

const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload")
const {
    getPosts,
    savePost,
    deletePost,
    updatePost,
    getPost,
} = require("./Controllers/post");
const {login} = require("./Controllers/user");
const {loginValidation} = require("./Middleware/validateUser");
const {saveValidation} = require("./Middleware/validatePost");
const isAuthenticated = require("./Middleware/isAuthenticated");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(fileUpload({}))
app.use(express.urlencoded({limit: '10mb'}));
app.use(express.json({extended: false, limit: '10mb'}));
app.use(cors({origin: "http://localhost:3000", credentials: true}));
app.use((req, res, next) => {
    res.header("Access-Control-Expose-Headers", "authorization");
    next();
});


app.post("/user/login", loginValidation, login);

app.post("/posts", getPosts);
app.post("/posts/get", getPost);
// app.post("/posts/create", isAuthenticated, saveValidation, savePost);
app.post("/posts/create", (req, res, next) => {

    if (req.files === null) {
        return res.status(400).json({msg: 'No file uploaded'});
    }

    const file = req.files.file;

    file.mv(`${__dirname}/${file.name}`, err => {
        if (err) {
            console.error(err);
            return res.status(500).send(err);
        }

        res.json(file);
    });

});
app.post("/posts/delete", isAuthenticated, deletePost);
app.post("/posts/update", isAuthenticated, saveValidation, updatePost);

app.listen(PORT, () => {
    console.log(`Serving on port ${PORT}`);
});
