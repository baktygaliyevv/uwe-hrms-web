import { FC, useEffect, useState } from "react";
import { PageWrapper } from "../../components/PageWrapper/PageWrapper";
import { Menu } from "./components/Menu/Menu";
import { Menu as MenuItemType } from "../../types/domain";
import { menuGet } from "../../api/menu/menuGet";
import { Loader } from "../../components/Loader/Loader";

export const MenuPage: FC = () => {
    const [menu, setMenu] = useState<MenuItemType[]>();

    useEffect(() => {
        menuGet().then(({ data }) => setMenu(data.payload));
    }, []);

    return (
        <PageWrapper>
            {menu ? <Menu menu={menu} /> : <Loader />}
        </PageWrapper>
    );
}