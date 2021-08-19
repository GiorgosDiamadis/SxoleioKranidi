const catchAsync = require("../Utils/catchAsync");
const db = require("../db");
const Post = require("../Models/post");
const {validationResult} = require("express-validator");
const {v2: cloudinary} = require("cloudinary");
const fs = require("fs");
const {log} = require("nodemon/lib/utils");

module.exports.getPosts = catchAsync(async (req, res, next) => {
    const {amount} = req.body;
    let posts = await Post.find({}).sort({publishedAt: -1});
    if (amount) {

    } else {

    }

    res.status(200).send(posts);
});
module.exports.getPost = catchAsync(async (req, res, next) => {
    const {post_id} = req.body;

    let post = await Post.findById(post_id);

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
    let publishedAt = new Date().toISOString();

    const newPost = new Post({title, body, summary, publishedAt, imgURL, public_id});
    console.log(newPost)

    await newPost.save();
    res.status(200).send(newPost);

});
module.exports.deletePost = catchAsync(async (req, res, next) => {
    const {post_id} = req.body;
    let post = await Post.findById(post_id);
    let p_id = post.public_id;
    const rs = await Post.findByIdAndDelete(post_id);
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


    let {title, body, post_id, summary, imgURL, public_id} = req.body;

    console.log(post_id)

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
        imgURL = [imgURL.slice(0, 4), " class='rounded-xl'", imgURL.slice(4)].join(
            ""
        );

        public_id = uploadRes.public_id;
        await fs.unlinkSync(filePath);
    }

    const result = await Post.findByIdAndUpdate(post_id
        , {
            title, body, summary, imgURL, public_id, post_id
        });

    res.status(200).send(result);
});
