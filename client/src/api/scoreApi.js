import API from "./api";

export const saveScore = async (userId, username, score, game = "Snake") => {
  return await API.post("/score", {
    user: userId,
    username,
    score,
    game,
  });
};

export const getLeaderboard = async () => {
  return await API.get("/score/leaderboard");
};