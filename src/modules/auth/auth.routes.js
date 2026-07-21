const express = require("express");
const router = express.Router();
const {
  signup,
  login,
  sendOtp,
  verifyOtp,
} = require("../auth/auth.controller");
const validate = require("../../middlewares/validate");
const {
  loginSchema,
  signupSchema,
} = require("../../modules/auth/auth.validation");
const { singleFile } = require("../../middlewares/upload");

router.post("/signup", validate(signupSchema) , singleFile, signup);
router.post("/login", validate(loginSchema), login);
router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);

module.exports = router;
