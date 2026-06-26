import "../styles/leaderboard.css";

function Leaderboard() {

    const players = [

        {
            rank: "🥇",
            name: "Alex",
            score: "9500 XP"
        },

        {
            rank: "🥈",
            name: "Gopi",
            score: "8900 XP"
        },

        {
            rank: "🥉",
            name: "John",
            score: "8400 XP"
        },

        {
            rank: "4️⃣",
            name: "Emily",
            score: "7900 XP"
        }

    ];

    return (

        <section className="leaderboard">

            <h2>Top Players</h2>

            <div className="leaderboard-container">

                {players.map((player,index)=>(

                    <div className="player-card" key={index}>

                        <h1>{player.rank}</h1>

                        <h3>{player.name}</h3>

                        <p>{player.score}</p>

                    </div>

                ))}

            </div>

        </section>

    );

}

export default Leaderboard;