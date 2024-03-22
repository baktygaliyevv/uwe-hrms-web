import { create } from 'zustand';
import { Menu as MenuItemType } from '../types/domain';

type CartStoreType = {
    cart: { item: MenuItemType, quantity: number }[];
    add: (item: MenuItemType) => void;
    remove: (item: MenuItemType) => void;
}

export const useCart = create<CartStoreType>((set) => ({
    cart: [],
    add: (item) => set((state) => {
        const { cart } = state; // copy
        const i = cart.findIndex(({ item: fi }) => fi.id === item.id); // trying to find existing item and get its index
        if(i === -1) return { cart: [...cart, { item, quantity: 1 }] }; // not found => adding new item with q = 1
        cart[i].quantity += 1;
        return { cart };
    }),
    remove: (item) => set((state) => {
        const { cart } = state; // copy
        const i = cart.findIndex(({ item: fi }) => fi.id === item.id); // trying to find existing item and get its index
        if(i === -1) return { cart }; // return with no changes
        if(cart[i].quantity === 1) cart.splice(i, 1); // removing it completely
        else cart[i].quantity -= 1;
        return { cart };
    })
}))