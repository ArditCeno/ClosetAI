import { create } from 'zustand';
import { supabase } from '../services/supabase';
import { User } from '../types';

interface AuthStore {
  user: User | null;
  session: any | null;
  isLoading: boolean;
  initialize: () => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  session: null,
  isLoading: true,

  initialize: async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { data: { user } } = await supabase.auth.getUser();
        set({
          session,
          user: user ? {
            id: user.id,
            email: user.email || '',
            name: user.user_metadata?.name || '',
            subscription_tier: 'free',
            created_at: user.created_at,
          } : null,
        });
      }
    } catch (error) {
      console.error('Auth initialize error:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  signIn: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    set({
      session: data.session,
      user: data.user ? {
        id: data.user.id,
        email: data.user.email || '',
        name: data.user.user_metadata?.name || '',
        subscription_tier: 'free',
        created_at: data.user.created_at,
      } : null,
    });
  },

  signUp: async (email: string, password: string, name: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name } },
    });
    if (error) throw error;
    set({
      session: data.session,
      user: data.user ? {
        id: data.user.id,
        email: data.user.email || '',
        name: name,
        subscription_tier: 'free',
        created_at: data.user.created_at,
      } : null,
    });
  },

  signOut: async () => {
    try {
      await supabase.auth.signOut();
    } catch (e) {
      console.error('Supabase signOut error:', e);
    }
    // Force clear session regardless
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('sb-iczjtqbtmrlnpsfohaqx-auth-token');
    }
    set({ user: null, session: null, isLoading: false });
  },
}));
