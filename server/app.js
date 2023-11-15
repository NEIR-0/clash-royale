require("dotenv").config();
const express = require("express");
const app = express();
// middleware
const errHandlers = require("./middleware/errorHandlers");
const authentications = require("./middleware/authentication");
// router
const main = require("./router/main");
const auth = require("./router/auth");
const midtrans = require("./router/midtrans");

// deploy
const cors = require("cors");
app.use(cors());

app.use(express.json());

// midtrans
app.use("/", midtrans);

// auth
app.use("/", auth);

// auth
app.use(authentications);

app.use("/", main);

// errHandlers
app.use(errHandlers);

module.exports = app;
