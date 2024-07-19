const express = require("express");
const router = express.Router();

const {
  createUser,
  updateUserByID,
  getAllUsers,
} = require("../controllers/user");

const { authBuyer, authGeneral, authSeller } = require("../middleware/auth");

router.put("/newUser/:id", authGeneral, createUser);
router.patch("/updateUser/:id", authGeneral, updateUserByID);
router.get("/allusers", getAllUsers);

module.exports = router;
