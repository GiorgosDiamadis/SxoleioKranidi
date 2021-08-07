const express = require("express");

const cors = require("cors");
const userRoutes = require("./Routes/user");
const postRoutes = require("./Routes/post");
const catchAsync = require("./Utils/catchAsync")
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded());
app.use(express.json({ extended: false }));
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use((req, res, next) => {
  res.header("Access-Control-Expose-Headers", "authorization");
  next();
});

app.post("/user/login",catchAsync(async (req,res,next)=>{

}))

app.post("/user/register",catchAsync(async (req,res,next)=>{

}))


app.post("/posts",catchAsync(async (req,res,next)=>{
  res.send("hey")
}))
app.post("/posts/create",catchAsync(async (req,res,next)=>{
  res.send("hey")
}))
app.post("/posts/delete",catchAsync(async (req,res,next)=>{
  res.send("hey")
}))
app.post("/posts/update",catchAsync(async (req,res,next)=>{
  res.send("hey")
}))
app.listen(PORT, () => {
  console.log(`Serving on port ${PORT}`);
});
