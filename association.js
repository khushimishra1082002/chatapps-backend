const Conversation = require("./src/entity/conversation");
const ConversationMember = require("./src/entity/conversation_member");
const Message = require("./src/entity/message");
const User = require("./src/entity/user");
const Attachment = require("./src/entity/attachment")

Conversation.hasMany(ConversationMember, {
  foreignKey: "conversation_id",
});

ConversationMember.belongsTo(Conversation, {
  foreignKey: "conversation_id",
});

Conversation.hasMany(Message, {
  foreignKey: "conversation_id",
});

Message.belongsTo(Conversation, {
  foreignKey: "conversation_id",
});

Conversation.belongsTo(Message, {
  foreignKey: "lastMessageId",
  as: "lastMessage",
});

ConversationMember.belongsTo(User, {
  foreignKey: "user_id",
  targetKey: "user_id",
});

User.hasMany(ConversationMember, {
  foreignKey: "user_id",
  sourceKey: "user_id",
});

Message.hasMany(Attachment, {
  foreignKey: "messageId",
  as: "attachments",
});

Attachment.belongsTo(Message, {
  foreignKey: "messageId",
  as: "message",
});