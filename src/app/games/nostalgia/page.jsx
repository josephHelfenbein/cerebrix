"use client"

import React, { useEffect, useState, useRef } from 'react'
import SpotifyWebApi from 'spotify-web-api-js'
import Link from 'next/link'

const spotifyApi = new SpotifyWebApi()

export default function NostalgiaGame() {
  const [token, setToken] = useState(null)
  const [currentTrack, setCurrentTrack] = useState(null)
  const [userYear, setUserYear] = useState('')
  const [message, setMessage] = useState('')
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const audioRef = useRef(null)

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
        setToken(storedToken);
        spotifyApi.setAccessToken(storedToken);
      }
    } else if (storedToken) {
      setToken(storedToken);
      spotifyApi.setAccessToken(storedToken);
    }
  }, []);

  const fetchTrackForYear = async (year) => {
    setIsLoading(true);
    setMessage('Loading track...');
    try {
      const response = await spotifyApi.searchTracks(`year:${year + 14}`, {
        limit: 50,
        market: 'US',
      });
      if (response.tracks && response.tracks.items) {
        const validTracks = response.tracks.items.filter((track) => track.preview_url);
        
        if (validTracks.length === 0) {
          throw new Error('No valid tracks found for this year');
        }

        const randomTrack = validTracks[Math.floor(Math.random() * validTracks.length)];
        setCurrentTrack(randomTrack);
        playTrack(randomTrack);
        setMessage(`Playing a song from ${year + 14}`);
      } else {
        throw new Error('Unexpected response structure');
      }
    } catch (error) {
      console.error('Error fetching tracks:', error);
      setMessage('Failed to fetch a track. Please try a different year or check your internet connection.');
    } finally {
      setIsLoading(false);
    }
  };

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
      setMessage('This track cannot be played. Please try another year.');
    }
  };

  const pauseTrack = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
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

  const handleYearSubmit = () => {
    const year = parseInt(userYear);
    if (isNaN(year) || year < 1900 || year > new Date().getFullYear() - 14) {
      setMessage('Please enter a valid year between 1900 and ' + (new Date().getFullYear() - 14));
      return;
    }

    fetchTrackForYear(year);
  };

  const loginWithSpotify = () => {
    const clientId = '639df2847d0b4df48f321a7dbbdae0e3'
    const redirectUri = 'http://localhost:3000/games/nostalgia'
    const scopes = ['user-read-private', 'user-read-email', 'streaming']

    window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&scope=${scopes.join('%20')}&response_type=token&show_dialog=true`
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-purple-400 to-pink-500 p-8 text-white">
      <Link 
        href="/dashboard" 
        className="absolute top-4 left-4 px-4 py-2 bg-white text-pink-500 rounded-full font-semibold hover:bg-gray-100 transition duration-300 shadow-lg"
        onClick={pauseTrack}
      >
        ← Back to Dashboard
      </Link>

      <h1 className="text-5xl font-bold mb-8 text-center">Nostalgia Music Game 🎵</h1>

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
            <div className="text-2xl mb-4 animate-pulse">Loading track... 🎶</div>
          ) : (
            <>
              {currentTrack && (
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

              <div className="flex flex-col items-center mb-8">
                <input
                  type="number"
                  placeholder="Enter a year"
                  value={userYear}
                  onChange={(e) => setUserYear(e.target.value)}
                  className="px-6 py-3 border rounded-full mb-4 w-80 text-center text-xl text-black"
                />
                <button
                  onClick={handleYearSubmit}
                  className="px-8 py-4 bg-blue-500 text-white rounded-full font-semibold hover:bg-blue-600 transition duration-300 text-xl shadow-lg"
                >
                  Submit Year
                </button>
              </div>

              <p className="text-2xl mb-4 text-center">{message}</p>
            </>
          )}
        </>
      )}
    </div>
  )
}
