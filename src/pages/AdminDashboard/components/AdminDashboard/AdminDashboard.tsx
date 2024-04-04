import { FC } from "react";
import { ADMIN_SECTIONS } from "./constants";
import { Button } from "@chakra-ui/react";
import { useOwnUser } from "../../../../stores/OwnUserStore";
import { Link as ReactRouterLink } from "react-router-dom";
import styles from './AdminDashboard.module.css';

export const AdminDashboard: FC = () => {
    const { own } = useOwnUser();

    return (
        <div className={styles.container}>
            {ADMIN_SECTIONS.map(({ text, to, allowed }) => (
                <Button
                    key={text}
                    size="lg"
                    as={ReactRouterLink} 
                    to={to}
                    isDisabled={!allowed.includes(own!.role)}
                >{text}</Button>
            ))}
        </div>
    )
}