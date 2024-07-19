const express = require("express");
const router = express.Router();

const { createUser } = require("../controllers/user");

const { authBuyer, authGeneral, authSeller } = require("../middleware/auth");

router.put("/newUser/:id", authGeneral, createUser);

module.exports = router;
