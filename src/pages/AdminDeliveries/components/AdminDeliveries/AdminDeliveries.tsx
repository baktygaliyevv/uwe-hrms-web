import { FC, useCallback, useEffect, useState } from "react";
import { Button, Flex, Table, TableContainer, Tbody, Th, Thead, Tr } from "@chakra-ui/react";
import { Delivery, Menu, Promocode, User } from "../../../../types/domain";
import { usersGet } from "../../../../api/users/usersGet";
import { useRestaurantSelector } from "../../../../components/AdminWrapper/components/RestaurantSelector/RestaurantSelectorProvider";
import { promocodesGet } from "../../../../api/promocodes/promocodesGet";
import { menuGet } from "../../../../api/menu/menuGet";
import { deliveriesGet } from "../../../../api/deliveries/deliveriesGet";
import { AdminDelivery } from "../AdminDelivery/AdminDelivery";
import { AddEditAdminDeliveryModal } from "../AddEditAdminDeliveryModal/AddEditAdminDeliveryModal";

export const AdminDeliveries: FC = () => {
    const { selected } = useRestaurantSelector();
    const [deliveries, setDeliveries] = useState<Delivery[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [promocodes, setPromocodes] = useState<Promocode[]>([]);
    const [menu, setMenu] = useState<Menu[]>([]);

    const getDeliveries = useCallback(() => 
        deliveriesGet().then(({ data }) => setDeliveries(data.payload)),
    []);

    useEffect(() => {
        getDeliveries();
        usersGet().then(({ data }) => setUsers(data.payload));
        promocodesGet().then(({ data }) => setPromocodes(data.payload));
        menuGet().then(({ data }) => setMenu(data.payload));
    }, []);

    const [openModal, setOpenModal] = useState(false);

    return (
        <TableContainer padding="16px 10%">
            <Flex width="100%" justify="flex-end">
                <Button onClick={() => setOpenModal(true)}>Add delivery</Button>
            </Flex>
            <Table variant="simple">
                <Thead>
                    <Tr>
                        <Th>ID</Th>
                        <Th>Client</Th>
                        <Th>Promocode</Th>
                        <Th>Address</Th>
                        <Th>Items</Th>
                        <Th>Created at</Th>
                        <Th>Status</Th>
                        <Th>Actions</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {deliveries.filter(({ restaurant }) => restaurant.id === selected.id).map((delivery) => (
                        <AdminDelivery 
                            key={delivery.id} 
                            delivery={delivery} 
                            onChange={getDeliveries}
                            users={users}
                            promocodes={promocodes}
                            menu={menu}
                        />
                    ))}
                </Tbody>
            </Table>
            <AddEditAdminDeliveryModal 
                isOpen={openModal}
                onClose={() => setOpenModal(false)}
                onChange={getDeliveries}
                users={users}
                promocodes={promocodes}
                menu={menu}
            />
        </TableContainer>
    )
}