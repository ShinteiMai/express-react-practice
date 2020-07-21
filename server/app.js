// * Modules
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// * Express Setup
const app = express();

app.use(bodyParser.json()); // * setup bodyParser ke json()
app.use(cors()); // * setup cors()

// * Configuration headers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// * Routes
const postRouter = require("./routes/post");

app.use("/", postRouter);

// * Listen to Port XXXX

mongoose
  .connect("mongodb://localhost:27017/practice-db", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then((result) => {
    app.listen(3003, () => {
      console.log("Server has started on port 3003");
    });
  })
  .catch((err) => {
    console.log(err);
  });




