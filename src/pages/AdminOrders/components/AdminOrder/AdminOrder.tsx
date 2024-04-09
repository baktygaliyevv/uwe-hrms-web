import { FC, useCallback, useState } from "react";
import { Menu, Order, Promocode, Table, User } from "../../../../types/domain";
import { Button, IconButton, Popover, PopoverArrow, PopoverBody, PopoverContent, PopoverHeader, PopoverTrigger, Stack, Td, Tr, useToast } from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { ordersIdDelete } from "../../../../api/orders/ordersIdDelete";
import dayjs from "dayjs";
import { AddEditAdminOrderModal } from "../AddEditAdminOrderModal/AddEditAdminOrderModal";
import { ordersIdPatch } from "../../../../api/orders/ordersIdPatch";

type Props = {
    order: Order;
    tables: Table[];
    users: User[];
    promocodes: Promocode[];
    menu: Menu[];
    onChange: () => void;
};

export const AdminOrder: FC<Props> = ({ order, tables, users, promocodes, menu, onChange }) => {
    const toast = useToast();
    const { id, table, promocode, created_at, complete_at, items, user } = order;

    const handleDelete = useCallback(() => {
        ordersIdDelete(id).then(() => {
            toast({
                title: 'Order deleted',
                status: 'success',
                duration: 1000
            });
            onChange();
        }).catch(() => {
            toast({
                title: 'Error deleting order',
                status: 'error',
                duration: 2000
            });
        });
    }, [id]);

    const handleComplete = useCallback(() => {
        ordersIdPatch(id, {
            complete_at: dayjs().toISOString()
        }).then(() => onChange());
    }, [id]);

    const [modalOpen, setModalOpen] = useState(false);

    return (
        <Tr>
            <Td>{id}</Td>
            <Td>{table.id}</Td>
            <Td>{user ? `${user.first_name} ${user.last_name}` : 'Guest'}</Td>
            <Td>{promocode?.id || 'None'}</Td>
            <Td>{items.length}</Td>
            <Td>{dayjs(created_at).format('DD.MM.YYYY HH:mm')}</Td>
            <Td>
                {complete_at ? dayjs(complete_at).format('DD.MM.YYYY HH:mm') : (
                    <Button onClick={handleComplete}>Complete</Button>
                )}
            </Td>
            <Td>
                <Stack direction="row">
                    <IconButton
                        aria-label="Edit"
                        icon={<EditIcon />}
                        onClick={() => setModalOpen(true)}
                    />
                    <Popover>
                        <PopoverTrigger>
                            <IconButton
                                aria-label="Delete"
                                icon={<DeleteIcon />}
                            />
                        </PopoverTrigger>
                        <PopoverContent>
                            <PopoverArrow />
                            <PopoverHeader>Are you sure?</PopoverHeader>
                            <PopoverBody>
                                <Button colorScheme="red" width="100%" onClick={handleDelete}>I'm 100% sure</Button>
                            </PopoverBody>
                        </PopoverContent>
                    </Popover>
                    <AddEditAdminOrderModal 
                        isOpen={modalOpen} 
                        onClose={() => setModalOpen(false)}
                        onChange={onChange}
                        order={order}
                        tables={tables}
                        users={users}
                        promocodes={promocodes}
                        menu={menu}
                    />
                </Stack>
            </Td>
        </Tr>
    )
}