import { useEffect, useState } from "react";
import { getLeaderboard } from "../api/scoreApi";

function Leaderboard() {

  const [scores, setScores] = useState([]);

  useEffect(() => {

    loadScores();

  }, []);

  const loadScores = async () => {

    try {

      const res = await getLeaderboard();

      setScores(res.data.leaderboard);

    } catch (err) {

      console.log(err);

    }

  };

  return (

    <div
      style={{
        minHeight: "100vh",
        background: "#07111F",
        color: "white",
        padding: "50px",
      }}
    >

      <h1>🏆 Snake Leaderboard</h1>

      <table
        style={{
          width: "100%",
          marginTop: "30px",
        }}
      >

        <thead>

          <tr>

            <th>Rank</th>

            <th>Player</th>

            <th>Score</th>

          </tr>

        </thead>

        <tbody>

          {scores.map((player, index) => (

            <tr key={player._id}>

              <td>{index + 1}</td>

              <td>{player.username}</td>

              <td>{player.score}</td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );
}

export default Leaderboard;