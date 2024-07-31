const express = require("express");
const router = express.Router();

const { authBuyer, authGeneral } = require("../middleware/auth");
const {
  replyChatPG,
  deleteChatPG,
  getChatwithItemId,
  createChatPGBuyer,
  updateChatwithChatId,
  getAllChatToUser,
  getUserInfoWithChat,
} = require("../controllers/chat");

const {
  validateChatData,
  validateChatUUID,
  validateItemUUID,
} = require("../validators/chat");
const { checkErrors } = require("../validators/checkErrors");
const { validateIdInParam } = require("../validators/product");

router.put(
  "/new/:item_uuid",
  validateItemUUID,
  validateChatData,
  checkErrors,
  authBuyer,
  createChatPGBuyer
);
router.put(
  "/reply/:item_uuid",
  validateItemUUID,
  validateChatData,
  checkErrors,
  authGeneral,
  replyChatPG
);

router.delete(
  "/delete/:chat_table_id",
  validateChatUUID,
  checkErrors,
  authGeneral,
  deleteChatPG
);

router.get(
  "/all/:item_uuid",
  validateItemUUID,
  checkErrors,
  authGeneral,
  getChatwithItemId
);

router.patch(
  "/update/:chat_table_id",
  validateChatUUID,
  validateChatData,
  checkErrors,
  authGeneral,
  updateChatwithChatId
);

router.get(
  "/userInfo/:item_uuid",
  validateIdInParam,
  checkErrors,
  authGeneral,
  getUserInfoWithChat
);

router.get("/allToUser", authGeneral, getAllChatToUser);

module.exports = router;
