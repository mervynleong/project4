const express = require("express");
const router = express.Router();

const { authBuyer, authGeneral, authSeller } = require("../middleware/auth");

module.exports = router;
