const express = require("express");
const router = express.Router();
const { register, login, refresh } = require("../controllers/auth");

const {
  validateReg,
  validateLogin,
  validateRefresh,
} = require("../validators/auth");

const { checkErrors } = require("../validators/checkErrors");

const { authGeneral, authSeller } = require("../middleware/auth");

router.put("/reg", register);
router.post("/login", login);
router.post("/refresh", refresh);

module.exports = router;
