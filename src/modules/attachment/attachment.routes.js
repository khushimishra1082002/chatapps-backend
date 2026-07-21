const express = require("express");
const router = express.Router();
const uploadAttachment = require("../attachment/attachment.controller");
const { singleFile } = require("../../middlewares/upload");

router.post("/upload", singleFile, uploadAttachment);

module.exports = router;
