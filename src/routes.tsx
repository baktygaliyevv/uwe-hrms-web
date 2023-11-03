import { RouteObject } from "react-router-dom";
import { LoginPage } from "./pages/Login/LoginPage";

export const routes: RouteObject[] = [
    {
        path: '/login',
        element: <LoginPage />
    }
]