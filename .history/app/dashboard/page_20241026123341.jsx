// app/dashboard/page.jsx
"use client"; // Required if using client-side hooks

import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const router = useRouter();

  const navigateToGame = (game) => {
    router.push(`/games/${game}`);
  };

  return (
    <div style={styles.container}>
      <h2>Select a Mini-Game</h2>
      <div style={styles.buttonContainer}>
        <button style={styles.button} onClick={() => navigateToGame('memory')}>
          Memory Game
        </button>
        <button style={styles.button} onClick={() => navigateToGame('puzzle')}>
          Puzzle Game
        </button>
        <button style={styles.button} onClick={() => navigateToGame('math')}>
          Math Game
        </button>
        <button style={styles.button} onClick={() => navigateToGame('reaction')}>
          Reaction Game
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    textAlign: 'center',
    marginTop: '50px',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    flexWrap: 'wrap',
    marginTop: '20px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '18px',
    cursor: 'pointer',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#4CAF50',
    color: 'white',
    transition: 'background-color 0.3s',
  },
};
