import "../styles/statistics.css";

function Statistics() {

    const stats = [
        {
            number: "100K+",
            title: "Players"
        },
        {
            number: "350+",
            title: "Games"
        },
        {
            number: "500+",
            title: "Tournaments"
        },
        {
            number: "24/7",
            title: "Online"
        }
    ];

    return (

        <section className="statistics">

            <h2>PlayFusion Statistics</h2>

            <div className="stats-grid">

                {stats.map((item,index)=>(
                    <div className="stat-card" key={index}>
                        <h1>{item.number}</h1>
                        <p>{item.title}</p>
                    </div>
                ))}

            </div>

        </section>

    );

}

export default Statistics;