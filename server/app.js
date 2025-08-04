require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
// module.exports = app;
