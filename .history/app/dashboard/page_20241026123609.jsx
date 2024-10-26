// app/dashboard/page.jsx
"use client";

import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const router = useRouter();

  const navigateToGame = (game) => {
    router.push(`/games/${game}`);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Select a Mini-Game</h1>
      <div style={styles.gridContainer}>
        <button style={styles.button} onClick={() => navigateToGame('memory')}>
          🧠 Memory Matching Game
        </button>
        <button style={styles.button} onClick={() => navigateToGame('puzzle')}>
          ✍️ Crossword Game
        </button>
        <button style={styles.button} onClick={() => navigateToGame('math')}>
          🔢 Mental Math Game
        </button>
        <button style={styles.button} onClick={() => navigateToGame('reaction')}>
          🎵 Guess the Instrument
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh', // Full screen height to center the content
    backgroundColor: '#f0f0f5', // Light background for better contrast
    padding: '20px',
  },
  title: {
    fontSize: '36px',
    marginBottom: '40px',
    color: '#333',
    textAlign: 'center',
  },
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '30px',
    width: '100%',
    maxWidth: '800px',
  },
  button: {
    padding: '20px',
    fontSize: '18px',
    fontWeight: 'bold',
    cursor: 'pointer',
    borderRadius: '12px',
    border: 'none',
    backgroundColor: '#4CAF50',
    color: 'white',
    transition: 'transform 0.2s, background-color 0.3s',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  buttonHover: {
    backgroundColor: '#45a049',
    transform: 'scale(1.05)',
  },
};
