const catchAsync = require("../Utils/catchAsync");
const db = require("../db");
const Post = require("../Models/post");
const {validationResult} = require("express-validator");
const {v2: cloudinary} = require("cloudinary");
const fs = require("fs");
const {log} = require("nodemon/lib/utils");

module.exports.getPosts = catchAsync(async (req, res, next) => {
    const {amount} = req.body;
    let posts;
    if (amount) {
        posts = await Post.getAll(amount);
    } else {
        posts = await Post.getAll();
    }

    res.status(200).send(posts);
});
module.exports.getPost = catchAsync(async (req, res, next) => {
    const {post_id} = req.body;
    let post = await Post.get(post_id);

    res.status(200).send(post);
});
module.exports.savePost = catchAsync(async (req, res, next) => {
    const error = validationResult(req);

    if (!error.isEmpty()) {
        res.status(400).send(error);
        return;
    }

    let imgURL = null;
    let public_id = "";

    if (req.files !== null) {
        const file = req.files.file;
        const filePath = `${__dirname}/${file.name}`;

        await file.mv(filePath);

        const uploadRes = await cloudinary.uploader.upload(filePath);
        imgURL = cloudinary.image(uploadRes.public_id, {
            height: 366,
            width: 600,
            crop: "scale",
        });

        tmp1 = imgURL.substr(14)
        tmp2 = imgURL.substr(0,14)
        tmp2 += "s"

        imgURL = tmp2 + tmp1;

        imgURL = [imgURL.slice(0, 4), " class='rounded-xl'", imgURL.slice(4)].join(
            ""
        );

        public_id = uploadRes.public_id;
        await fs.unlinkSync(filePath);
    } else {
        imgURL =
            "<img class='rounded-xl' style='height: 400px; width:600px;' src='/images/announcement.png'/>";
    }

    let {title, body, summary} = req.body;

    const newPost = new Post(title, body, summary, imgURL, public_id);
    const rs = await newPost.save();

    res.status(200).send({rs});
});
module.exports.deletePost = catchAsync(async (req, res, next) => {
    const {post_id} = req.body;
    const post = await Post.get(post_id);
    let p_id = post[0].public_id;
    console.log(post)
    const rs = await Post.delete(post_id);
    try {
        await cloudinary.uploader.destroy(p_id)

    } catch (e) {
        console.log(e)
    }

    res.status(200).send({rs});
});
module.exports.updatePost = catchAsync(async (req, res, next) => {
    const error = validationResult(req);

    if (!error.isEmpty()) {
        res.status(400).send(error);
        return;
    }

    console.log(req.body)
    console.log(req.files)
    let {title, body, post_id, summary, imgURL, public_id} = req.body;

    if (req.files !== null) {

        try {
            await cloudinary.uploader.destroy(public_id);

        } catch (e) {

        }

        const file = req.files.file;
        const filePath = `${__dirname}/${file.name}`;

        await file.mv(filePath);


        const uploadRes = await cloudinary.uploader.upload(filePath);
        imgURL = cloudinary.image(uploadRes.public_id, {
            height: 366,
            width: 600,
            crop: "scale",
        });
        
        tmp1 = imgURL.substr(14)
        tmp2 = imgURL.substr(0,14)
        tmp2 += "s"

        imgURL = tmp2 + tmp1;

        imgURL = [imgURL.slice(0, 4), " class='rounded-xl'", imgURL.slice(4)].join(
            ""
        );

        public_id = uploadRes.public_id;
        await fs.unlinkSync(filePath);
    }

    const result = await Post.update(title, body, summary, imgURL, public_id, post_id);

    res.status(200).send(result);
});
