import { FC, useCallback, useEffect, useState } from "react";
import { Button, Flex, Table, TableContainer, Tbody, Th, Thead, Tr } from "@chakra-ui/react";
import { Table as TableType } from "../../../../types/domain";
import { tablesGet } from "../../../../api/tables/tablesGet";
import { AdminTable } from "../AdminTable/AdminTable";
import { AddAdminTableModal } from "../AddAdminTableModal/AddAdminTableModal";
import { useRestaurantSelector } from "../../../../components/AdminWrapper/components/RestaurantSelector/RestaurantSelectorProvider";

export const AdminTables: FC = () => {
    const { selected } = useRestaurantSelector();
    const [tables, setTables] = useState<TableType[]>([]);

    const getTables = useCallback(() => 
        tablesGet().then(({ data }) => 
            setTables(data.payload.filter(
                ({ restaurant }) => restaurant.id === selected.id
            ))
        ), 
    [selected]);

    useEffect(() => {
        getTables();
    }, [selected]);

    const [openModal, setOpenModal] = useState(false);

    return (
        <TableContainer padding="16px 10%">
            <Flex width="100%" justify="flex-end">
                <Button onClick={() => setOpenModal(true)}>Add table</Button>
            </Flex>
            <Table variant="simple">
                <Thead>
                    <Tr>
                        <Th>ID</Th>
                        <Th>Restaurant</Th>
                        <Th>Capacity</Th>
                        <Th>Actions</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {tables.map((table) => (
                        <AdminTable key={table.id} table={table} onChange={getTables} />
                    ))}
                </Tbody>
            </Table>
            <AddAdminTableModal 
                isOpen={openModal}
                onClose={() => setOpenModal(false)}
                onChange={getTables}
            />
        </TableContainer>
    )
}