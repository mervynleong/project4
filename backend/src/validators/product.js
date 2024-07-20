const { body, param } = require("express-validator");

const validateIdInParam = [param("id", "id is invalid").isMongoId()];

const validateProductData = [
  body("itemName", "item Name must not be empty").notEmpty(),
  body("description", "description must not be empty").notEmpty(),
  body(
    "condition",
    "condition must be one of the following: new, used, like new, mint"
  ).notEmpty(),
  body("category", "category must not be empty").notEmpty(),
];

module.exports = {
  validateIdInParam,
  validateProductData,
};
