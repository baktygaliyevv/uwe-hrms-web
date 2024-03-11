import { RouteObject } from "react-router-dom";
import { LoginPage } from "./pages/Login/LoginPage";
import { MenuPage } from "./pages/Menu/MenuPage";
import { ForgotPage } from "./pages/Forgot/ForgotPage";
import { SignupPage } from "./pages/Signup/SignupPage";

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
    }
]