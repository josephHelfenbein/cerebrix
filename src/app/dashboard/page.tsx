"use client";

import { useRouter } from 'next/navigation';
import {useState} from 'react';
import Upload from '@/components/upload-images';

export default function Dashboard() {
  const router = useRouter();

  const navigateToGame = (game: string) => {
    router.push(`/games/${game}`);
  };

  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50 p-8">
       <Upload isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
      <h1 className="text-4xl font-bold text-gray-800 mb-12">Select a Mini-Game</h1>
      <div className="grid grid-cols-2 gap-8 w-full max-w-2xl">
        <GameCard
          image="/images/memory.jpg"
          label="🧠 Memory Matching Game"
          onClick={() => setModalOpen(true)}
        />
        <GameCard
          image="/images/nostalgia.jpg"
          label="✍️ Nostalgia Trip"
          onClick={() => navigateToGame('nostalgia')}
        />
        <GameCard
          image="/images/math.jpg"
          label="🔢 Mental Math Game"
          onClick={() => navigateToGame('math')}
        />
        <GameCard
          image="/images/instrument.avif"
          label="🎵 Guess the Instrument"
          onClick={() => navigateToGame('instrumental')}
        />
      </div>
      <LongGameCard
          image="/images/emotional.jpeg"
          label="✨ AI Friend"
          onClick={() => router.push('/voice')}
        />
    </div>
  );
}

function GameCard({ image, label, onClick }: { image: string, label: string, onClick: () => void }) {
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


function LongGameCard({ image, label, onClick }: { image: string, label: string, onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      className="flex flex-col pl-48 pr-48  mt-12 items-center justify-center bg-white text-black rounded-lg p-6 cursor-pointer hover:shadow-xl transition transform hover:scale-105 border border-gray-300"
    >
      <img
        src={image}
        alt={label}
        className="w-50 h-24 object-cover rounded-md mb-4"
      />
      <span className="text-xl font-semibold">{label}</span>
    </div>
  );
}
