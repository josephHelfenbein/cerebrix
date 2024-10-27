"use client";

import React, { useEffect, useState, useRef } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';

// Initialize Spotify API client
const spotifyApi = new SpotifyWebApi();

export default function InstrumentGame() {
  const [token, setToken] = useState(null);
  const [tracks, setTracks] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [userGuess, setUserGuess] = useState('');
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState('');
  const [guesses, setGuesses] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const audioRef = useRef(null); // Ref to manage the audio element

  // Extract the token from the URL hash and store it
  useEffect(() => {
    const hash = window.location.hash;
    let _token = window.localStorage.getItem('spotify_token');

    if (!_token && hash) {
      _token = hash
        .substring(1)
        .split('&')
        .find((el) => el.startsWith('access_token'))
        ?.split('=')[1];

      if (_token) {
        window.location.hash = ''; // Clear the hash from the URL
        window.localStorage.setItem('spotify_token', _token);
        setToken(_token);
        spotifyApi.setAccessToken(_token);
      } else {
        console.error('Token not found in URL');
      }
    } else if (_token) {
      setToken(_token);
      spotifyApi.setAccessToken(_token);
    }
  }, []);

  // Fetch tracks when token is available
  useEffect(() => {
    if (token) {
      fetchInstrumentTracks();
    }
  }, [token]);

  const fetchInstrumentTracks = async () => {
    try {
      const instruments = ['piano', 'guitar', 'violin', 'trumpet', 'saxophone', 'flute'];
      const randomInstrument = instruments[Math.floor(Math.random() * instruments.length)];

      const response = await spotifyApi.searchTracks(`solo ${randomInstrument}`, {
        limit: 50,
        market: 'US',
      });

      const validTracks = response.tracks.items
        .filter((track) => track.preview_url) // Only use tracks with previews
        .filter((track) => track.album.album_type === 'album'); // Filter out non-album tracks

      const uniqueTracks = [...new Set(validTracks.map((t) => t.preview_url))] // Ensure no duplicates
        .map((url) => validTracks.find((track) => track.preview_url === url));

      if (uniqueTracks.length > 0) {
        setTracks(uniqueTracks);
        setCurrentTrack(uniqueTracks[0]); // Set the first valid track
      } else {
        setMessage('No valid tracks found. Try again.');
      }
    } catch (error) {
      console.error('Error fetching tracks:', error);
      setMessage('Failed to fetch tracks. Please try again.');
    }
  };

  const playTrack = (track) => {
    if (audioRef.current) audioRef.current.pause(); // Stop the current track if playing

    audioRef.current = new Audio(track.preview_url);
    audioRef.current.play();
    setIsPlaying(true);

    audioRef.current.addEventListener('ended', () => setIsPlaying(false)); // Track ends
  };

  const pauseTrack = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleGuess = (guess) => {
    if (currentTrack && currentTrack.name.toLowerCase().includes(guess.toLowerCase())) {
      setScore(score + 1);
      setMessage('Correct!');
    } else {
      setMessage('Incorrect. Try again!');
    }
    setUserGuess(''); // Reset the input field
    setGuesses(guesses + 1);

    if (audioRef.current) audioRef.current.pause(); // Stop the track

    if (guesses + 1 >= 10) {
      setMessage(`Game over! Your final score is ${score + 1}.`);
      return;
    }

    loadNextTrack(); // Load the next track
  };

  const loadNextTrack = () => {
    const nextTrack = tracks[Math.floor(Math.random() * tracks.length)];
    setCurrentTrack(nextTrack);
    setMessage('');
  };

  const skipTrack = () => {
    if (audioRef.current) audioRef.current.pause(); // Stop the current track
    loadNextTrack(); // Load a new track
  };

  const loginWithSpotify = () => {
    const clientId = '864f98b694c140088d80ef005804ca26'; // Replace with your Client ID
    const redirectUri = 'https://hackru-2024-rouge.vercel.app/games/instrumental'; // Adjust for production
    const scopes = ['user-read-email', 'user-read-private'];

    window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&scope=${scopes.join('%20')}&response_type=token&show_dialog=true`;
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold mb-4">Guess the Instrument</h1>

      {!token ? (
        <button
          onClick={loginWithSpotify}
          className="p-4 bg-gray-800 text-white rounded-md mb-4"
        >
          Login with Spotify
        </button>
      ) : (
        <>
          {currentTrack && (
            <div className="flex flex-col items-center mb-8">
              <button
                onClick={() => (isPlaying ? pauseTrack() : playTrack(currentTrack))}
                className={`p-4 text-white rounded-md ${
                  isPlaying ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
                }`}
              >
                {isPlaying ? 'Pause Track' : 'Play Track'}
              </button>

              <button
                onClick={skipTrack}
                className="mt-2 p-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
              >
                Skip Track
              </button>
            </div>
          )}

          <input
            type="text"
            placeholder="Enter your guess"
            value={userGuess}
            onChange={(e) => setUserGuess(e.target.value)}
            className="p-2 border rounded-md mb-4"
          />

          <button
            onClick={() => handleGuess(userGuess)}
            className="p-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Submit Guess
          </button>

          <p className="mt-4 text-xl">{message}</p>
          <p className="mt-2 text-lg">Score: {score}</p>
          <p className="mt-2 text-lg">Guesses: {guesses} / 10</p>
        </>
      )}
    </div>
  );
}
