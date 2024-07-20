const { body, param } = require("express-validator");

const validateIdInParam = [param("id", "id is invalid").isMongoId()];

const validateUserData = [
  body("username", "username must not be empty").notEmpty(),
  body("preferredLocation", "must not be empty").notEmpty(),
  body("interests", "interests must not be empty").notEmpty(),
];

module.exports = {
  validateIdInParam,
  validateUserData,
};
