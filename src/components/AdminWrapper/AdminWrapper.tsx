import { FC, useEffect, useState } from "react";
import styles from './AdminWrapper.module.css';
import { AdminHeader } from "./components/AdminHeader/AdminHeader";
import { Outlet, useNavigate } from "react-router-dom";
import { useOwnUser } from "../../stores/OwnUserStore";
import { authGet } from "../../api/auth/authGet";
import { Loader } from "../Loader/Loader";
import { RestaurantSelectorProvider } from "./components/RestaurantSelector/RestaurantSelectorProvider";

export const AdminWrapper: FC = () => {
    const navigateTo = useNavigate();
    const [loading, setLoading] = useState(true);
    const { own, setOwn } = useOwnUser();

    useEffect(() => {
        if(own) {
            if(own.role === 'client') return navigateTo('/');
            return setLoading(false);
        }
        
        authGet()
            .then(({ data }) => {
                setOwn(data.payload);
                if(data.payload.role === 'client') navigateTo('/');
            })
            .catch(() => navigateTo('/login'));
    }, [own]);

    if(loading) {
        return <Loader />;
    }

    return (
        <RestaurantSelectorProvider>
            <div className={styles.container}>
                <AdminHeader />
                <div className={styles.content}>
                    <Outlet />
                </div>
            </div>
        </RestaurantSelectorProvider>
    )
}