import { FC, useCallback, useEffect, useState } from "react";
import { Button, Flex, Table, TableContainer, Tbody, Th, Thead, Tr } from "@chakra-ui/react";
import { Menu, Order, Promocode, Table as TableType, User } from "../../../../types/domain";
import { usersGet } from "../../../../api/users/usersGet";
import { ordersGet } from "../../../../api/orders/ordersGet";
import { AdminOrder } from "../AdminOrder/AdminOrder";
import { useRestaurantSelector } from "../../../../components/AdminWrapper/components/RestaurantSelector/RestaurantSelectorProvider";
import { AddEditAdminOrderModal } from "../AddEditAdminOrderModal/AddEditAdminOrderModal";
import { tablesGet } from "../../../../api/tables/tablesGet";
import { promocodesGet } from "../../../../api/promocodes/promocodesGet";
import { menuGet } from "../../../../api/menu/menuGet";

export const AdminOrders: FC = () => {
    const { selected } = useRestaurantSelector();
    const [orders, setOrders] = useState<Order[]>([]);
    const [tables, setTables] = useState<TableType[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [promocodes, setPromocodes] = useState<Promocode[]>([]);
    const [menu, setMenu] = useState<Menu[]>([]);

    const getOrders = useCallback(() => 
        ordersGet().then(({ data }) => setOrders(data.payload)), 
    []);

    useEffect(() => {
        getOrders();
        tablesGet().then(({ data }) => setTables(data.payload));
        usersGet().then(({ data }) => setUsers(data.payload));
        promocodesGet().then(({ data }) => setPromocodes(data.payload));
        menuGet().then(({ data }) => setMenu(data.payload));
    }, []);

    const [openModal, setOpenModal] = useState(false);

    return (
        <TableContainer padding="16px 10%">
            <Flex width="100%" justify="flex-end">
                <Button onClick={() => setOpenModal(true)}>Add order</Button>
            </Flex>
            <Table variant="simple">
                <Thead>
                    <Tr>
                        <Th>ID</Th>
                        <Th>Table</Th>
                        <Th>Client</Th>
                        <Th>Promocode</Th>
                        <Th>Items</Th>
                        <Th>Created at</Th>
                        <Th>Completed at</Th>
                        <Th>Actions</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {orders.filter(({ table }) => table.restaurant.id === selected.id).map((order) => (
                        <AdminOrder 
                            key={order.id} 
                            order={order} 
                            onChange={getOrders}
                            tables={tables}
                            users={users}
                            promocodes={promocodes}
                            menu={menu}
                        />
                    ))}
                </Tbody>
            </Table>
            <AddEditAdminOrderModal 
                isOpen={openModal}
                onClose={() => setOpenModal(false)}
                onChange={getOrders}
                tables={tables}
                users={users}
                promocodes={promocodes}
                menu={menu}
            />
        </TableContainer>
    )
}