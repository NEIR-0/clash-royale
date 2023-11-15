const express = require("express");
const router = express.Router();
// controllers
const Controllers = require("../controllers/controller");
// middleware
const authorize = require("../middleware/authorize");

router.get("/", Controllers.listCard);
router.get("/market", Controllers.market);
router.get("/inventory", Controllers.inventory);
router.get("/users", Controllers.dataUser);
router.get("/coins", Controllers.listCoins);
router.get("/orders", Controllers.listOrders);
router.put("/users", Controllers.updateUser);
// midtrans
router.get("/payment/midtrans/token", Controllers.getMidtransToken)

router.post("/orders/:coinId", Controllers.addOrder);
router.post("/inventory/:id", Controllers.addCard);
router.get("/card/:id", Controllers.cardId);
router.delete("/delete/:id", authorize, Controllers.deleteCard);

module.exports = router;
