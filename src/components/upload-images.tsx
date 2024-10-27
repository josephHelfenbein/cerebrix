import { createClient } from "@supabase/supabase-js";
import {useState, useEffect} from 'react';
import { useRouter } from "next/navigation";
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function Upload({isOpen, onClose}){
    const [name, setName] = useState('');
    const [image, setImage] = useState(null);
    const [isClient, setIsClient] = useState(false);
    const router = useRouter();
    const [updateMessage, setUpdateMessage] = useState('');

    useEffect(() => {
      setIsClient(true);
    }, []);
    const handleMove = async () =>{
      onClose();
      if (isClient) router.push('/Matching');
    }
    const handleUpload = async () => {
        if (!name || !image) return alert('Please fill in all fields.');
    
        const fileExt = image.name.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const { data, error } = await supabase.storage
          .from('family-photos')
          .upload(fileName, image);
    
        if (error) {
          console.error('Error uploading image:', error.message);
          return;
        }
    
        const photoUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/family-photos/${fileName}`;
    
        const { error: insertError } = await supabase
          .from('family_members')
          .insert([{ name, photo_url: photoUrl }]);
    
        if (insertError) {
          console.error('Error saving data:', insertError.message);
          return;
        }
        setUpdateMessage('Uploaded.');
        
    };    
    if(!isOpen) return null;
    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
            <button style={styles.closeButton} onClick={onClose}>X</button>
          <h1>Upload Family Member</h1>
          <input
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            style={styles.input}
          />
           <button className='mb-2' onClick={handleUpload} style={styles.button}>Upload</button>
          <button onClick={handleMove} style={styles.button}>Start Game</button>
          {updateMessage !== '' && <p>{updateMessage}</p>}
          </div>
        </div>
      );
}
const styles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
    },
    modal: {
      backgroundColor: '#fff',
      padding: '20px',
      borderRadius: '8px',
      width: '400px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
      position: 'relative',
    },
    closeButton: {
      position: 'absolute',
      top: '10px',
      right: '10px',
      border: 'none',
      backgroundColor: 'transparent',
      fontSize: '18px',
      cursor: 'pointer',
    },
    input: {
      display: 'block',
      width: '100%',
      padding: '8px',
      margin: '10px 0',
      borderRadius: '4px',
      border: '1px solid #ccc',
    },
    button: {
      width: '100%',
      padding: '10px',
      backgroundColor: '#007bff',
      color: '#fff',
      borderRadius: '4px',
      border: 'none',
      cursor: 'pointer',
    },
  };
  