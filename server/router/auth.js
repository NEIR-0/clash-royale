const express = require("express");
const router = express.Router();
// controllers
const Controllers = require("../controllers/controller");

router.post("/login", Controllers.login);
router.post("/googleLogin", Controllers.googleLogin);
router.post("/register", Controllers.register);

module.exports = router;
