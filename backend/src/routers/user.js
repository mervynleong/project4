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

router.put("/newUser/:id", authGeneral, createUser);
router.patch("/updateUser/:id", authGeneral, updateUserByID);
router.get("/allusers", authGeneral, getAllUsers);
router.post("/getuserby/:id", authGeneral, getUserById);
router.post("/byIdLink", authGeneral, getUserByIDLink);

module.exports = router;
