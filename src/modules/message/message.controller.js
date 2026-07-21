const { sendResponse } = require("../../middlewares/response/sendResponse");
const { sendMessageService, getMessagesService } = require("./message.service");

const sendMessage = async (req, res, next) => {
  try {
    const { conversationId, message } = req.body;
    const senderId = req.user.id;

    const data = await sendMessageService(conversationId, senderId, message);

    sendResponse(res, 200, "Message sent successfully", data);
  } catch (err) {
    next(err);
  }
};

const getMessages = async (req, res, next) => {
  try {
    const { conversationId } = req.params;

    const messages = await getMessagesService(conversationId);

    sendResponse(res, 200, "Messages fetched successfully", messages);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  sendMessage,
  getMessages,
};
