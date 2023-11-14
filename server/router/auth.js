const express = require("express");
const router = express.Router();
// controllers
const Controllers = require("../controllers/controller")

router.get("/", Controllers.login)


module.exports = router;
