import "../styles/categories.css";

function Categories() {

    const categories = [
        "🎮 Action",
        "🏎️ Racing",
        "⚽ Sports",
        "🔫 FPS",
        "👑 RPG",
        "🧩 Puzzle"
    ];

    return (

        <section className="categories">

            <h2>Game Categories</h2>

            <div className="category-grid">

                {categories.map((item,index)=>(
                    <div className="category-card" key={index}>
                        {item}
                    </div>
                ))}

            </div>

        </section>

    );

}

export default Categories;