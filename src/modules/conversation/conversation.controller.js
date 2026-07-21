const {
  createDirectConversationService,
  createGroupConversationService,
  getConversationService,
  getConversationGroupMembersService,
  markReadService,
} = require("./conversation.service");
const { sendResponse } = require("../../middlewares/response/sendResponse");
const { Op } = require("sequelize");

const createDirectConversation = async (req, res, next) => {
  const currentUserId = req.user.id;
  const otherUserId = req.body.userId;

  console.log("IDs:", currentUserId, otherUserId);

  try {
    const conversation = await createDirectConversationService(
      currentUserId,
      otherUserId,
    );

    sendResponse(res, 200, "Conversation successfully", conversation);
  } catch (err) {
    next(err);
  }
};

const createGroupConversation = async (req, res, next) => {
  const currentUserId = req.user.id;

  const groupName = req.body.groupName;
  const memberIds = JSON.parse(req.body.memberIds);

  const groupImage = req.file ? req.file.filename : null;

  console.log(memberIds); 
  console.log(typeof memberIds); 
  console.log(Array.isArray(memberIds)); 

  try {
    const conversation = await createGroupConversationService(
      currentUserId,
      groupName,
      memberIds,
      groupImage,
    );

    sendResponse(res, 200, "Group created successfully", conversation);
  } catch (err) {
    next(err);
  }
};

const getConversations = async (req, res, next) => {
  const currentUserId = req.user.id;
  try {
    const conversations = await getConversationService(currentUserId);
    sendResponse(
      res,
      200,
      "Conversations fetched suuccessfully",
      conversations,
    );
  } catch (err) {
    next(err);
  }
};

const getConversationGroupMembers = async (req, res, next) => {
  try {
    const data = await getConversationGroupMembersService(req.params.id);
    sendResponse(res, 200, "Group Conversation fetched", data);
  } catch (err) {
    next(err);
  }
};

const markRead = async (req, res, next) => {
  const { conversation_id } = req.params;
  const user_id = req.user.id;

  try {
    const data = await markReadService(conversation_id, user_id);
    sendResponse(res, 200, "mark read", data);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createDirectConversation,
  createGroupConversation,
  getConversations,
  getConversationGroupMembers,
  markRead,
};
