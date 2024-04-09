import { FC, useCallback, useState } from "react";
import { Delivery, Menu, Promocode, User } from "../../../../types/domain";
import { Button, IconButton, Popover, PopoverArrow, PopoverBody, PopoverContent, PopoverHeader, PopoverTrigger, Stack, Td, Tr, useToast, Text } from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import dayjs from "dayjs";
import { deliveriesIdDelete } from "../../../../api/deliveries/deliveriesIdDelete";
import { deliveriesIdPatch } from "../../../../api/deliveries/deliveriesIdPatch";
import { AddEditAdminDeliveryModal } from "../AddEditAdminDeliveryModal/AddEditAdminDeliveryModal";

const getButtonText = (status: Delivery['status']) => {
    if(status === 'new') return 'Delivery';
    if(status === 'delivering') return 'Complete';
    return null;
}

const getNextStatus = (status: Delivery['status']): Delivery['status'] => {
    if(status === 'new') return 'delivering';
    if(status === 'delivering') return 'complete';
    return 'new';
}

type Props = {
    delivery: Delivery;
    users: User[];
    promocodes: Promocode[];
    menu: Menu[];
    onChange: () => void;
};

export const AdminDelivery: FC<Props> = ({ delivery, users, promocodes, menu, onChange }) => {
    const toast = useToast();
    const { id, promocode, address, created_at, status, items, user } = delivery;

    const handleDelete = useCallback(() => {
        deliveriesIdDelete(id).then(() => {
            toast({
                title: 'Delivery deleted',
                status: 'success',
                duration: 1000
            });
            onChange();
        }).catch(() => {
            toast({
                title: 'Error deleting delivery',
                status: 'error',
                duration: 2000
            });
        });
    }, [id]);

    const handleStatusChange = useCallback(() => {
        deliveriesIdPatch(id, {
            status: getNextStatus(status)
        }).then(() => onChange());
    }, [id, status]);

    const [modalOpen, setModalOpen] = useState(false);

    return (
        <Tr>
            <Td>{id}</Td>
            <Td>{user.first_name} {user.last_name}</Td>
            <Td>{promocode?.id || 'None'}</Td>
            <Td>{address}</Td>
            <Td>{items.length}</Td>
            <Td>{dayjs(created_at).format('DD.MM.YYYY HH:mm')}</Td>
            <Td>
                <Stack direction="row" alignItems="center">
                    <Text>{status}</Text>
                    {getButtonText(status) && <Button onClick={handleStatusChange}>{getButtonText(status)}</Button>}
                </Stack>
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
                    <AddEditAdminDeliveryModal 
                        isOpen={modalOpen} 
                        onClose={() => setModalOpen(false)}
                        onChange={onChange}
                        delivery={delivery}
                        users={users}
                        promocodes={promocodes}
                        menu={menu}
                    />
                </Stack>
            </Td>
        </Tr>
    )
}