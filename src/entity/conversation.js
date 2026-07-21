const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/db");

const Conversation = sequelize.define(
  "Conversation",
  {
    conversation_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    isGroup: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    avatar: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    lastMessageId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    lastMessageAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    groupName: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    groupImage: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = Conversation;
