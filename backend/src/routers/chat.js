const express = require("express");
const router = express.Router();

const {
  authBuyer,
  authGeneral,
  authAdminAndSeller,
} = require("../middleware/auth");
const {
  replyChatPG,
  deleteChatPG,
  getChatwithItemId,
  createChatPGBuyer,
  updateChatwithChatId,
  getAllChatToUser,
  getUserInfoWithChat,
} = require("../controllers/chat");

const { validateChatData, validateChatId } = require("../validators/chat");
const { checkErrors } = require("../validators/checkErrors");
const { validateIdInParam } = require("../validators/product");

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
router.delete("/delete/:chat_table_id", authGeneral, deleteChatPG);
router.get(
  "/all/:item_uuid",
  validateChatId,
  checkErrors,
  authGeneral,
  getChatwithItemId
);

router.patch(
  "/update/:chat_table_id",
  validateChatData,
  checkErrors,
  authGeneral,
  updateChatwithChatId
);

router.get("/allToUser", authGeneral, getAllChatToUser);

router.get(
  "/userInfo/:item_uuid",
  validateIdInParam,
  checkErrors,
  authGeneral,
  getUserInfoWithChat
);

module.exports = router;
