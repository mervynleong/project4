const express = require("express");
const router = express.Router();
const { register } = require("../controllers/auth");

router.put("/reg", register);

module.exports = router;
