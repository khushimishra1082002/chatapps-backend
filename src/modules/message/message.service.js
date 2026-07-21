const Message = require("../../entity/message");
const Conversation = require("../../entity/conversation");
const Attachment = require("../../entity/attachment");

const sendMessageService = async (conversationId, senderId, message) => {
  const newMessage = await Message.create({
    conversation_id: conversationId,
    sender_id: senderId,
    message_text: message,
    status: "sent",
  });

  await Conversation.update(
    {
      lastMessageId: newMessage.message_id,
      lastMessageAt: new Date(),
    },
    {
      where: {
        conversation_id: conversationId,
      },
    },
  );

  return newMessage;
};

const getMessagesService = async (conversationId) => {
  const messages = await Message.findAll({
    where: { conversation_id: conversationId },

    include: [
      {
        model: Attachment,
        as: "attachments",
      },
    ],

    order: [["createdAt", "ASC"]],
  });

  return messages;
};

module.exports = {
  sendMessageService,
  getMessagesService,
};
