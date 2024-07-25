const express = require("express");
const router = express.Router();

const {
  validateReg,
  validateLogin,
  validateRefresh,
} = require("../validators/auth");

const {
  registerPG,
  loginPG,
  deleteAcc,
  updateAcc,
} = require("../controllers/auth");
const { authAdmin, authGeneral } = require("../middleware/auth");

const { checkErrors } = require("../validators/checkErrors");

router.put("/regPg", registerPG);
router.post("/logPg", loginPG);
router.delete("/delAcc", authAdmin, deleteAcc);
router.patch("/update", authGeneral, updateAcc);

module.exports = router;
