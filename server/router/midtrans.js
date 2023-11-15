const express = require("express");
const router = express.Router();
// controller
const Controllers = require("../controllers/controller");

router.post("/payment/midtrans/notifications", Controllers.notifications);

module.exports = router;
