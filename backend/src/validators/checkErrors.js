const { validateResult } = require("express-validator");

const checkErrors = (req, res, next) => {
  const errors = validateResult(req);

  if (!errors.isEmpty()) {
    res.status(400).json({ status: "error", msg: errors.array() });
  } else {
    next();
  }
};

module.exports = { checkErrors };
