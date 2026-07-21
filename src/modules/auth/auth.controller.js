const {
  signupService,
  loginService,
  sendOtpService,
  verifyOtpService,
} = require("../auth/auth.service");
const  {sendResponse} = require("../../middlewares/response/sendResponse");

const signup = async (req, res, next) => {
  console.log("body", req.body);
  console.log("file", req.file);
  try {
    const user = await signupService(req.body, req.file);
    sendResponse(res, 200, "Signup Successful", user);
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await loginService(email, password);
    sendResponse(res, 200, "Login Successful", result);
  } catch (err) {
    next(err);
  }
};

const sendOtp = async (req, res, next) => {
  const { phoneNo } = req.body;

  try {
    const otp = await sendOtpService(phoneNo);

    return sendResponse(res, 200, "OTP sent successfully", {
      phoneNo,
      otp,
    });
  } catch (err) {
    next(err);
  }
};

const verifyOtp = async (req, res, next) => {
  const { phoneNo, otp } = req.body;

  try {
    const result = await verifyOtpService(phoneNo, otp);

    return sendResponse(res, 200, "OTP verified successfully", result);
  } catch (err) {
    next(err);
  }
};

module.exports = { signup, login, sendOtp, verifyOtp };
