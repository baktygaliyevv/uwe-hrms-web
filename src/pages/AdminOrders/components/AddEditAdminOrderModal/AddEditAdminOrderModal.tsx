import { FC, useEffect, useState } from "react";
import { Menu, Order, OrderItem, Promocode, Table as TableType, User } from "../../../../types/domain";
import { 
    Button, ButtonGroup, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, 
    ModalFooter, ModalHeader, ModalOverlay, Select, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useToast 
} from "@chakra-ui/react";
import { diffObjects } from "../../../../utils/diffObjects";
import { useRestaurantSelector } from "../../../../components/AdminWrapper/components/RestaurantSelector/RestaurantSelectorProvider";
import { ordersIdPatch } from "../../../../api/orders/ordersIdPatch";
import { ordersPost } from "../../../../api/orders/ordersPost";
import dayjs from "dayjs";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { ordersIdItemsIdPatch } from "../../../../api/orders/ordersIdItemsIdPatch";
import { ordersIdItemsIdDelete } from "../../../../api/orders/ordersIdItemsIdDelete";
import { ordersIdItemsPost } from "../../../../api/orders/ordersIdItemsPost";

type Props = {
    order?: Order;
    tables: TableType[];
    users: User[];
    promocodes: Promocode[];
    menu: Menu[];
    isOpen: boolean;
    onClose: () => void;
    onChange: () => void;
}

export const AddEditAdminOrderModal: FC<Props> = ({ order, tables, users, promocodes, menu, isOpen, onClose, onChange }) => {
    const toast = useToast();
    const { selected } = useRestaurantSelector();

    const [tableId, setTableId] = useState(tables.filter(({ restaurant }) => restaurant.id === selected.id)[0]?.id);
    const [userId, setUserId] = useState(0);
    const [promocode, setPromocode] = useState("null");
    const [items, setItems] = useState<OrderItem[]>([]);

    useEffect(() => {
        if(order) {
            setTableId(order.table.id);
            setUserId(order.user?.id || 1);
            setPromocode(order.promocode?.id || "null");
            setItems(order.items);
        } else {
            setTableId(tables.filter(({ restaurant }) => restaurant.id === selected.id)[0]?.id);
        }
    }, [order, tables]);

    const handleSubmit = () => {
        if(order) {
            const comparison = diffObjects({
                user_id: userId,
                table_id: tableId,
                promocode_id: promocode !== 'null' ? promocode : null,
            }, {
                user_id: order.user?.id,
                table_id: order.table.id,
                promocode_id: order.promocode?.id
            });

            if(Object.entries(comparison).length) {
                return ordersIdPatch(order.id, comparison)
                    .then(() => {
                        toast({
                            title: 'Success!',
                            status: 'success',
                            duration: 1000
                        });
                        onChange();
                    }).catch(() => 
                        toast({
                            title: 'Error',
                            status: 'error',
                            duration: 2000
                        })
                    ).finally(() => onClose());
            } else onClose();
            return;
        }

        return ordersPost({
            table_id: tableId,
            user_id: userId || null,
            promocode_id: promocode !== 'null' ? promocode : null,
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

        if(order) {
            return ordersIdItemsPost(order.id, { item_id: newItem, quantity: 1 }).then(f);
        }

        return f();
    };

    const handleIncrement = (itemId: number) => {
        const q = items.find(({ item }) => item.id === itemId)?.quantity;

        setItems((items) => {
            items[items.findIndex(({ item }) => item.id === itemId)].quantity++;
            return [...items];
        });

        if(order && q) {
            ordersIdItemsIdPatch(order.id, itemId, { quantity: q + 1 });
        }
    };

    const handleDecrement = (itemId: number) => {
        const q = items.find(({ item }) => item.id === itemId)?.quantity;

        setItems((items) => {
            if(q === 1) return items.filter(({ item }) => item.id !== itemId);

            items[items.findIndex(({ item }) => item.id === itemId)].quantity--;
            return [...items];
        });

        if(order && q) {
            if(q === 1) return ordersIdItemsIdDelete(order.id, itemId);
            return ordersIdItemsIdPatch(order.id, itemId, { quantity: q - 1 });
        }
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalCloseButton />
                <ModalHeader>{order ? `Edit order #${order.id}` : 'Add order'}</ModalHeader>
                <ModalBody>
                    <Text mb="8px">Table at {selected.city}:</Text>
                    <Select 
                        mb="16px"
                        value={tableId} 
                        onChange={({ target }) => setTableId(parseInt(target.value))}
                    >
                        {tables
                            .filter(({ restaurant }) => restaurant.id === selected.id)
                            .map(({ id, capacity }) => 
                                <option key={id} value={id}>{id} ({capacity} persons)</option>
                            )
                        }
                    </Select>
                    <Text mb="8px">Client:</Text>
                    <Select 
                        mb="16px"
                        value={userId} 
                        onChange={({ target }) => setUserId(parseInt(target.value))}
                    >
                        <option value={0}>Guest</option>
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
                                            {menu
                                                .filter((menu) => !items.find(({ item }) => item.id === menu.id))
                                                .map(({ id, name }) => <option key={id} value={id}>{name}</option>)
                                            }
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