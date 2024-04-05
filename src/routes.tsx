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
import { AdminPromocodesPage } from "./pages/AdminPromocodes/AdminPromocodesPage";

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
                path: 'promocodes',
                element: <AdminPromocodesPage />
            }
        ]
    }
]