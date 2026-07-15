import { api } from './api';
import { Outfit, Occasion } from '../types';

export const outfitService = {
  async getAll(): Promise<Outfit[]> {
    const { data } = await api.get('/outfits');
    return data;
  },

  async generate(occasion: Occasion): Promise<Outfit> {
    const { data } = await api.post('/outfits/generate', { occasion });
    return data;
  },

  async rate(id: string, rating: number): Promise<void> {
    await api.post(`/outfits/${id}/rate`, { rating });
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/outfits/${id}`);
  },
};
