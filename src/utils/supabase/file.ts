import { createClient } from '@/utils/supabase/client';
import imageCompression from 'browser-image-compression';
import { v4 as uuidv4 } from 'uuid';

/**
 * @description The properties for the upload image function.
 * @param {File} file
 * @param {string} bucket
 * @param {string} folder
 * @param {string} title
 * @param {string} description
 * @param {string} user_id
 */
type UploadProps = {
  file: File;
  bucket: string;
  folder?: string;
  title?: string;
  description?: string;
  user_id: string;
};

export const uploadImage = async ({
  file,
  bucket,
  folder,
  title,
  description,
  user_id,
}: UploadProps) => {
  const supabase = createClient();
  const fileName = file.name;
  const fileExtension = fileName.slice(fileName.lastIndexOf('.') + 1);
  const path = `${folder ? `${folder}/` : ''}${uuidv4()}.${fileExtension}`;

  try {
    file = await imageCompression(file, {
      maxSizeMB: 1,
    });
  } catch (error) {
    console.error('Image compression failed:', error);
    return { imageUrl: '', error: 'Image compression failed' };
  }

  try {
    const { data, error } = await supabase.storage.from(bucket).upload(path, file, {
      cacheControl: '3600',
      upsert: false,
    });

    if (error) {
      console.error('Supabase storage upload error:', error);
      return { imageUrl: '', error: `Image upload failed: ${error.message}` };
    }

    if (!data) {
      console.error('No data returned from Supabase upload');
      return { imageUrl: '', error: 'No data returned from upload' };
    }

    const { data: publicUrlData } = supabase.storage.from(bucket).getPublicUrl(data.path);

    const { data: imageData, error: insertError } = await supabase
      .from('image_uploads')
      .insert({
        user_id,
        file_name: fileName,
        file_path: data.path,
        title,
        description,
      })
      .select()
      .single();

    if (insertError) {
      console.error('Error inserting image data:', insertError);
      return { imageUrl: '', error: 'Failed to save image information' };
    }

    return { imageUrl: publicUrlData.publicUrl, imageData, error: '' };
  } catch (error) {
    console.error('Unexpected error during upload:', error);
    return { imageUrl: '', error: 'Unexpected error during upload' };
  }
};

export const deleteImage = async (imageUrl: string) => {
  const supabase = createClient();
  const bucketAndPathString = imageUrl.split('/storage/v1/object/public/')[1];
  if (!bucketAndPathString) {
    return { data: null, error: 'Invalid image URL' };
  }
  const firstSlashIndex = bucketAndPathString.indexOf('/');

  const bucket = bucketAndPathString.slice(0, firstSlashIndex);
  const path = bucketAndPathString.slice(firstSlashIndex + 1);

  const { data, error } = await supabase.storage.from(bucket).remove([path]);

  return { data, error };
};
