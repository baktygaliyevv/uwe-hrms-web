import { FC } from "react";
import { useStorage } from "../../hooks/useStorage";
import { useRestaurantSelector } from "../../../../components/AdminWrapper/components/RestaurantSelector/RestaurantSelectorProvider";
import { Table, TableContainer, Tbody, Th, Thead, Tr } from "@chakra-ui/react";
import { AdminStorageRow } from "../AdminStorageRow/AdminStorageRow";

export const AdminStorage: FC = () => {
    const { selected } = useRestaurantSelector();
    const { data, refetch } = useStorage(selected.id);

    return (
        <TableContainer padding="16px 10%">
            <Table variant="simple">
                <Thead>
                    <Tr>
                        <Th>Product</Th>
                        <Th>Count</Th>
                        <Th>Actions</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {data.map(({ product, count }) => (
                        <AdminStorageRow 
                            product={product}
                            restaurant={selected}
                            count={count}
                            onChange={refetch}
                        />
                    ))}
                </Tbody>
            </Table>
        </TableContainer>
    )
}