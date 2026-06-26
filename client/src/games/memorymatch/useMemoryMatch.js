import { useState, useEffect } from "react";

export default function useMemoryMatch() {
  const symbols = ["🍎", "🍌", "🍒", "🍓", "🍊", "🍋", "🍉", "🍇"];
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const shuffled = [...symbols, ...symbols]
      .sort(() => Math.random() - 0.5)
      .map((symbol, index) => ({ id: index, symbol }));
    setCards(shuffled);
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setScore(0);
    setGameOver(false);
  };

  useEffect(() => {
    if (flipped.length === 2) {
      const [first, second] = flipped;

      if (cards[first]?.symbol === cards[second]?.symbol) {
        setMatched((prev) => [...prev, first, second]);
        setScore((prev) => prev + 10);
        setFlipped([]);
      } else {
        setTimeout(() => {
          setFlipped([]);
        }, 1000);
      }

      setMoves((prev) => prev + 1);
    }
  }, [flipped, cards]);

  useEffect(() => {
    if (matched.length === cards.length && cards.length > 0) {
      setGameOver(true);
    }
  }, [matched, cards]);

  const handleClick = (index) => {
    if (
      flipped.includes(index) ||
      matched.includes(index) ||
      flipped.length === 2
    ) {
      return;
    }

    setFlipped([...flipped, index]);
  };

  const restartGame = () => {
    initializeGame();
  };

  return {
    cards,
    flipped,
    matched,
    moves,
    score,
    gameOver,
    handleClick,
    restartGame,
  };
}
