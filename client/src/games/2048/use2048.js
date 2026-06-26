import { useState, useEffect } from "react";

export default function use2048() {
  const SIZE = 4;
  const [tiles, setTiles] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);

  // Initialize game
  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const newTiles = Array(SIZE * SIZE)
      .fill(null)
      .map(() => 0);
    addNewTile(newTiles);
    addNewTile(newTiles);
    setTiles(newTiles);
    setScore(0);
    setGameOver(false);
    setWon(false);
  };

  const addNewTile = (board) => {
    const empty = board
      .map((val, idx) => (val === 0 ? idx : null))
      .filter((val) => val !== null);
    if (empty.length > 0) {
      const randomIdx = empty[Math.floor(Math.random() * empty.length)];
      board[randomIdx] = Math.random() < 0.9 ? 2 : 4;
    }
  };

  const move = (direction) => {
    if (gameOver || won) return;

    let newTiles = tiles.map((t) => t);
    let moved = false;
    let scoreAdded = 0;

    const rotate = (arr) => {
      const newArr = Array(SIZE * SIZE).fill(0);
      for (let i = 0; i < SIZE; i++) {
        for (let j = 0; j < SIZE; j++) {
          newArr[i * SIZE + j] = arr[(SIZE - 1 - j) * SIZE + i];
        }
      }
      return newArr;
    };

    const moveLeft = (row) => {
      const arr = [...row].filter((v) => v !== 0);
      for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] === arr[i + 1]) {
          arr[i] *= 2;
          scoreAdded += arr[i];
          arr.splice(i + 1, 1);
        }
      }
      return [...arr, ...Array(SIZE - arr.length).fill(0)];
    };

    // Apply movement
    if (direction === "left" || direction === "right") {
      for (let i = 0; i < SIZE; i++) {
        const row = newTiles.slice(i * SIZE, (i + 1) * SIZE);
        const newRow =
          direction === "left" ? moveLeft(row) : moveLeft(row).reverse();
        for (let j = 0; j < SIZE; j++) {
          if (newTiles[i * SIZE + j] !== newRow[j]) moved = true;
          newTiles[i * SIZE + j] = newRow[j];
        }
      }
    } else {
      newTiles = rotate(newTiles);
      for (let i = 0; i < SIZE; i++) {
        const row = newTiles.slice(i * SIZE, (i + 1) * SIZE);
        const newRow = moveLeft(row);
        for (let j = 0; j < SIZE; j++) {
          if (newTiles[i * SIZE + j] !== newRow[j]) moved = true;
          newTiles[i * SIZE + j] = newRow[j];
        }
      }
      newTiles = rotate(rotate(rotate(newTiles)));
    }

    if (moved) {
      addNewTile(newTiles);
      setTiles(newTiles);
      setScore(score + scoreAdded);

      if (newTiles.some((v) => v === 2048)) setWon(true);
      if (!newTiles.some((v) => v === 0) && !canMove(newTiles)) setGameOver(true);
    }
  };

  const canMove = (board) => {
    for (let i = 0; i < SIZE * SIZE; i++) {
      if (board[i] === 0) return true;
      const row = Math.floor(i / SIZE);
      const col = i % SIZE;
      const current = board[i];

      if (col < SIZE - 1 && board[i + 1] === current) return true;
      if (row < SIZE - 1 && board[i + SIZE] === current) return true;
    }
    return false;
  };

  const getTileColor = (value) => {
    const colors = {
      0: "#cdc1b4",
      2: "#eee4da",
      4: "#ede0c8",
      8: "#f2b179",
      16: "#f59563",
      32: "#f67c5f",
      64: "#f65e3b",
      128: "#edcf72",
      256: "#edcc61",
      512: "#edc850",
      1024: "#edc53f",
      2048: "#edc22e",
    };
    return colors[value] || "#3c3c2f";
  };

  return {
    tiles,
    score,
    gameOver,
    won,
    move,
    initializeGame,
    getTileColor,
    SIZE,
  };
}
