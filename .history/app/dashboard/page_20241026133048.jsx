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
        <div style={styles.card} onClick={() => navigateToGame('memory')}>
          <img src="/images/memory.png" alt="Memory Game" style={styles.image} />
          <span style={styles.caption}>🧠 Memory Matching Game</span>
        </div>

        <div style={styles.card} onClick={() => navigateToGame('puzzle')}>
          <img src="/images/crossword.png" alt="Crossword Game" style={styles.image} />
          <span style={styles.caption}>✍️ Crossword Game</span>
        </div>

        <div style={styles.card} onClick={() => navigateToGame('math')}>
          <img src="/images/math.png" alt="Math Game" style={styles.image} />
          <span style={styles.caption}>🔢 Mental Math Game</span>
        </div>

        <div style={styles.card} onClick={() => navigateToGame('reaction')}>
          <img src="/images/instrument.png" alt="Instrument Game" style={styles.image} />
          <span style={styles.caption}>🎵 Guess the Instrument</span>
        </div>
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
    height: '100vh',
    backgroundColor: '#f0f0f5',
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
    gridTemplateColumns: '1fr 1fr', // 2x2 grid layout
    gap: '40px',
    maxWidth: '800px',
    width: '100%',
    justifyItems: 'center',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    width: '250px',
    height: '250px',
    backgroundColor: '#4CAF50',
    color: 'white',
    borderRadius: '12px',
    cursor: 'pointer',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.2s, background-color 0.3s',
    textAlign: 'center',
  },
  image: {
    width: '80px',
    height: '80px',
    marginBottom: '10px',
    objectFit: 'cover',
    borderRadius: '8px',
  },
  caption: {
    fontSize: '18px',
    fontWeight: 'bold',
  },
};
