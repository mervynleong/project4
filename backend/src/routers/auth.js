const express = require("express");
const router = express.Router();

const {
  validateReg,
  validateLogin,
  validateRefresh,
} = require("../validators/auth");

const { registerPG, loginPG, deleteAcc } = require("../controllers/auth");
const { authAdmin } = require("../middleware/auth");

const { checkErrors } = require("../validators/checkErrors");

// router.put("/reg", checkErrors, validateReg, register);
// router.post("/login", validateLogin, checkErrors, login);
// router.post("/refresh", validateRefresh, checkErrors, refresh);
router.put("/regPg", registerPG);
router.post("/logPg", loginPG);
router.delete("/delAcc", authAdmin, deleteAcc);

module.exports = router;
