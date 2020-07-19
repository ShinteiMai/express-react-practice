// * Modules
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// * Express Setup
const app = express();

app.use(bodyParser.json()) // * setup bodyParser ke json()
app.use(cors()); // * setup cors()
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



const postRouter = require('./routes/post');
app.use('/', postRouter);

// * Listen to Port XXXX
app.listen(3003, () => {
    console.log('Server has started on port 3003');
});


