const {
  markReadService,
} = require("../modules/conversation/conversation.service");

module.exports = (socket, io) => {
  socket.on("join_room", (conversationId) => {
    socket.join(String(conversationId));
    console.log(`Joined Room: ${conversationId}`);
  });

  socket.on("leave_room", (conversationId) => {
    socket.leave(String(conversationId));
  });

  socket.on("send_message", (message) => {
    const roomId = String(message.conversation_id);

    io.to(roomId).emit("receive_message", message);

    io.emit("new_conversation", message);
  });

  socket.on("messages_read", async ({ conversationId, userId }) => {
    try {
      await markReadService(conversationId, userId);

      io.to(String(conversationId)).emit("messages_read", {
        conversationId,
        userId,
      });
    } catch (err) {
      console.log("messages_read error:", err);
    }
  });
};
