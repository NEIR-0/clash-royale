const express = require("express");
const app = express();
// router
const public = require("./router/public");
const auth = require("./router/public");


app.use(express.json());

// url
app.use("/", auth);
app.use("/", public);


module.exports = app;
