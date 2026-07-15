export interface User {
  id: string;
  name: string;
  email: string;
  subscription_tier: 'free' | 'premium';
  created_at: string;
}

export interface AuthState {
  user: User | null;
  session: any | null;
  isLoading: boolean;
}
