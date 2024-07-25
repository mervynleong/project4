const express = require("express");
const router = express.Router();

const {
  authBuyer,
  authGeneral,
  authSeller,
  authAdmin,
} = require("../middleware/auth");
const {
  createChat,
  updateChatByID,
  getAllChatInProduct,
  replyChatPG,
  deleteChatPG,
  getChatwithItemId,
} = require("../controllers/chat");

const { validateChatData } = require("../validators/chat");
const { checkErrors } = require("../validators/checkErrors");

const { createChatPGBuyer } = require("../controllers/chat");

router.put("/new/:item_uuid", authBuyer, createChatPGBuyer);
router.put("/reply/:item_uuid", authGeneral, replyChatPG);
router.delete("/delete/:chat_table_id", authAdmin, deleteChatPG);
router.get("/all/:item_uuid", authGeneral, getChatwithItemId);

// router.put(
//   "/newChat/:id",
//   validateChatData,
//   checkErrors,
//   authGeneral,
//   createChat
// );
// router.patch(
//   "/upChat/:id",
//   validateChatData,
//   checkErrors,
//   authGeneral,
//   updateChatByID
// );
// router.post("/allChat", authGeneral, getAllChatInProduct);

module.exports = router;
