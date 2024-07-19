const Auth = require("../models/Auth");
const User = require("../models/User");

const createUser = async (req, res) => {
  try {
    const user = await Auth.findOne({ _id: req.params.id });
    const newUser = {
      username: req.body.username,
      preferredLocation: req.body.preferredLocation,
      interests: req.body.interests,
      idLink: user._id,
    };
    const newUserModel = new User(newUser);
    await newUserModel.save();
    res.json({ status: "ok", msg: "buyer/seller User created" });
  } catch (error) {
    console.error(error.message);
    res.json({ status: "error", msg: "error creating User" });
  }
};

const updateUserByID = async (req, res) => {
  try {
    const updateUser = {
      username: req.body.username,
      preferredLocation: req.body.preferredLocation,
      interests: req.body.interests,
    };
    await User.findByIdAndUpdate(req.params.id, updateUser);
    res.json({ status: "ok", msg: "User updated" });
  } catch (error) {
    console.error(error.message);
    res.json({ status: "error", msg: "error updating user" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find().populate("idLink", "username");
    res.json(allUsers);
  } catch (error) {
    console.error(error.message);
    res.json({ status: "error", msg: "error fetching users" });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.json({ status: "error", msg: "error fetching user" });
  }
};

module.exports = { createUser, updateUserByID, getAllUsers, getUserById };
