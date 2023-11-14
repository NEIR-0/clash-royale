const express = require("express");
const router = express.Router();
// controllers
const Controllers = require("../controllers/controller")

router.get("/", Controllers.listCard)
// router.get("/", (req, res) => {
//   res.send("masuk");
// });

module.exports = router;
