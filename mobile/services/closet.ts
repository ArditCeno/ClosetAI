import { supabase } from './supabase';
import { Clothing } from '../types';

export const closetService = {
  async getAll(): Promise<Clothing[]> {
    const { data, error } = await supabase
      .from('clothes')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  },

  async upload(imageUri: string, category?: string): Promise<Clothing> {
    const formData = new FormData();
    const filename = imageUri.split('/').pop() || 'photo.jpg';
    formData.append('file', {
      uri: imageUri,
      name: filename,
      type: 'image/jpeg',
    } as any);

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('clothes')
      .upload(`${Date.now()}_${filename}`, formData);

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from('clothes')
      .getPublicUrl(uploadData.path);

    const { data, error } = await supabase
      .from('clothes')
      .insert({
        image_url: publicUrl,
        category: category || 'other',
        color: 'unknown',
        style: 'casual',
        season: 'all',
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase.from('clothes').delete().eq('id', id);
    if (error) throw error;
  },

  async updateWearCount(id: string): Promise<void> {
    const { error } = await supabase.rpc('increment_wear_count', { clothing_id: id });
    if (error) throw error;
  },
};
