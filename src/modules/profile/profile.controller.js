const {
  getProfileService,
  updateProfileService,
} = require("../profile/profile.service");
const { sendResponse } = require("../../middlewares/response/sendResponse");

const getProfile = async (req, res, next) => {
  const { id } = req.params;
  try {
    const profile = await getProfileService(id);
    sendResponse(res, 200, "Profile get successfully", profile);
  } catch (err) {
    next(err);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const { id } = req.params;

    const data = req.body;
    const file = req.file;

    const updateProfileData = await updateProfileService(
      id,
      data,
      file
    );

    sendResponse(
      res,
      200,
      "Profile Updated Successfully",
      updateProfileData
    );

  } catch (err) {
    next(err);
  }
};

module.exports = { getProfile, updateProfile };
