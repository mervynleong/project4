const express = require("express");
const router = express.Router();

const {
  validateReg,
  validateLogin,
  validateRefresh,
  validateDeleteAcc,
  validateUserDetails,
} = require("../validators/auth");

const {
  registerPG,
  loginPG,
  deleteAcc,
  updateAcc,
  getAllInfo,
} = require("../controllers/auth");
const { authAdmin, authGeneral } = require("../middleware/auth");

const { checkErrors } = require("../validators/checkErrors");

router.put("/regPg", validateReg, checkErrors, registerPG);
router.post("/logPg", validateLogin, checkErrors, loginPG);
router.delete("/delAcc", validateDeleteAcc, checkErrors, authAdmin, deleteAcc);
router.patch(
  "/update",
  validateUserDetails,
  checkErrors,
  authGeneral,
  updateAcc
);

router.get("/getUser", authGeneral, getAllInfo);

module.exports = router;
