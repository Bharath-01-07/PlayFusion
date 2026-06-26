function Dashboard() {

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div style={{
      color: "white",
      padding: "50px",
      background: "#0B1220",
      minHeight: "100vh"
    }}>

      <h1>🎮 Welcome {user?.username}</h1>

      <h2>Level 1 Gamer</h2>

      <h3>Coins: {user?.coins}</h3>

      <h3>XP: {user?.xp}</h3>

    </div>
  );
}

export default Dashboard;