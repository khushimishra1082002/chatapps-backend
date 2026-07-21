const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/db");

const Attachment = sequelize.define(
  "Attachment",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    messageId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    conversationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    senderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    fileName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    originalName: {
      type: DataTypes.STRING,
    },

    fileType: {
      type: DataTypes.ENUM("image", "video", "document", "audio"),
      allowNull: false,
    },

    mimeType: {
      type: DataTypes.STRING,
    },

    fileSize: {
      type: DataTypes.INTEGER,
    },

    fileUrl: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = Attachment;
