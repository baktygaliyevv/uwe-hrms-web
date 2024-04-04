import { create } from 'zustand';
import { User } from '../types/domain';

type OwnUserStore = {
    own: User | null;
    setOwn: (p: User | null) => void
}

export const useOwnUser = create<OwnUserStore>((set) => ({
    own: { id: 1, first_name: 'Test', last_name: 'Test', email: 'test@exmaple.com', role: 'admin' },//null,
    setOwn: (own) => set({ own })
}));