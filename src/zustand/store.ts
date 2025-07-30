import { create } from 'zustand';

type Role = 'USER' | 'ADMIN' | null;

interface AuthStore {
    token: string | null;
    role: Role;
    setToken: (token: string | null) => void;
    setRole: (role: Role) => void;
}

export const useAuth = create<AuthStore>((set) => {
    // Đọc từ localStorage khi khởi tạo store
    let initialToken: string | null = null;
    let initialRole: Role = null;

    if (typeof window !== 'undefined') {
        initialToken = localStorage.getItem('token');
        initialRole = localStorage.getItem('role') as Role;
    }

    return {
        token: initialToken,
        role: initialRole,
        setToken: (token) => {
            if (typeof window !== 'undefined') {
                if (token) {
                    localStorage.setItem('token', token);
                } else {
                    localStorage.removeItem('token');
                }
            }
            set({ token });
        },
        setRole: (role) => {
            if (typeof window !== 'undefined') {
                if (role) {
                    localStorage.setItem('role', role);
                } else {
                    localStorage.removeItem('role');
                }
            }
            set({ role });
        },
    };
});
