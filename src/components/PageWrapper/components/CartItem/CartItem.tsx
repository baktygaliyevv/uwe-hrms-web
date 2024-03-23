import { FC } from "react";
import { Card, CardBody, Divider, Text } from '@chakra-ui/react';
import { Menu as MenuItemType } from '../../../../types/domain';
import styles from './CartItem.module.css';

type Props = {
    item: MenuItemType;
    quantity: number;
}

export const CartItem: FC<Props> = ({ item, quantity }) => {
    return (
        <Card>
            <CardBody>
                <Text fontWeight='bold'>{item.name}</Text>
                <Text>{item.category.name}</Text>
                <Divider />
                <div className={styles.actions}>
                    <Text fontWeight='bold'>£ {item.price}</Text>
                    
                </div>
            </CardBody>
        </Card>
    );
}