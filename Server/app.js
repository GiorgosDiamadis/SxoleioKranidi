if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path")

var cloudinary = require("./Cloudinary");

const fileUpload = require("express-fileupload");
const {
    getPosts,
    savePost,
    deletePost,
    updatePost,
    getPost,
} = require("./Controllers/post");
const {login} = require("./Controllers/user");
const {loginValidation} = require("./Middleware/validateUser");
const {
    saveValidation: savePostValidation,
} = require("./Middleware/validatePost");
const isAuthenticated = require("./Middleware/isAuthenticated");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(fileUpload({}));
app.use(express.urlencoded({limit: "10mb"}));
app.use(express.json({extended: false, limit: "10mb"}));
app.use(cors({origin: "http://localhost:3000", credentials: true}));
app.use((req, res, next) => {
    res.header("Access-Control-Expose-Headers", "authorization");
    next();
});

app.use(express.static(path.join(__dirname, "build")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.post("/user/login", loginValidation, login);

app.post("/posts", getPosts);
app.post("/posts/get", getPost);
app.post("/posts/create", isAuthenticated, savePostValidation, savePost);
app.post("/posts/delete", isAuthenticated, deletePost);
app.post("/posts/update", isAuthenticated, savePostValidation, updatePost);


app.listen(PORT, () => {
    console.log(`Serving on port ${PORT}`);
});
