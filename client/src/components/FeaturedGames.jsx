import "../styles/games.css";

function FeaturedGames() {

    const games = [
        {
            name: "GTA VI",
            rating: "⭐ 4.9",
            image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600"
        },
        {
            name: "Valorant",
            rating: "⭐ 4.8",
            image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600"
        },
        {
            name: "Minecraft",
            rating: "⭐ 4.7",
            image: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=600"
        }
    ];

    return (

        <section className="games">

            <h2>Featured Games</h2>

            <div className="game-container">

                {games.map((game,index)=>(
                    <div className="card" key={index}>

                        <img src={game.image} alt={game.name}/>

                        <h3>{game.name}</h3>

                        <p>{game.rating}</p>

                        <button>Play Now</button>

                    </div>
                ))}

            </div>

        </section>

    );
}

export default FeaturedGames;