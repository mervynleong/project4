const { body, param } = require("express-validator");

const validateIdInParam = [
  param("item_uuid", "item_uuid is invalid").notEmpty().isUUID(),
];

const validateProductData = [
  body("sell_price", "sell_price must not be empty and must be numeric")
    .notEmpty()
    .isNumeric(),
  body("description", "description must not be empty").notEmpty().isString(),
  body("item_name", "item_name must be within 20 characters")
    .notEmpty()
    .isString()
    .isLength({ min: 1, max: 20 }),
  body("status", "status must not be empty. It must be AVAILABLE")
    .notEmpty()
    .isString(),
];

const validateBuyProduct = [
  body("buy_price", "buy price must be numeric and not empty")
    .notEmpty()
    .isNumeric(),
];

module.exports = {
  validateIdInParam,
  validateProductData,
  validateBuyProduct,
};
