const jwt = require("jsonwebtoken");
const {sendResponse} = require("../middlewares/response/sendResponse");

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return sendResponse(res, 401, "Unauthorized");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded; 
    next();

  } catch (err) {
    return sendResponse(res, 403, "Invalid or expired token");
  }
};

module.exports = authenticate;