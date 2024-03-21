import { FC, useCallback, useState } from "react";
import { MenuItem } from "../MenuItem/MenuItem";
import { Menu as MenuItemType } from '../../../../types/domain';
import styles from './Menu.module.css';
import { MenuItemModal } from "../MenuItemModal/MenuItemModal";

export const Menu: FC<{ menu: MenuItemType[] }> = ({ menu }) => {
    const [modalMenuItem, setModalMenuItem] = useState<MenuItemType | null>(null);

    const handleModalClose = useCallback(() => setModalMenuItem(null), []);

    return (
        <>
            <div className={styles.container}>
                {menu.map((item) => <MenuItem key={item.id} item={item} onSelect={setModalMenuItem} />)}
            </div>
            <MenuItemModal item={modalMenuItem} onClose={handleModalClose} />
        </>
    )
}