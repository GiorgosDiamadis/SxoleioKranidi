const express = require("express");

const cors = require("cors");
const userRoutes = require("./Routes/user");
const postRoutes = require("./Routes/post");
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded());
app.use(express.json({ extended: false }));
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use((req, res, next) => {
  res.header("Access-Control-Expose-Headers", "authorization");
  next();
});

app.use("/user", userRoutes);
app.use("/posts",postRoutes)
app.listen(PORT, () => {
  console.log(`Serving on port ${PORT}`);
});
