import { create } from 'zustand';

interface AuthStore {
    token: string | null;
    setToken: (token: string | null) => void;
    role: 'USER' | 'ADMIN' | null;
    setRole: (role: 'USER' | 'ADMIN') => void;
}

export const useAuth = create<AuthStore>((set) => ({
    token: null,
    role: null,
    setToken: (token) => set({ token }),
    setRole: (role) => set({ role }),
}));