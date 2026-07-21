const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "public/uploads"),
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({ storage });

const singleFile = upload.single("file");

const multipleFiles = upload.array("files", 10);

module.exports = { singleFile, multipleFiles };
