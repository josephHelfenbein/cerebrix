// app/dashboard/page.jsx
"use client";

import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const router = useRouter();

  const navigateToGame = (game) => {
    router.push(`/games/${game}`);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50 p-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-12">Select a Mini-Game</h1>
      <div className="grid grid-cols-2 gap-8 w-full max-w-2xl">
        <GameCard
          image="/images/memory.png"
          label="🧠 Memory Matching Game"
          onClick={() => navigateToGame('memory')}
        />
        <GameCard
          image="/images/crossword.png"
          label="✍️ Crossword Game"
          onClick={() => navigateToGame('puzzle')}
        />
        <GameCard
          image="/images/math.png"
          label="🔢 Mental Math Game"
          onClick={() => navigateToGame('math')}
        />
        <GameCard
          image="/images/instrument.png"
          label="🎵 Guess the Instrument"
          onClick={() => navigateToGame('instrumental')}
        />
      </div>
      <LongGameCard
          image="/images/emotional.png"
          label="✨ AI Friend"
          onClick={() => router.push('/voice')}
        />
    </div>
  );
}

function GameCard({ image, label, onClick }) {
  return (
    <div
      onClick={onClick}
      className="flex flex-col items-center justify-center bg-white text-black rounded-lg p-6 cursor-pointer hover:shadow-xl transition transform hover:scale-105 border border-gray-300"
    >
      <img
        src={image}
        alt={label}
        className="w-24 h-24 object-cover rounded-md mb-4"
      />
      <span className="text-xl font-semibold">{label}</span>
    </div>
  );
}


function LongGameCard({ image, label, onClick }) {
  return (
    <div
      onClick={onClick}
      className="flex flex-col pl-48 pr-48  mt-12 items-center justify-center bg-white text-black rounded-lg p-6 cursor-pointer hover:shadow-xl transition transform hover:scale-105 border border-gray-300"
    >
      <img
        src={image}
        alt={label}
        className="w-24 h-24 object-cover rounded-md mb-4"
      />
      <span className="text-xl font-semibold">{label}</span>
    </div>
  );
}