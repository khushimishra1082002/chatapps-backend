const { sendResponse } = require("../middlewares/response/sendResponse");

const errorHandler = (err, req, res, next) => {
  console.error(err);

  return sendResponse(
    res,err.statusCode || 400,
    err.message || "Internal Server Error",
    err
  );
};

module.exports = errorHandler;