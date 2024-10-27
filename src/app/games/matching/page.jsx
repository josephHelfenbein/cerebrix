"use client"
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function Matching() {
  const [familyMembers, setFamilyMembers] = useState([]);
  const [names, setNames] = useState([]);
  const [images, setImages] = useState([]);
  const [selectedName, setSelectedName] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [matches, setMatches] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function fetchFamilyMembers() {
      const { data, error } = await supabase
        .from('family_members')
        .select('name, photo_url');

      if (error) {
        console.error('Error fetching family members:', error);
        return;
      }

      const familyWithSignedUrls = await Promise.all(
        data.map(async (member) => {
          const { data: signedUrlData, error: signedUrlError } = await supabase
            .storage
            .from('family-photos') // replace with your bucket name
            .createSignedUrl(member.photo_url.split('/').pop(), 60); // gets filename and expires in 60 seconds

          if (signedUrlError) {
            console.error('Error fetching signed URL:', signedUrlError.message);
            return member; // fallback to original if there's an error
          }

          return {
            ...member,
            photo_url: signedUrlData?.signedUrl || member.photo_url,
          };
        })
      );

      setFamilyMembers(familyWithSignedUrls);
      shuffleGameData(familyWithSignedUrls);
    }

    fetchFamilyMembers();
  }, []);

  function shuffleGameData(data) {
    const shuffledNames = data.map(member => member.name).sort(() => Math.random() - 0.5);
    const shuffledImages = data.map(member => member.photo_url).sort(() => Math.random() - 0.5);
    setNames(shuffledNames);
    setImages(shuffledImages);
  }

  function handleNameClick(name) {
    setSelectedName(name);
    if (selectedImage) checkMatch(name, selectedImage);
  }

  function handleImageClick(image) {
    setSelectedImage(image);
    if (selectedName) checkMatch(selectedName, image);
  }

  function checkMatch(name, image) {
    const matchedMember = familyMembers.find(
      (member) => member.name === name && member.photo_url === image
    );

    if (matchedMember) {
      setMatches((prev) => [...prev, name]);
      setMessage("Correct match!");
    } else {
      setMessage("Try again!");
    }

    setSelectedName(null);
    setSelectedImage(null);
  }

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-50 p-8 ">
        <div className="flex justify-left w-full p-4">
                    <a href="/dashboard">
                    <svg viewBox="0 -960 960 960" width="24px" fill="#c8cacd">
                        <path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z" />
                    </svg>
                    </a>
                </div>
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Match the Names to Faces</h1>
      <p className="text-lg font-semibold text-green-500 mb-4">{message}</p>
      <div className="flex gap-8 mb-12">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Names</h2>
          <ul className="space-y-2">
            {names.map((name, index) => (
              <li key={index}>
                <button
                  onClick={() => handleNameClick(name)}
                  disabled={matches.includes(name)}
                  className={`px-4 py-2 text-white rounded-lg ${
                    matches.includes(name) ? 'bg-gray-400' : 'bg-blue-500'
                  }`}
                >
                  {name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Images</h2>
          <div className="grid grid-cols-2 gap-4">
            {images.map((image, index) => (
              <div key={index} className="border p-2 rounded-lg">
                <button
                  onClick={() => handleImageClick(image)}
                  disabled={matches.includes(familyMembers.find(member => member.photo_url === image)?.name)}
                >
                  <img
                    src={image}
                    alt="Family member"
                    className="w-24 h-24 object-cover rounded"
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
