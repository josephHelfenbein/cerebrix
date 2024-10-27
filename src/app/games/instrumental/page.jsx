"use client";

import React, { useEffect, useState, useRef } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import Link from 'next/link';

const spotifyApi = new SpotifyWebApi();

const instrumentEmojis = {
  piano: '🎹',
  guitar: '🎸',
  violin: '🎻',
  trumpet: '🎺',
  saxophone: '🎷',
  flute: '🪈',
};

export default function YearGuessingGame() {
  const [token, setToken] = useState(null);
  const [tracks, setTracks] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [userGuess, setUserGuess] = useState('');
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState('');
  const [guesses, setGuesses] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userYear, setUserYear] = useState('');
  const [correctYear, setCorrectYear] = useState(null);

  const audioRef = useRef(null);

  useEffect(() => {
    const hash = window.location.hash;
    let storedToken = window.localStorage.getItem('spotify_token');

    if (!storedToken && hash) {
      storedToken = hash
        .substring(1)
        .split('&')
        .find((element) => element.startsWith('access_token'))
        ?.split('=')[1];

      if (storedToken) {
        window.location.hash = '';
        window.localStorage.setItem('spotify_token', storedToken);
        window.localStorage.setItem('token_expiration', Date.now() + 3600 * 1000);
        setToken(storedToken);
        spotifyApi.setAccessToken(storedToken);
      } else {
        console.error('Token not found in URL');
        setMessage('Failed to authenticate with Spotify. Please try logging in again.');
      }
    } else if (storedToken) {
      setToken(storedToken);
      spotifyApi.setAccessToken(storedToken);
    }
  }, []);

  useEffect(() => {
    if (token) {
      const expirationTime = localStorage.getItem('token_expiration');
      if (expirationTime && Date.now() > parseInt(expirationTime)) {
        console.log('Token expired, refreshing...');
        refreshToken();
      } else {
        fetchInstrumentalTracks();
      }
    }
  }, [token]);

  const refreshToken = async () => {
    console.log('Token refresh not implemented');
    localStorage.removeItem('spotify_token');
    localStorage.removeItem('token_expiration');
    setToken(null);
    setMessage('Session expired. Please log in again.');
  };

  const fetchInstrumentalTracks = async () => {
    const instruments = ['piano', 'guitar', 'violin', 'trumpet', 'saxophone', 'flute'];
    setIsLoading(true);
    setMessage('Loading tracks...');
    try {
      const allTracks = [];
      for (const instrument of instruments) {
        try {
          console.log(`Fetching tracks for ${instrument}...`);
          const response = await spotifyApi.searchTracks(`solo ${instrument}`, {
            limit: 5,
            market: 'US',
          });
          if (response.tracks && response.tracks.items) {
            const validTracks = response.tracks.items
              .filter((track) => track.preview_url)
              .filter((track) => track.album.album_type === 'album')
              .map((track) => ({ ...track, instrument }));
            allTracks.push(...validTracks);
          } else {
            console.error(`Unexpected response structure for ${instrument}:`, response);
          }
        } catch (instrumentError) {
          console.error(`Error fetching tracks for ${instrument}:`, instrumentError);
          if (instrumentError.status === 401) {
            await refreshToken();
          }
        }
      }

      if (allTracks.length === 0) {
        throw new Error('No valid tracks found');
      }

      const shuffledTracks = allTracks.sort(() => Math.random() - 0.5);
      setTracks(shuffledTracks);
      setCurrentTrack(shuffledTracks[0]);
      playTrack(shuffledTracks[0]);
      setMessage('');
    } catch (error) {
      console.error('Error fetching tracks:', error);
      setMessage('Failed to fetch tracks. Please try again or check your internet connection.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
    };
  }, []);

  const playTrack = (track) => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = '';
    }
    if (track && track.preview_url) {
      audioRef.current = new Audio(track.preview_url);
      audioRef.current.play().catch(error => {
        console.error('Error playing audio:', error);
        setMessage('Error playing track. Please try again.');
      });
      setIsPlaying(true);
      audioRef.current.addEventListener('ended', () => setIsPlaying(false));
    } else {
      console.error('Invalid track or missing preview URL');
      setMessage('This track cannot be played. Moving to the next one.');
      loadNextTrack();
    }
  };

  const pauseTrack = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleGuess = () => {
    if (gameOver) return;

    if (parseInt(userGuess) === correctYear) {
      setScore(score + 1);
      setMessage(`Correct! The song was released in ${correctYear}.`);
    } else {
      setMessage(`Incorrect. The correct year was ${correctYear}.`);
    }

    setGuesses(guesses + 1);
    setUserGuess('');

    if (guesses + 1 >= 10) {
      setGameOver(true);
      setMessage(`Game over! Your final score is ${score + (parseInt(userGuess) === correctYear ? 1 : 0)} out of 10.`);
      pauseTrack();
    } else {
      fetchTracksByYear(userYear);
    }
  };

  const loadNextTrack = () => {
    const nextTrack = tracks[Math.floor(Math.random() * tracks.length)];
    setCurrentTrack(nextTrack);
    playTrack(nextTrack);
  };

  const loginWithSpotify = () => {
    const clientId = '639df2847d0b4df48f321a7dbbdae0e3';
    const redirectUri = 'https://hackru-2024-rouge.vercel.app/games/instrumental';
    const scopes = ['user-read-private', 'user-read-email', 'streaming'];

    window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&scope=${scopes.join('%20')}&response_type=token&show_dialog=true`;
  };

  const restartGame = () => {
    setScore(0);
    setGuesses(0);
    setGameOver(false);
    setMessage('');
    fetchInstrumentalTracks();
  };

  const fetchTracksByYear = async (year) => {
    setIsLoading(true);
    setMessage('Loading tracks...');
    try {
      const startYear = parseInt(year);
      const endYear = startYear + 14;
      const response = await spotifyApi.searchTracks(`year:${startYear}-${endYear}`, {
        limit: 50,
        market: 'US',
      });

      if (response.tracks && response.tracks.items) {
        const validTracks = response.tracks.items
          .filter((track) => track.preview_url)
          .map((track) => ({ ...track, releaseYear: new Date(track.album.release_date).getFullYear() }));

        if (validTracks.length === 0) {
          throw new Error('No valid tracks found');
        }

        const randomTrack = validTracks[Math.floor(Math.random() * validTracks.length)];
        setTracks([randomTrack]);
        setCurrentTrack(randomTrack);
        setCorrectYear(randomTrack.releaseYear);
        playTrack(randomTrack);
        setMessage('');
      } else {
        throw new Error('Unexpected response structure');
      }
    } catch (error) {
      console.error('Error fetching tracks:', error);
      setMessage('Failed to fetch tracks. Please try again or check your internet connection.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleYearSubmit = () => {
    if (userYear) {
      fetchTracksByYear(userYear);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-green-400 to-blue-500 p-8 text-white">
      <Link 
        href="/dashboard" 
        className="absolute top-4 left-4 px-4 py-2 bg-white text-blue-500 rounded-full font-semibold hover:bg-gray-100 transition duration-300 shadow-lg"
        onClick={pauseTrack}
      >
        ← Back to Dashboard
      </Link>

      <h1 className="text-5xl font-bold mb-8 text-center">Guess the Year 🎵</h1>

      {!token ? (
        <button
          onClick={loginWithSpotify}
          className="px-8 py-4 bg-green-500 text-white rounded-full font-semibold hover:bg-green-600 transition duration-300 text-xl shadow-lg"
        >
          Login with Spotify
        </button>
      ) : (
        <>
          {isLoading ? (
            <div className="text-2xl mb-4 animate-pulse">Loading tracks... 🎶</div>
          ) : (
            <>
              {!currentTrack && !gameOver && (
                <div className="flex flex-col items-center mb-8">
                  <input
                    type="number"
                    placeholder="Enter a year (1950-2010)"
                    value={userYear}
                    onChange={(e) => setUserYear(e.target.value)}
                    className="px-6 py-3 border rounded-full mb-4 w-80 text-center text-xl text-black"
                  />
                  <button
                    onClick={handleYearSubmit}
                    className="px-8 py-4 bg-blue-500 text-white rounded-full font-semibold hover:bg-blue-600 transition duration-300 text-xl shadow-lg"
                  >
                    Start Game
                  </button>
                </div>
              )}

              {currentTrack && !gameOver && (
                <div className="flex flex-col items-center mb-8">
                  <button
                    onClick={() => (isPlaying ? pauseTrack() : playTrack(currentTrack))}
                    className={`px-8 py-4 text-white rounded-full font-semibold transition duration-300 text-xl shadow-lg ${
                      isPlaying ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
                    }`}
                  >
                    {isPlaying ? 'Pause Track ⏸' : 'Play Track ▶'}
                  </button>
                </div>
              )}

              {currentTrack && !gameOver && (
                <div className="flex flex-col items-center mb-8">
                  <input
                    type="number"
                    placeholder="Guess the year"
                    value={userGuess}
                    onChange={(e) => setUserGuess(e.target.value)}
                    className="px-6 py-3 border rounded-full mb-4 w-80 text-center text-xl text-black"
                  />
                  <button
                    onClick={handleGuess}
                    className="px-8 py-4 bg-blue-500 text-white rounded-full font-semibold hover:bg-blue-600 transition duration-300 text-xl shadow-lg"
                  >
                    Submit Guess
                  </button>
                </div>
              )}

              <p className="text-2xl mb-4 text-center">{message}</p>
              <p className="text-xl mb-2">Score: {score}</p>
              <p className="text-xl mb-4">Guesses: {guesses} / 10</p>

              <div className="flex justify-center space-x-4 mb-8">
                {Object.entries(instrumentEmojis).map(([instrument, emoji]) => (
                  <span key={instrument} className="text-3xl" title={instrument}>
                    {emoji}
                  </span>
                ))}
              </div>

              {gameOver && (
                <button
                  onClick={restartGame}
                  className="px-8 py-4 bg-yellow-500 text-white rounded-full font-semibold hover:bg-yellow-600 transition duration-300 text-xl shadow-lg"
                >
                  Play Again 🔄
                </button>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}
