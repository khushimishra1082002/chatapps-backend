const sendResponse = require("../middlewares/response/sendResponse");

const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      return sendResponse(
        res,
        400,
        error.details[0].message || "Validation Error"
      );
    }

    next();
  };
};

module.exports = validate;