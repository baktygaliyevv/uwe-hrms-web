import { FC, useCallback, useState } from "react";
import styles from './Header.module.css';
import { Button, IconButton, useToast } from "@chakra-ui/react";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import { useOwnUser } from "../../../../stores/OwnUserStore";
import { authDelete } from "../../../../api/auth/authDelete";
import { CartIcon } from "../../../../icons";
import { CartDrawer } from "../CartDrawer/CartDrawer";

export const Header: FC = () => {
    const toast = useToast();
    const navigateTo = useNavigate();
    const { own, setOwn } = useOwnUser();
    const [cartOpen, setCartOpen] = useState(false);

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

    const handleCartToggle = useCallback(() => setCartOpen(o => !o), []);

    return (
        <>
            <div className={styles.container}>
                Horizon
                <div className={styles.actions}>
                    {own && own.role !== 'client' && <Button as={ReactRouterLink} to='/admin'>Manage</Button>}
                    {own ? (
                        <Button onClick={handleLogout}>Logout</Button>
                    ) : (
                        <Button as={ReactRouterLink} to='/login'>Login</Button>
                    )}
                    <IconButton 
                        aria-label="Cart" 
                        onClick={handleCartToggle} 
                        icon={<CartIcon />}
                    />             
                </div>
            </div>
            <CartDrawer isOpen={cartOpen} onClose={handleCartToggle} />
        </>
    )
};