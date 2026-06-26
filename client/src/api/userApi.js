import API from "./api";

export const updateRewards = async (userId, score) => {
  return await API.post("/user/reward", {
    userId,
    score,
  });
};
