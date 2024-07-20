const express = require("express");
const router = express.Router();
const { register, login, refresh } = require("../controllers/auth");

const {
  validateReg,
  validateLogin,
  validateRefresh,
} = require("../validators/auth");

const { checkErrors } = require("../validators/checkErrors");

router.put("/reg", checkErrors, validateReg, register);
router.post("/login", validateLogin, checkErrors, login);
router.post("/refresh", validateRefresh, checkErrors, refresh);

module.exports = router;
