import {supabase} from '@/core/supabase/client';
import { File } from '../models/File';

// Fetch files
export const fetchFiles = async (): Promise<File[]> => {
  const { data, error } = await supabase.storage.from('uploads').list();
  if (error) throw new Error(error.message);

  return data.map((file) => ({
    id: file.id,
    name: file.name,
    url: `${process.env.EXPO_PUBLIC_BASE_BUCKET_URL}/${file.name}`,
    uploadedAt: file.updated_at,
  }));
};

// Upload a file
export const uploadFile = async (fileBlob: Blob, fileName: string): Promise<void> => {
  const { error } = await supabase.storage.from('uploads').upload(fileName, fileBlob);
  if (error) throw new Error(error.message);
};

// Delete a file
export const deleteFile = async (fileName: string): Promise<void> => {
  const { error } = await supabase.storage.from('uploads').remove([fileName]);
  if (error) throw new Error(error.message);
};
