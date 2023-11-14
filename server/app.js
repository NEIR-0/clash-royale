require("dotenv").config();
const express = require("express");
const app = express();
// middleware
const errHandlers = require("./middleware/errorHandlers");
const authentications = require("./middleware/authentication");
// router
const main = require("./router/main");
const auth = require("./router/auth");

app.use(express.json());

// auth
app.use("/", auth);

// auth
app.use(authentications);

app.use("/", main);

// errHandlers
app.use(errHandlers);

module.exports = app;
