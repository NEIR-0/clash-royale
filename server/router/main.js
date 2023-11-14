const express = require("express");
const router = express.Router();
// controllers
const Controllers = require("../controllers/controller");
// middleware
const authorize = require("../middleware/authorize");

router.get("/", Controllers.listCard);
router.get("/inventory", Controllers.inventory);
router.get("/coins", Controllers.listCoins);
router.post("/inventory/:id", Controllers.addCard);
router.get("/card/:id", Controllers.cardId);
router.delete("/delete/:id", authorize, Controllers.deleteCard);

module.exports = router;
