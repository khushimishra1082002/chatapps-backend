const Attachment = require("../../entity/attachment");

const uploadAttachmentService = async (data) => {
  const attachment = await Attachment.create(data);
  return attachment;
};

module.exports = { uploadAttachmentService };
