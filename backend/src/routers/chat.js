const express = require("express");
const router = express.Router();

const { authBuyer, authGeneral, authSeller } = require("../middleware/auth");
const { createChat, updateChatByID } = require("../controllers/chat");

router.put("/newChat/:id", authGeneral, createChat);
router.patch("/upChat/:id", authGeneral, updateChatByID);

module.exports = router;
