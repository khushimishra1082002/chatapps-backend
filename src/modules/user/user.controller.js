const {
  getAllUsersService,
  searchUsersService,
} = require("../user/user.service");
const { sendResponse } = require("../../middlewares/response/sendResponse");

const getAllUsers = async (req, res, next) => {
  try {
    const users = await getAllUsersService();
    sendResponse(res, 200, "Users fetched suuccessfully", users);
  } catch (err) {
    next(err);
  }
};

const searchUsers = async (req, res, next) => {
  const { query } = req.query;

  console.log("query", query);

  try {
    const users = await searchUsersService(query);
    sendResponse(res, 200, "users fetched by search", users);
  } catch (err) {
    next(err);
  }
};

module.exports = { getAllUsers, searchUsers };
