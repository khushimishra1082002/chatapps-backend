const Conversation = require("../../entity/conversation");
const ConversationMember = require("../../entity/conversation_member");
const User = require("../../entity/user");
const Message = require("../../entity/message");
const { Op } = require("sequelize");

const createDirectConversationService = async (currentUserId, otherUserId) => {
  const conversations = await Conversation.findAll({
    where: { isGroup: false },
    include: [
      {
        model: ConversationMember,
      },
    ],
  });

  const existing = conversations.find((conv) => {
    const members = conv.ConversationMembers.map((m) => m.user_id);
    return (
      members.includes(currentUserId) &&
      members.includes(otherUserId) &&
      members.length === 2
    );
  });

  if (existing) return existing;

  const conversation = await Conversation.create({
    isGroup: false,
    createdBy: currentUserId,
  });

  await ConversationMember.bulkCreate([
    { conversation_id: conversation.conversation_id, user_id: currentUserId },
    { conversation_id: conversation.conversation_id, user_id: otherUserId },
  ]);

  return conversation;
};

const createGroupConversationService = async (
  currentUserId,
  groupName,
  memberIds,
  groupImage,
) => {
  const conversation = await Conversation.create({
    isGroup: true,
    groupName: groupName,
    groupImage,
    createdBy: currentUserId,
  });

  const members = [
    {
      conversation_id: conversation.conversation_id,
      user_id: currentUserId,
      role: "admin",
    },
  ];

  memberIds.forEach((id) => {
    members.push({
      conversation_id: conversation.conversation_id,
      user_id: id,
      role: "member",
    });
  });

  await ConversationMember.bulkCreate(members);

  return conversation;
};

const getConversationService = async (currentUserId) => {
  const memberChats = await ConversationMember.findAll({
    where: { user_id: currentUserId },
    attributes: ["conversation_id"],
  });

  const chatIds = memberChats.map((c) => c.conversation_id);

  const conversations = await Conversation.findAll({
    where: { conversation_id: chatIds },
    include: [
      {
        model: ConversationMember,
        include: [
          {
            model: User,
            attributes: ["user_id", "name", "image"],
          },
        ],
      },
      {
        model: Message,
        as: "lastMessage",
      },
    ],
    order: [["lastMessageAt", "DESC"]],
  });

  return Promise.all(
    conversations.map(async (conv) => {
      const myMember = conv.ConversationMembers.find(
        (m) => m.user_id === currentUserId,
      );

      const unread = await Message.count({
        where: {
          conversation_id: conv.conversation_id,
          sender_id: { [Op.ne]: currentUserId },
          message_id: {
            [Op.gt]: myMember?.last_read_message_id || 0,
          },
        },
      });

      return {
        ...conv.toJSON(),
        unread_count: unread,
      };
    }),
  );
};

const getConversationGroupMembersService = async (id) => {
  const conversation = await Conversation.findByPk(id, {
    include: [
      {
        model: ConversationMember,
        include: ["User"],
      },
    ],
  });

  return conversation;
};

const markReadService = async (conversation_id, user_id) => {
  const lastMessage = await Message.findOne({
    where: { conversation_id },
    order: [["message_id", "DESC"]],
  });

  if (!lastMessage) return null;

  await ConversationMember.update(
    {
      last_read_message_id: lastMessage.message_id,
    },
    {
      where: {
        conversation_id,
        user_id,
      },
    },
  );

  return {
    conversation_id,
    last_read_message_id: lastMessage.message_id,
  };
};

module.exports = {
  createDirectConversationService,
  createGroupConversationService,
  getConversationService,
  getConversationGroupMembersService,
  markReadService,
};
