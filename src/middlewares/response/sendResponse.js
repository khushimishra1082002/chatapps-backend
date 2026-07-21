const message = require("./message");

const sendResponse = (res, statusCode, msg, data) => {
  try {
    const messagedata = message[statusCode] || {
      message: "Unknown Status",
      httpCode: statusCode || 400,
      status: false,
    };

    const result = {
      success: messagedata.status,
      message: msg || messagedata.message,
      data: data || null,
    };

    return res.status(messagedata.httpCode).json(result);
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
      data: null,
    });
  }
};

module.exports = { sendResponse };
