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
  body(
    "type",
    "type is required and is limited to BUYER, SELLER, ADMIN"
  ).notEmpty(),
  body("username", "Please limit username to 20 characters")
    .notEmpty()
    .isString()
    .isLength({
      min: 1,
      max: 20,
    }),
];

const validateLogin = [
  body("email", "valid email is required").notEmpty().isEmail(),
  body("password", "password is required").notEmpty().isString(),
];

const validateRefresh = [
  body("refresh", "valid refresh token is required").notEmpty().isJWT(),
];

const validateDeleteAcc = [
  body("email", "a valid email is required").notEmpty().isEmail(),
];

const validateUserDetails = [
  body("interest", "an interest must be stated").notEmpty().isString(),
  body("preferred_location", "preferred_location must not be empty")
    .notEmpty()
    .isString(),
];

module.exports = {
  validateLogin,
  validateRefresh,
  validateReg,
  validateDeleteAcc,
  validateUserDetails,
};
