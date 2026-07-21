const User = require("../../entity/user");
const { Op } = require("sequelize");

const getAllUsersService = async () => {
  const users = await User.findAll();
  return users;
};

const searchUsersService = async (query) => {
  console.log("query", query);

  const users = await User.findAll({
    where: {
      name: {
        [Op.like]: `%${query}%`,
      },
    },
  });

  console.log("users", users);

  return users;
};

module.exports = { getAllUsersService, searchUsersService };
