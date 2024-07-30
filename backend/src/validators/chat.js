const { body, param } = require("express-validator");

const validateChatData = [
  body("text_content", "cannot send empty text")
    .notEmpty()
    .isString()
    .isLength({ min: 1, max: 250 }),
];

const validateItemUUID = [
  param("item_uuid", "item_uuid is invalid").notEmpty().isUUID(),
];

const validateChatUUID = [
  param("chat_table_id", "chat_table_id is invalid").notEmpty().isUUID(),
];

module.exports = { validateChatData, validateItemUUID, validateChatUUID };
