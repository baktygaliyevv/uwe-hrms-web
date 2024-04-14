import { RouteObject } from "react-router-dom";
import { LoginPage } from "./pages/Login/LoginPage";
import { MenuPage } from "./pages/Menu/MenuPage";
import { ForgotPage } from "./pages/Forgot/ForgotPage";
import { SignupPage } from "./pages/Signup/SignupPage";
import { CheckoutPage } from "./pages/Checkout/CheckoutPage";
import { OrdersPage } from "./pages/Orders/OrdersPage";
import { AdminWrapper } from "./components/AdminWrapper/AdminWrapper";
import { AdminDashboardPage } from "./pages/AdminDashboard/AdminDashboardPage";
import { AdminUsersPage } from "./pages/AdminUsers/AdminUsersPage";
import { AdminTablesPage } from "./pages/AdminTables/AdminTablesPage";
import { AdminPromocodesPage } from "./pages/AdminPromocodes/AdminPromocodesPage";
import { AdminProductsPage } from "./pages/AdminProducts/AdminProductsPage";
import { AdminStoragePage } from "./pages/AdminStorage/AdminStoragePage";
import { AdminBookingsPage } from "./pages/AdminBookings/AdminBookingsPage";
import { AdminMenuPage } from "./pages/AdminMenu/AdminMenuPage";
import { AdminOrdersPage } from "./pages/AdminOrders/AdminOrdersPage";
import { AdminDeliveriesPage } from "./pages/AdminDeliveries/AdminDeliveriesPage";

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <MenuPage />
    },
    {
        path: '/login',
        element: <LoginPage />
    },
    {
        path: '/signup',
        element: <SignupPage />
    },
    {
        path: '/forgot',
        element: <ForgotPage />
    },
    {
        path: '/checkout',
        element: <CheckoutPage />
    },
    {
        path: '/orders',
        element: <OrdersPage />
    },
    {
        path: '/admin',
        element: <AdminWrapper />, 
        children: [
            {
                path: '/admin',
                element: <AdminDashboardPage />
            },
            {
                path: 'users',
                element: <AdminUsersPage />
            },
            {
                path: 'tables',
                element: <AdminTablesPage />
            },
            {
                path: 'promocodes',
                element: <AdminPromocodesPage />
            },
            {
                path: 'products', 
                element: <AdminProductsPage />
            },
            {
                path: 'storage',
                element: <AdminStoragePage />
            },
            {
                path: 'bookings',
                element: <AdminBookingsPage />
            },
            {
                path: 'menu',
                element: <AdminMenuPage />
            },
            {
                path: 'orders',
                element: <AdminOrdersPage />
            },
            {
                path: 'deliveries',
                element: <AdminDeliveriesPage />
            }
        ]
    }
]