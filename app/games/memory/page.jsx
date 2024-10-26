"use client";

import React, { useState, useEffect } from 'react';

// Card data
const cardImages = [
  { id: 1, src: '/images/apple.png' },
  { id: 2, src: '/images/banana.png' },
  { id: 3, src: '/images/cherry.png' },
  { id: 4, src: '/images/grape.png' },
  { id: 5, src: '/images/orange.png' },
  { id: 6, src: '/images/watermelon.png' },
];

export default function MemoryMatchingGame() {
  const [cards, setCards] = useState([]);
  const [firstChoice, setFirstChoice] = useState(null);
  const [secondChoice, setSecondChoice] = useState(null);
  const [disabled, setDisabled] = useState(false);

  // Shuffle cards and duplicate them
  useEffect(() => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, matched: false, id: Math.random() }));
    setCards(shuffledCards);
  }, []);

  const handleChoice = (card) => {
    firstChoice ? setSecondChoice(card) : setFirstChoice(card);
  };

  // Check for a match
  useEffect(() => {
    if (firstChoice && secondChoice) {
      setDisabled(true);
      if (firstChoice.src === secondChoice.src) {
        setCards((prevCards) =>
          prevCards.map((card) =>
            card.src === firstChoice.src ? { ...card, matched: true } : card
          )
        );
      }
      setTimeout(() => resetTurn(), 1000);
    }
  }, [firstChoice, secondChoice]);

  // Reset choices & enable cards
  const resetTurn = () => {
    setFirstChoice(null);
    setSecondChoice(null);
    setDisabled(false);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Memory Matching Game</h1>
      <div style={styles.grid}>
        {cards.map((card) => (
          <div
            key={card.id}
            style={{
              ...styles.card,
              opacity: card.matched ? 0.5 : 1,
              pointerEvents: card.matched || disabled ? 'none' : 'auto',
            }}
            onClick={() => handleChoice(card)}
          >
            <img
              src={firstChoice === card || secondChoice === card || card.matched ? card.src : '/images/cover.png'}
              alt="card"
              style={styles.image}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f7f7f7',
    padding: '20px',
  },
  title: {
    fontSize: '32px',
    marginBottom: '20px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '10px',
    maxWidth: '600px',
    width: '100%',
  },
  card: {
    width: '100%',
    height: '150px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    cursor: 'pointer',
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
};
