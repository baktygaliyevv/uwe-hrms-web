import { FC, useCallback } from "react";
import styles from './AdminHeader.module.css';
import { Button, Select, useToast } from "@chakra-ui/react";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import { useOwnUser } from "../../../../stores/OwnUserStore";
import { authDelete } from "../../../../api/auth/authDelete";
import { useRestaurantSelector } from "../RestaurantSelector/RestaurantSelectorProvider";

export const AdminHeader: FC = () => {
    const toast = useToast();
    const navigateTo = useNavigate();
    const { setOwn } = useOwnUser();
    const { restaurants, selected, setSelected } = useRestaurantSelector();

    const handleLogout = useCallback(() => {
        authDelete()
            .then(() => {
                toast({
                    title: 'Logout successful',
                    status: 'success',
                    duration: 1000
                });
                setOwn(null);
                navigateTo('/login');
            })
            .catch(() => toast({
                title: 'Error logging out :(',
                status: 'error',
                duration: 2000
            }));
    }, []);

    return (
        <div className={styles.container}>
            Horizon Admin
            <div className={styles.actions}>
                <Select value={selected.id} onChange={({ target }) => setSelected(parseInt(target.value))}>
                    {restaurants.map(({id, city }) => <option key={id} value={id}>{city}</option>)}
                </Select>
                <Button style={{ flexShrink: '0' }} as={ReactRouterLink} to="/admin">Dashbord</Button>
                <Button style={{ flexShrink: '0' }} onClick={handleLogout}>Logout</Button>           
            </div>
        </div>
    )
};