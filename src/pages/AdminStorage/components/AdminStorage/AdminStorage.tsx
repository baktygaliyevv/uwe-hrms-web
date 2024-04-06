import { FC } from "react";
import { useStorage } from "../../hooks/useStorage";
import { useRestaurantSelector } from "../../../../components/AdminWrapper/components/RestaurantSelector/RestaurantSelectorProvider";
import { Heading, Stack, Table, TableContainer, Tbody, Th, Thead, Tr } from "@chakra-ui/react";
import { AdminStorageRow } from "../AdminStorageRow/AdminStorageRow";

export const AdminStorage: FC = () => {
    const { selected } = useRestaurantSelector();
    const { data, refetch } = useStorage(selected.id);

    return (
        <Stack direction="row" padding="16px 10%">
            <TableContainer>
                <Heading size="md">Storage</Heading>
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
            <TableContainer>
                <Heading size="md">Unavailable </Heading>
            </TableContainer>
        </Stack>
    )
}