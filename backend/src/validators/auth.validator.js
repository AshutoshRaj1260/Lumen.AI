const { body, validationResult } = require("express-validator");

const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  return res.status(400).json({
    errors: errors.array(),
  });
};

const registerValidator = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username is required")
    .isString()
    .withMessage("Username should be string")
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage("Username can only contain letters, numbers, and underscores"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email should be valid email address"),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6, max: 15 })
    .withMessage("Password should be between 6 to 15 characters"),

  validate,
];

module.exports = {
  registerValidator,
};
