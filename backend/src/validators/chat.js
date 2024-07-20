const { body } = require("express-validator");

const validateChatData = [
  body("chat", "cannot send empty text")
    .notEmpty()
    .isString()
    .isLength({ min: 1, max: 250 }),
];

module.exports = { validateChatData };
