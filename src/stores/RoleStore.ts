import { create } from 'zustand';

type RoleStore = {
    role: Record<string, boolean>,
    setRole: (p: Record<string, boolean>) => void
}

export const useRoleStore = create<RoleStore>((set) => ({
    role: {},
    setRole: (role) => set({ role })
}));

export const useRole = () => useRoleStore(state => state.role);
export const useSetRole = () => useRoleStore(state => state.setRole);