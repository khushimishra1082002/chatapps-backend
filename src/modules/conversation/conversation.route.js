const express = require("express");
const router = express.Router();
const {
  createDirectConversation,
  createGroupConversation,
  getConversations,
  getConversationGroupMembers,
  markRead,
} = require("./conversation.controller");
const authenticate = require("../../middlewares/auth");
const { singleFile } = require("../../middlewares/upload");

router.get("/", authenticate, getConversations);
router.post("/direct", authenticate, createDirectConversation);
router.post("/group", authenticate, singleFile, createGroupConversation);
router.get("/:id/groupMember", getConversationGroupMembers);
router.post("/:conversation_id", authenticate, markRead);

module.exports = router;
