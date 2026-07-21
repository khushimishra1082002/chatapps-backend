const express = require("express");
const router = express.Router();
const { getProfile, updateProfile } = require("../profile/profile.controller");
const { singleFile } = require("../../middlewares/upload");

router.get("/me/:id", getProfile);
router.put("/:id", singleFile, updateProfile);

module.exports = router;
