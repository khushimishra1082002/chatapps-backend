const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/db");

const Message = sequelize.define(
  "Message",
  {
    message_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    conversation_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    sender_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    message_text: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    is_deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    status: {
      type: DataTypes.ENUM("sent", "delivered", "seen"),
      defaultValue: "sent",
    },

    sent_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = Message;
