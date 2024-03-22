import { create } from 'zustand';
import { User } from '../types/domain';

type OwnUserStore = {
    own: User | null;
    setOwn: (p: User | null) => void
}

export const useOwnUser = create<OwnUserStore>((set) => ({
    own: null,
    setOwn: (own) => set({ own })
}));