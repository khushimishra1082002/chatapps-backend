const User = require("../../entity/user");

const getProfileService = async (id) => {
  const profileData = await User.findOne({
    where: {
      user_id: id,
    },
  });

  return profileData;
};

const updateProfileService = async (id, data, file) => {
  if (file) {
    data.image = file.filename;
  }

  await User.update(data, {
    where: {
      user_id: id,
    },
  });

  const updatedUser = await User.findOne({
    where: {
      user_id: id,
    },
  });

  return updatedUser;
};

module.exports = { getProfileService, updateProfileService };
