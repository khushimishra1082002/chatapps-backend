const { uploadAttachmentService } = require("../attachment/attachment.service");
const { sendResponse } = require("../../middlewares/response/sendResponse");
const getFileType = require("../../utils/helper")

const uploadAttachment = async (req, res, next) => {
  try {
    const { senderId, conversationId, messageId } = req.body;
    const file = req.file;

    if (!file) {
      return next(new Error("File is Required"));
    }

    const result = await uploadAttachmentService({
      senderId,
      conversationId,
      messageId,
      fileName: file.filename,
      originalName: file.originalname,
      fileType: getFileType(file.mimetype),
      mimeType: file.mimetype,
      fileSize: file.size,
      fileUrl: `uploads/${file.filename}`,
    });

    return sendResponse(
      res,
      200,
      "Attachment Uploaded Successfully",
      result
    );
  } catch (err) {
    next(err);
  }
};

module.exports = uploadAttachment;
