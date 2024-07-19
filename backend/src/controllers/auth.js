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

const login = async (req, res) => {
  try {
    const authentication = await Auth.findOne({ email: req.body.email });
    if (!authentication) {
      return res
        .status(401)
        .json({ status: "error", msg: "user is not authorised" });
    }
    const result = await bcrypt.compare(req.body.password, authentication.hash);
    if (!result) {
      console.log("email or password error");
      return res.status(401).json({ status: "error", msg: "login failed" });
    }

    const claims = {
      email: authentication.email,
      role: authentication.role,
    };

    const access = jwt.sign(claims, process.env.ACCESS_SECRET, {
      expiresIn: "20m",
      jwtid: uuidv4(),
    });

    const refresh = jwt.sign(claims, process.env.REFRESH_SECRET, {
      expiresIn: "30d",
      jwtid: uuidv4(),
    });

    res.json({ access, refresh });
  } catch (error) {
    console.error(error.message);
    res.status(400).json({
      status: "error",
      msg: "login failed",
    });
  }
};

module.exports = { register, login };
