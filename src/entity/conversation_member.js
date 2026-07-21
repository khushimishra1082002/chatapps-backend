const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/db");

const ConversationMember = sequelize.define(
  "ConversationMember",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    conversation_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },

    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },

    role: {
      type: DataTypes.ENUM("admin", "member"),
      defaultValue: "member",
    },

    joined_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },

    last_read_message_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = ConversationMember;
