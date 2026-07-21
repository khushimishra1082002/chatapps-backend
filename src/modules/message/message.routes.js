const express = require("express");
const router = express.Router();
const { sendMessage ,getMessages } = require("../message/message.controller");
const authenticate = require("../../middlewares/auth");

router.post("/", authenticate, sendMessage);
router.get(
  "/:conversationId",
  authenticate,
  getMessages
);

module.exports = router;
