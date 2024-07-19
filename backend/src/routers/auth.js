const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/auth");

router.put("/reg", register);
router.post("/login", login);

module.exports = router;
