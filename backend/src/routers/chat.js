const express = require("express");
const router = express.Router();

const { authBuyer, authGeneral, authSeller } = require("../middleware/auth");
const { createChat } = require("../controllers/chat");

router.put("/newChat/:id", createChat);

module.exports = router;
