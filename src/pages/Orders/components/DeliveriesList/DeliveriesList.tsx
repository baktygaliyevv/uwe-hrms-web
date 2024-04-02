import { FC } from "react";
import dayjs from 'dayjs';
import { DeliveryGeneric, DeliveryStatus } from "../../../../types/domain";
import { calculateCart } from "../../../../utils/calculateCart";
import { Card, CardBody, CardFooter, CardHeader, Heading, ListItem, OrderedList, Stack, Tag } from "@chakra-ui/react";
import styles from './DeliveriesList.module.css';

const STATUS_DATA_MAP: Record<DeliveryStatus, { color: string, text: string }> = {
    'new': {
        color: 'cyan',
        text: 'New'
    },
    'delivering': {
        color: 'yellow',
        text: 'In delivery'
    },
    'complete': {
        color: 'green',
        text: 'Complete'
    }
};

type Props = { deliveries: DeliveryGeneric[] };

export const DeliveriesList: FC<Props> = ({ deliveries }) => {
    return (
        <>
            {deliveries.map(({ id, restaurant, promocode, address, created_at, status, items }) => {
                const { subTotalSum, totalSum } = calculateCart(items, promocode);

                return (
                    <Card key={id}>
                        <CardHeader>
                            <Stack direction="row" alignItems="center" justifyContent="space-between">
                                <Heading size="xs">Delivery #{id} to {address} from {restaurant.city} ({dayjs(created_at).format('DD.MM.YYYY HH:mm')})</Heading>
                                <Tag colorScheme={STATUS_DATA_MAP[status].color}>
                                    {STATUS_DATA_MAP[status].text}
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