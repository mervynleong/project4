const Auth = require("../models/Auth");
const User = require("../models/User");

const createUser = async (req, res) => {
  try {
    const user = await Auth.findOne({ _id: req.params.id });
    const newUser = {
      username: req.body.username,
      preferredLocation: req.body.preferredLocation,
      interests: req.body.interests,
      rating: req.body.rating,
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

module.exports = { createUser };
