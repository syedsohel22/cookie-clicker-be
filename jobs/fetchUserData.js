import User from "../models/userModel.js";

export const fetchUserData = async (id) => {
  try {
    return await User.findById(id);
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
};
