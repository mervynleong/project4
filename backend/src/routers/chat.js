const express = require("express");
const router = express.Router();

const { authBuyer, authGeneral, authSeller } = require("../middleware/auth");
const {
  createChat,
  updateChatByID,
  getAllChatInProduct,
} = require("../controllers/chat");

const { validateChatData } = require("../validators/chat");
const { checkErrors } = require("../validators/checkErrors");

router.put(
  "/newChat/:id",
  validateChatData,
  checkErrors,
  authGeneral,
  createChat
);
router.patch(
  "/upChat/:id",
  validateChatData,
  checkErrors,
  authGeneral,
  updateChatByID
);
router.post("/allChat", authGeneral, getAllChatInProduct);

module.exports = router;
