const express = require("express");
const router = express.Router();

router.get("/midtrans", (req, res) => {
  res.status(200).json({ messgae: "masuk maseh midtrans" });
});

module.exports = router;
