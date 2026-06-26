import { useState, useEffect } from "react";

export default function useFlappyBird() {
  const BIRD_SIZE = 30;
  const PIPE_WIDTH = 60;
  const PIPE_GAP = 150;
  const GRAVITY = 0.6;
  const JUMP_STRENGTH = -12;
  const GAME_WIDTH = 400;
  const GAME_HEIGHT = 600;

  const [birdY, setBirdY] = useState(GAME_HEIGHT / 2);
  const [birdVelocity, setBirdVelocity] = useState(0);
  const [pipes, setPipes] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [pipeCounter, setPipeCounter] = useState(0);

  // Spawn pipes
  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const pipeInterval = setInterval(() => {
      const gapY = Math.random() * (GAME_HEIGHT - PIPE_GAP - 100) + 50;
      setPipes((prev) => [
        ...prev,
        {
          id: Date.now(),
          x: GAME_WIDTH,
          gapY,
          scored: false,
        },
      ]);
    }, 2500);

    return () => clearInterval(pipeInterval);
  }, [gameStarted, gameOver]);

  // Game loop
  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const gameLoop = setInterval(() => {
      // Apply gravity
      setBirdY((prev) => {
        const newY = prev + birdVelocity;
        setBirdVelocity((v) => v + GRAVITY);

        // Check bounds
        if (newY + BIRD_SIZE > GAME_HEIGHT || newY < 0) {
          setGameOver(true);
          return prev;
        }

        return newY;
      });

      // Move pipes
      setPipes((prev) => {
        const updated = prev
          .map((pipe) => ({
            ...pipe,
            x: pipe.x - 8,
          }))
          .filter((pipe) => pipe.x > -PIPE_WIDTH);

        // Check collision and scoring
        updated.forEach((pipe) => {
          // Scoring
          if (!pipe.scored && pipe.x < GAME_WIDTH / 2 - BIRD_SIZE / 2) {
            pipe.scored = true;
            setScore((s) => s + 1);
          }

          // Collision detection
          const birdLeft = GAME_WIDTH / 2 - BIRD_SIZE / 2;
          const birdRight = GAME_WIDTH / 2 + BIRD_SIZE / 2;
          const birdTop = birdY;
          const birdBottom = birdY + BIRD_SIZE;

          const pipeLeft = pipe.x;
          const pipeRight = pipe.x + PIPE_WIDTH;
          const gapTop = pipe.gapY;
          const gapBottom = pipe.gapY + PIPE_GAP;

          if (
            birdRight > pipeLeft &&
            birdLeft < pipeRight &&
            (birdTop < gapTop || birdBottom > gapBottom)
          ) {
            setGameOver(true);
          }
        });

        return updated;
      });
    }, 30);

    return () => clearInterval(gameLoop);
  }, [gameStarted, gameOver, birdVelocity]);

  const handleJump = () => {
    if (!gameStarted) {
      setGameStarted(true);
      setBirdY(GAME_HEIGHT / 2);
      setBirdVelocity(JUMP_STRENGTH);
      setPipes([]);
      setScore(0);
      setGameOver(false);
    } else if (!gameOver) {
      setBirdVelocity(JUMP_STRENGTH);
    }
  };

  const restartGame = () => {
    setGameStarted(false);
    setBirdY(GAME_HEIGHT / 2);
    setBirdVelocity(0);
    setPipes([]);
    setScore(0);
    setGameOver(false);
  };

  return {
    birdY,
    pipes,
    score,
    gameOver,
    gameStarted,
    handleJump,
    restartGame,
    GAME_WIDTH,
    GAME_HEIGHT,
    BIRD_SIZE,
    PIPE_WIDTH,
    PIPE_GAP,
  };
}
