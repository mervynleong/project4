const express = require("express");
const router = express.Router();

const { authBuyer, authGeneral, authSeller } = require("../middleware/auth");
const {
  createChat,
  updateChatByID,
  getAllChatInProduct,
} = require("../controllers/chat");

router.put("/newChat/:id", authGeneral, createChat);
router.patch("/upChat/:id", authGeneral, updateChatByID);
router.post("/allChat", authGeneral, getAllChatInProduct);

module.exports = router;
