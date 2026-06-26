import { useEffect, useState } from "react";
import { saveScore } from "../../api/scoreApi";
import { updateRewards } from "../../api/userApi";

const ROWS = 20;
const COLS = 20;

const INITIAL_SNAKE = [
  { x: 10, y: 8 },
  { x: 10, y: 9 },
  { x: 10, y: 10 },
];

export default function useSnake() {
  const [snake, setSnake] = useState(INITIAL_SNAKE);

  const [food, setFood] = useState({
    x: 5,
    y: 5,
  });

  const [direction, setDirection] = useState("RIGHT");

  const [score, setScore] = useState(0);

  const [gameOver, setGameOver] = useState(false);

  const [speed, setSpeed] = useState(180);

  // Generate Random Food
  const generateFood = (snakeBody) => {
    while (true) {
      const x = Math.floor(Math.random() * ROWS);
      const y = Math.floor(Math.random() * COLS);

      const exists = snakeBody.some(
        (cell) => cell.x === x && cell.y === y
      );

      if (!exists) return { x, y };
    }
  };

  // Keyboard Controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case "ArrowUp":
          if (direction !== "DOWN") setDirection("UP");
          break;

        case "ArrowDown":
          if (direction !== "UP") setDirection("DOWN");
          break;

        case "ArrowLeft":
          if (direction !== "RIGHT") setDirection("LEFT");
          break;

        case "ArrowRight":
          if (direction !== "LEFT") setDirection("RIGHT");
          break;

        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () =>
      window.removeEventListener("keydown", handleKeyDown);
  }, [direction]);

  // Game Loop
  useEffect(() => {
    if (gameOver) return;

    const timer = setInterval(() => {
      moveSnake();
    }, speed);

    return () => clearInterval(timer);
  }, [gameOver, speed, direction]);

  const moveSnake = () => {
    setSnake((prevSnake) => {
      const newSnake = [...prevSnake];

      const head = {
        ...newSnake[newSnake.length - 1],
      };

      switch (direction) {
        case "UP":
          head.x--;
          break;

        case "DOWN":
          head.x++;
          break;

        case "LEFT":
          head.y--;
          break;

        case "RIGHT":
          head.y++;
          break;

        default:
          break;
      }

      // Wrap Around
      if (head.x < 0) head.x = ROWS - 1;
      if (head.x >= ROWS) head.x = 0;

      if (head.y < 0) head.y = COLS - 1;
      if (head.y >= COLS) head.y = 0;

      // Self Collision
      if (
        newSnake.some(
          (cell) => cell.x === head.x && cell.y === head.y
        )
      ) {

        setGameOver(true);

        const user = JSON.parse(localStorage.getItem("user"));

        if (user) {

          Promise.all([
            saveScore(user._id, user.username, score),
            updateRewards(user._id, score),
          ]).catch(console.error);

        }

        return prevSnake;
      }

      // Food
      if (head.x === food.x && head.y === food.y) {
        newSnake.push(head);

        const newScore = score + 10;

        setScore(newScore);

        if (newScore % 50 === 0 && speed > 70) {
          setSpeed((s) => s - 10);
        }

        setFood(generateFood(newSnake));
      } else {
        newSnake.push(head);
        newSnake.shift();
      }

      return newSnake;
    });
  };

  const restartGame = () => {
    setSnake(INITIAL_SNAKE);
    setFood(generateFood(INITIAL_SNAKE));
    setDirection("RIGHT");
    setScore(0);
    setSpeed(180);
    setGameOver(false);
  };

  return {
    snake,
    food,
    score,
    gameOver,
    restartGame,
    rows: ROWS,
    cols: COLS,
  };
}