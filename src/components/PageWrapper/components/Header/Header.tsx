import { FC } from "react";
import styles from './Header.module.css';
import { Button } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";

export const Header: FC = () => {
    return (
        <div className={styles.container}>
            Horizon
            <Button as={ReactRouterLink} to='/login'>Login</Button>
        </div>
    )
};