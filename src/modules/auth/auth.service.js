const User = require("../../entity/user");
const OTP = require("../../entity/otp");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const signupService = async (data, file) => {
  const { name, email, password, phoneNo } = data;

  const existingUser = await User.findOne({
    where: { email },
  });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
    image: file ? file.filename : null,
    phoneNo,
  });

  return user;
};

const loginService = async (email, password) => {
  const user = await User.findOne({
    where: { email: email },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid password");
  }

  const token = jwt.sign(
    { id: user.user_id, name: user.name },
    process.env.JWT_SECRET,
    { expiresIn: process.env.EXPIRES_IN || "1h" },
  );

  return {
    token,
    user,
  };
};

const sendOtpService = async (phoneNo) => {
  if (!phoneNo) {
    throw new Error("Phone number is required");
  }
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  await OTP.create({
    phoneNo,
    otp,
    expiresAt: new Date(Date.now() + 5 * 60 * 1000), // 5 min expiry
  });

  return otp;
};

const verifyOtpService = async (phoneNo, otp) => {
  if (!phoneNo || !otp) {
    throw new Error("Phone number and OTP are required");
  }

  const record = await OTP.findOne({
    where: {
      phoneNo,
      otp,
      isUsed: false,
    },
    order: [["createdAt", "DESC"]],
  });

  if (!record) {
    throw new Error("Invalid OTP");
  }

  if (new Date() > record.expiresAt) {
    throw new Error("OTP expired");
  }

  await record.update({ isUsed: true });

  const user = await User.findOne({ where: { phoneNo } });

  const token = jwt.sign(
    {
      id: user.user_id,
      name: user.name,
      phoneNo: user.phoneNo,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" },
  );

  return {
    token,
    user,
  };
};

module.exports = {
  signupService,
  loginService,
  sendOtpService,
  verifyOtpService,
};
