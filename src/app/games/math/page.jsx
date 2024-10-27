"use client";

import React, { useState, useEffect } from 'react';
import confetti from "canvas-confetti";

const MathGame = () => {
  const [gameState, setGameState] = useState('start'); // 'start', 'playing', 'gameOver'
  const [problem, setProblem] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [difficulty, setDifficulty] = useState(1);
  const [cognitiveState, setCognitiveState] = useState('stable');
  const [timer, setTimer] = useState(60); // 60 seconds game time

  useEffect(() => {
    let interval;
    if (gameState === 'playing') {
      generateProblem();
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer <= 1) {
            clearInterval(interval);
            setGameState('gameOver');
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gameState]);

  const startGame = () => {
    setGameState('playing');
    setScore(0);
    setDifficulty(1);
    setCognitiveState('stable');
    setTimer(60);
  };

  const generateProblem = async () => {
    try {
      const response = await fetch('https://cerebrix-llm.josephhelfenbein.workers.dev/math', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 'text':difficulty }),
      });
      const data = await response.json();
      const jsonUse = JSON.parse(data.response);
      console.log(jsonUse);
      setProblem({question:jsonUse.equation, answer:jsonUse.answer});
    } catch (error) {
      console.error('Error generating problem:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const duration = 5 * 200;
    const randomInRange = (min, max) =>
      Math.random() * (max - min) + min;
    if (userAnswer === problem.answer) {
      const animationEnd = Date.now() + duration;
      setShowFeedback('Correct!');
      setScore(score + 1);
      const interval = window.setInterval(() => {
        const timeLeft = animationEnd - Date.now();
   
        if (timeLeft <= 0) {
          setShowFeedback('');
          return clearInterval(interval);}
        
      confetti({
        defaults:{ startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 },
        particleCount:10,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        defaults:{ startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 },
        particleCount:10,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 100);
    updateDifficulty(true);
    } else {
      const animationEnd = Date.now() + duration;
      setShowFeedback('Incorrect!');
      const interval = window.setInterval(()=>{
        const timeLeft = animationEnd - Date.now();
   
        if (timeLeft <= 0) {
          setShowFeedback('');
          return clearInterval(interval);}
      }, 100);
      updateDifficulty(false);
    }
    setUserAnswer('');
    generateProblem();
  };

  const updateDifficulty = (correct) => {
    if (correct) {
      setDifficulty((prevDifficulty) => Math.min(prevDifficulty + 1, 10));
      setCognitiveState('improving');
    } else {
      setDifficulty((prevDifficulty) => Math.max(prevDifficulty - 1, 1));
      setCognitiveState('struggling');
    }
    setTimeout(() => setCognitiveState('stable'), 2000);
  };

  const [showFeedback, setShowFeedback] = useState('');

  const renderGameContent = () => {
    switch (gameState) {
      case 'start':
        return (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Welcome to Math Challenge!</h2>
            <p className="mb-4">Test your math skills in 60 seconds.</p>
            <button
              onClick={startGame}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
            >
              Start Game
            </button>
          </div>
        );
      case 'playing':
        return (
          <div>
            <div className="flex justify-between mb-4">
              <p>Score: {score}</p>
              <p>Time: {timer}s</p>
            </div>
            {problem && (
              <form onSubmit={handleSubmit} className="mb-4">
                <p className="text-xl mb-2">{problem.question} = ?</p>
                <input
                  type="number"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  className="border p-2 mr-2 rounded"
                  required
                  autoFocus
                />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
                  Submit
                </button>
              </form>
            )}
            {showFeedback !== '' && <p className="text-center font-bold">{showFeedback}</p> }
          </div>
        );
      case 'gameOver':
        return (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Game Over!</h2>
            <p className="mb-2">Your final score: {score}</p>
            <p className="mb-4">Highest difficulty reached: {difficulty}</p>
            <button
              onClick={startGame}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
            >
              Play Again
            </button>
          </div>
        );
    }
  };

  return (
    <div className="container p-4 w-full flex flex-col">
      <div className="flex justify-left w-full">
        <a href="/dashboard">
          <svg viewBox="0 -960 960 960" width="24px" fill="#c8cacd">
            <path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z" />
          </svg>
        </a>
      </div>
      <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center pt-20">Math Challenge</h1>
      {renderGameContent()}
      </div>
    </div>
  );
};

export default MathGame;