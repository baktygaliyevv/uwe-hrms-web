import { FC } from "react";
import { MenuCategory } from "../../../../types/domain";
import { Td, Tr } from "@chakra-ui/react";

type Props = {
    category: MenuCategory;
};

export const AdminMenuCategoryRow: FC<Props> = ({ category }) => {
    const { id, name } = category;

    return (
        <Tr>
            <Td>{id}</Td>
            <Td>{name}</Td>
        </Tr>
    )
}