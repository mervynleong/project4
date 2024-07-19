const express = require("express");
const router = express.Router();

const {
  createUser,
  updateUserByID,
  getAllUsers,
  getUserById,
} = require("../controllers/user");

const { authBuyer, authGeneral, authSeller } = require("../middleware/auth");

router.put("/newUser/:id", authGeneral, createUser);
router.patch("/updateUser/:id", authGeneral, updateUserByID);
router.get("/allusers", getAllUsers);
router.post("/getuserby/:id", getUserById);

module.exports = router;
