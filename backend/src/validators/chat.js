const { body, param } = require("express-validator");

const validateChatData = [
  body("text_content", "cannot send empty text")
    .notEmpty()
    .isString()
    .isLength({ min: 1, max: 250 }),
];

const validateChatId = [param("item_uuid", "item_uuid is invalid").notEmpty()];

module.exports = { validateChatData, validateChatId };
