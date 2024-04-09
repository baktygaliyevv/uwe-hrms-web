import { FC } from "react";
import dayjs from 'dayjs';
import { OrderGeneric } from "../../../../types/domain";
import { calculateCart } from "../../../../utils/calculateCart";
import { Card, CardBody, CardFooter, CardHeader, Heading, ListItem, OrderedList, Stack, Tag } from "@chakra-ui/react";
import styles from './OrdersList.module.css';

type Props = { orders: OrderGeneric[] };

export const OrdersList: FC<Props> = ({ orders }) => {
    return (
        <>
            {orders.map(({ id, table, promocode, created_at, complete_at, items }) => {
                const { subTotalSum, totalSum } = calculateCart(items, promocode);

                return (
                    <Card key={id}>
                        <CardHeader>
                            <Stack direction="row" alignItems="center" justifyContent="space-between">
                                <Heading size="xs">Order #{id} at table {table.id}, {table.restaurant.city} ({dayjs(created_at).format('DD.MM.YYYY HH:mm')})</Heading>
                                <Tag colorScheme={complete_at ? "green" : "yellow"}>
                                    {complete_at ? 'Complete' : 'In progress'}
                                </Tag>
                            </Stack>
                        </CardHeader>
                        <CardBody>
                            <OrderedList>
                                {items.map(({ item, quantity }) => (
                                    <ListItem key={id}>{quantity > 1 && `x${quantity}`} {item.name} - £{item.price * quantity}</ListItem>
                                ))}
                            </OrderedList>
                        </CardBody>
                        <CardFooter display="flex" flexDirection="column">
                            {promocode && (
                                <>
                                    <div className={styles.semiBoldLine}>
                                        <span>Subtotal</span>
                                        <span>£ {subTotalSum}</span>
                                    </div>
                                    <div className={styles.semiBoldLine}>
                                        <span>{promocode.id} applied</span>
                                        <span>-{promocode.discount}%</span>
                                    </div>
                                </>
                            )}
                            <div className={styles.boldLine}>
                                <span>Total</span>
                                <span>£ {totalSum}</span>
                            </div>
                        </CardFooter>
                    </Card>
                )
            })}
        </>
    );
}