import { FC, PropsWithChildren } from "react";
import styles from './PageWrapper.module.css';
import { Header } from "./components/Header/Header";

type Props = {
    hideHeader?: boolean;
} & PropsWithChildren;

export const PageWrapper: FC<Props> = ({ children, hideHeader }) => {
    return (
        <div className={styles.container}>
            {!hideHeader && <Header />}
            <div className={styles.content}>
                {children}
            </div>
        </div>
    )
}