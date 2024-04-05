import { Role } from "../../../../types/domain";

type AdminSection = {
    text: string;
    to: string;
    allowed: Role[]
};

export const ADMIN_SECTIONS: AdminSection[] = [
    {
        text: 'Bookings',
        to: '/admin/bookings',
        allowed: ['admin', 'manager']
    },
    {
        text: 'Deliveries',
        to: '/admin/deliveries',
        allowed: ['admin', 'chef', 'courier', 'manager']
    },
    {
        text: 'Menu',
        to: '/admin/menu',
        allowed: ['admin']
    },
    {
        text: 'Orders',
        to: '/admin/orders',
        allowed: ['admin', 'chef', 'staff', 'manager']
    },
    {
        text: 'Products',
        to: '/admin/products',
        allowed: ['admin']
    },
    {
        text: 'Promocodes',
        to: '/admin/promocodes',
        allowed: ['admin', 'manager']
    },
    {
        text: 'Restaurant storages',
        to: '/admin/storage',
        allowed: ['admin', 'manager', 'chef']
    },
    {
        text: 'Tables',
        to: '/admin/tables',
        allowed: ['admin', 'manager']
    },
    {
        text: 'Users',
        to: '/admin/users',
        allowed: ['admin']
    }
];