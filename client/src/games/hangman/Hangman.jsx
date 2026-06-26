import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Hangman.css";
import { saveScore } from "../../api/scoreApi";
import { updateRewards } from "../../api/userApi";

function Hangman() {
  const navigate = useNavigate();
  const words = [
    "JAVASCRIPT",
    "PROGRAMMING",
    "PLAYFUSION",
    "HANGMAN",
    "DEVELOPER",
    "COMPUTER",
    "INTERNET",
    "DATABASE",
  ];
  const [word, setWord] = useState(words[Math.floor(Math.random() * words.length)]);
  const [guessed, setGuessed] = useState([]);
  const [wrong, setWrong] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  const handleGuess = (letter) => {
    if (guessed.includes(letter) || gameOver) return;
    const newGuessed = [...guessed, letter];
    setGuessed(newGuessed);

    if (!word.includes(letter)) {
      const newWrong = wrong + 1;
      setWrong(newWrong);
      if (newWrong >= 6) {
        setGameOver(true);
      }
    }

    if (word.split("").every((l) => newGuessed.includes(l))) {
      setWon(true);
      setGameOver(true);
      if (user) {
        Promise.all([
          saveScore(user._id, user.username, 100 - wrong * 10, "Hangman"),
          updateRewards(user._id, 100 - wrong * 10),
        ]);
      }
    }
  };

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  return (
    <div className="hangman-container">
      <h1>🎭 Hangman</h1>
      <p>Wrong Guesses: {wrong}/6</p>
      <div className="hangman-drawing">
        {wrong >= 1 && <div className="head"></div>}
        {wrong >= 2 && <div className="body"></div>}
        {wrong >= 3 && <div className="left-arm"></div>}
        {wrong >= 4 && <div className="right-arm"></div>}
        {wrong >= 5 && <div className="left-leg"></div>}
        {wrong >= 6 && <div className="right-leg"></div>}
      </div>
      <div className="word-display">
        {word.split("").map((letter, idx) => (
          <span key={idx} className="letter">
            {guessed.includes(letter) ? letter : "_"}
          </span>
        ))}
      </div>
      <div className="alphabet-buttons">
        {alphabet.map((letter) => (
          <button
            key={letter}
            onClick={() => handleGuess(letter)}
            disabled={guessed.includes(letter) || gameOver}
            className={guessed.includes(letter) ? "used" : ""}
          >
            {letter}
          </button>
        ))}
      </div>
      {gameOver && (
        <div className="game-over">
          <h2>{won ? "You Won! 🎉" : "Game Over! 😢"}</h2>
          <p>Word was: {word}</p>
          <button onClick={() => navigate("/games")}>Back to Games</button>
        </div>
      )}
    </div>
  );
}

export default Hangman;
