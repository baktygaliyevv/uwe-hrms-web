import { FC, useEffect, useState } from "react";
import { Delivery, Menu, OrderItem, Promocode, User } from "../../../../types/domain";
import { 
    Button, ButtonGroup, IconButton, Input, Modal, ModalBody, ModalCloseButton, ModalContent, 
    ModalFooter, ModalHeader, ModalOverlay, Select, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useToast 
} from "@chakra-ui/react";
import { diffObjects } from "../../../../utils/diffObjects";
import { useRestaurantSelector } from "../../../../components/AdminWrapper/components/RestaurantSelector/RestaurantSelectorProvider";
import dayjs from "dayjs";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { deliveriesIdPatch } from "../../../../api/deliveries/deliveriesIdPatch";
import { deliveriesPost } from "../../../../api/deliveries/deliveriesPost";
import { deliveriesIdItemsPost } from "../../../../api/deliveries/deliveriesIdItemsPost";
import { deliveriesIdItemsIdPatch } from "../../../../api/deliveries/deliveriesIdItemsIdPatch";
import { deliveriesIdItemsIdDelete } from "../../../../api/deliveries/deliveriesIdItemsIdDelete";

type Props = {
    delivery?: Delivery;
    users: User[];
    promocodes: Promocode[];
    menu: Menu[];
    isOpen: boolean;
    onClose: () => void;
    onChange: () => void;
}

export const AddEditAdminDeliveryModal: FC<Props> = ({ delivery, users, promocodes, menu, isOpen, onClose, onChange }) => {
    const toast = useToast();
    const { selected } = useRestaurantSelector();

    const [userId, setUserId] = useState(0);
    const [promocode, setPromocode] = useState("null");
    const [address, setAddress] = useState('');
    const [items, setItems] = useState<OrderItem[]>([]);

    useEffect(() => {
        if(delivery) {
            setUserId(delivery.user.id);
            setPromocode(delivery.promocode?.id || "null");
            setAddress(delivery.address);
            setItems(delivery.items);
        } else if(users.length) {
            setUserId(users[0].id);
        }
    }, [delivery, users]);

    const handleSubmit = () => {
        if(delivery) {
            const comparison = diffObjects({
                user_id: userId,
                promocode_id: promocode,
                status
            }, {
                user_id: delivery.user.id,
                promocode_id: delivery.promocode?.id
            });

            if(Object.entries(comparison).length) {
                return deliveriesIdPatch(delivery.id, comparison)
                    .then(() => {
                        toast({
                            title: 'Success!',
                            status: 'success',
                            duration: 1000
                        });
                        onChange();
                        onClose();
                    }).catch(() => {
                        toast({
                            title: 'Error',
                            status: 'error',
                            duration: 2000
                        });
                        onClose();
                    });
            }
        }

        return deliveriesPost({
            restaurant_id: selected.id,
            user_id: userId,
            promocode_id: promocode !== 'null' ? promocode : null,
            address,
            items: items.map(({ item, quantity }) => ({ item_id: item.id, quantity }))
        }).then(() => {
            toast({
                title: 'Success!',
                status: 'success',
                duration: 1000
            });
            onChange();
            onClose();
        }).catch(() => {
            toast({
                title: 'Error',
                status: 'error',
                duration: 2000
            });
            onClose();
        });
    };

    const [newItem, setNewItem] = useState(menu[0]?.id);

    useEffect(() => {
        if(menu) {
            setNewItem(menu[0]?.id);
        }
    }, [menu]);

    const handleAdd = () => {
        const f = () => 
            setItems((items) => ([
                ...items,
                { item: menu.find(({ id }) => id === newItem)!, quantity: 1 }
            ]));

        if(delivery) {
            return deliveriesIdItemsPost(delivery.id, { item_id: newItem, quantity: 1 }).then(f);
        }

        return f();
    };

    const handleIncrement = (itemId: number) => {
        const q = items.find(({ item }) => item.id === itemId)?.quantity;

        setItems((items) => {
            items[items.findIndex(({ item }) => item.id === itemId)].quantity++;
            return [...items];
        });

        if(delivery && q) {
            deliveriesIdItemsIdPatch(delivery.id, itemId, { quantity: q + 1 });
        }
    };

    const handleDecrement = (itemId: number) => {
        const q = items.find(({ item }) => item.id === itemId)?.quantity;

        setItems((items) => {
            if(q === 1) return items.filter(({ item }) => item.id !== itemId);

            items[items.findIndex(({ item }) => item.id === itemId)].quantity--;
            return [...items];
        });

        if(delivery && q) {
            if(q === 1) return deliveriesIdItemsIdDelete(delivery.id, itemId);
            return deliveriesIdItemsIdPatch(delivery.id, itemId, { quantity: q - 1 });
        }
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalCloseButton />
                <ModalHeader>{delivery ? `Edit delivery #${delivery.id}` : 'Add delivery'}</ModalHeader>
                <ModalBody>
                    <Text mb="8px">Client:</Text>
                    <Select 
                        mb="16px"
                        value={userId} 
                        onChange={({ target }) => setUserId(parseInt(target.value))}
                    >
                        {users
                            .filter(({ role }) => role === 'client')
                            .map(({ id, first_name, last_name }) => 
                                <option key={id} value={id}>{first_name} {last_name}</option>
                            )
                        }
                    </Select>
                    <Text mb="8px">Promocode:</Text>
                    <Select 
                        mb="16px"
                        value={promocode} 
                        onChange={({ target }) => setPromocode(target.value)}
                    >
                        <option value="null">None</option>
                        {promocodes
                            .map(({ id, discount, valid_till }) => 
                                <option key={id} value={id}>{id}, {discount}% off until {dayjs(valid_till).format('DD.MM.YYYY')}</option>
                            )
                        }
                    </Select>
                    <Text mb="8px">Address:</Text>
                    <Input 
                        mb="16px"
                        value={address} 
                        onChange={({ target }) => setAddress(target.value)}
                    />
                    <Text mb="8px">Items:</Text>
                    <TableContainer>
                        <Table variant="simple">
                            <Thead>
                                <Tr>
                                    <Th>Item</Th>
                                    <Th>Quantity</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {items.map(({ item, quantity }) => (
                                    <Tr key={item.id}>
                                        <Td>{item.name}</Td>
                                        <Td>
                                            <ButtonGroup isAttached>
                                                {Boolean(quantity) && (
                                                    <IconButton 
                                                        aria-label="Increment"
                                                        onClick={() => handleIncrement(item.id)}
                                                        icon={<AddIcon />}
                                                    />
                                                )}
                                                <Button>{quantity}</Button>
                                                {Boolean(quantity) && (
                                                    <IconButton 
                                                        aria-label="Decrement" 
                                                        onClick={() => handleDecrement(item.id)} 
                                                        icon={<MinusIcon />}
                                                    />
                                                )}
                                            </ButtonGroup>
                                        </Td>
                                    </Tr>
                                ))}
                                <Tr>
                                    <Td>
                                        <Select
                                            value={newItem}
                                            onChange={({ target }) => setNewItem(parseInt(target.value))}
                                        >
                                            {menu.map(({ id, name }) => <option key={id} value={id}>{name}</option>)}
                                        </Select>
                                    </Td>
                                    <Td>
                                        <IconButton 
                                            aria-label="Add" 
                                            onClick={handleAdd} 
                                            icon={<AddIcon />}
                                        />
                                    </Td>
                                </Tr>
                            </Tbody>
                        </Table>
                    </TableContainer>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={handleSubmit}>Save</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}