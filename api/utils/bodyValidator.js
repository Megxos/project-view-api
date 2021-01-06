const { validationResult } = require("express-validator");

module.exports = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) return next();

  let extractedErrors = [];

  errors.array().map((error) => {
    extractedErrors.push(`${error.msg}: ${error.param} in ${error.location}`);
  });

  return res.status(400).json({
    success: false,
    message: "Bad request",
    error: {
      statusCode: 400,
      description: "Bad request",
      errors: extractedErrors,
    },
  });
};
