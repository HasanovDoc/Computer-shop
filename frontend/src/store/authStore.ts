import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  user: { username: string; role: string } | null;
  token: string | null;
  login: (username: string, role: string, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      login: (username, role, token) => set({ user: { username, role }, token }),
      logout: () => set({ user: null, token: null }),
    }),
    { name: 'auth-storage' }
  )
);