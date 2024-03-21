import { Spinner, Text } from "@chakra-ui/react";
import { FC } from "react";
import styles from './Loader.module.css';

export const Loader: FC = () => (
    <div className={styles.container}>
        <Spinner />
        <Text fontSize='sm'>Loading...</Text>
    </div>
)