const express = require("express");
const router = express.Router();
const { getAllUsers, searchUsers } = require("../user/user.controller");

router.get("/", getAllUsers);
router.get("/search",searchUsers)

module.exports = router;
