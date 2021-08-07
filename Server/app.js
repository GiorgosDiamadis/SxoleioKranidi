if (process.env.NODE_ENV !== "production") {
    require("dotenv").config()
}

const express = require("express");
const cors = require("cors");
const fs = require('fs')

var cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
})


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
app.post("/posts/create", async (req, res, next) => {

    if (req.files === null) {
        return res.status(400).json({msg: 'No file uploaded'});
    }



    const file = req.files.file;
    const filePath = `${__dirname}/${file.name}`
    file.mv(filePath, async err => {
        if (err) {
            console.error(err);
            return res.status(500).send(err);
        }
        const result = await cloudinary.uploader.upload(filePath)
        fs.unlinkSync(filePath)
        res.json(result);
    });


});
app.post("/posts/delete", isAuthenticated, deletePost);
app.post("/posts/update", isAuthenticated, saveValidation, updatePost);

app.listen(PORT, () => {
    console.log(`Serving on port ${PORT}`);
});
