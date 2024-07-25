const express = require("express");
const router = express.Router();

const {
  authBuyer,
  authGeneral,
  authSeller,
  authAdmin,
} = require("../middleware/auth");
const {
  replyChatPG,
  deleteChatPG,
  getChatwithItemId,
  createChatPGBuyer,
} = require("../controllers/chat");

const { validateChatData } = require("../validators/chat");
const { checkErrors } = require("../validators/checkErrors");

router.put("/new/:item_uuid", authBuyer, createChatPGBuyer);
router.put("/reply/:item_uuid", authGeneral, replyChatPG);
router.delete("/delete/:chat_table_id", authAdmin, deleteChatPG);
router.get("/all/:item_uuid", authGeneral, getChatwithItemId);

module.exports = router;
