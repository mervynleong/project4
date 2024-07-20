const express = require("express");
const router = express.Router();

const {
  createUser,
  updateUserByID,
  getAllUsers,
  getUserById,
  getUserByIDLink,
} = require("../controllers/user");

const { authBuyer, authGeneral, authSeller } = require("../middleware/auth");

const { checkErrors } = require("../validators/checkErrors");
const { validateIdInParam, validateUserData } = require("../validators/user");

router.put(
  "/newUser/:id",
  validateIdInParam,
  checkErrors,
  authGeneral,
  createUser
);
router.patch(
  "/updateUser/:id",
  validateUserData,
  checkErrors,
  authGeneral,
  updateUserByID
);
router.get("/allusers", authGeneral, getAllUsers);
router.post(
  "/getuserby/:id",
  validateIdInParam,
  checkErrors,
  authGeneral,
  getUserById
);
router.post("/byIdLink", authGeneral, getUserByIDLink);

module.exports = router;
