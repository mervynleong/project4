const { body } = require("express-validator");

const validateReg = [
  body("email", "email is required").notEmpty().isEmail(),
  body("password", "password is required").notEmpty().isString(),
  body(
    "password",
    "password length min is 8 and max is 50 characters"
  ).isLength({
    min: 8,
    max: 50,
  }),
];

const validateLogin = [
  body("email", "valid email is required").notEmpty().isEmail(),
  body("password", "password is required").notEmpty().isString(),
];

const validateRefresh = [
  body("refresh", "valid refresh token is required").notEmpty().isJWT(),
];

module.exports = {
  validateLogin,
  validateRefresh,
  validateReg,
};
