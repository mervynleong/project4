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

const { validateChatData, validateChatId } = require("../validators/chat");
const { checkErrors } = require("../validators/checkErrors");

router.put(
  "/new/:item_uuid",
  validateChatId,
  validateChatData,
  checkErrors,
  authBuyer,
  createChatPGBuyer
);
router.put(
  "/reply/:item_uuid",
  validateChatId,
  validateChatData,
  checkErrors,
  authGeneral,
  replyChatPG
);
router.delete("/delete/:chat_table_id", authAdmin, deleteChatPG);
router.get(
  "/all/:item_uuid",
  validateChatId,
  checkErrors,
  authGeneral,
  getChatwithItemId
);

module.exports = router;
