const Auth = require("../models/Auth");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

const register = async (req, res) => {
  try {
    const authentication = await Auth.findOne({ email: req.body.email });
    if (authentication) {
      return res.status(400).json({ status: "error", msg: "duplicate email" });
    }
    const hash = await bcrypt.hash(req.body.password, 12);
    await Auth.create({
      email: req.body.email,
      hash,
      role: req.body.role,
    });
    res.json({ status: "ok", msg: "buyer/seller account created" });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({ status: "error", msg: "invalid registration" });
  }
};

module.exports = { register };
