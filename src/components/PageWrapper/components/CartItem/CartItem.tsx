import { FC, useCallback } from "react";
import { Button, ButtonGroup, Card, CardBody, Divider, IconButton, Text } from '@chakra-ui/react';
import { Menu as MenuItemType } from '../../../../types/domain';
import styles from './CartItem.module.css';
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { useCart } from "../../../../stores/CartStore";

type Props = {
    item: MenuItemType;
    quantity: number;
}

export const CartItem: FC<Props> = ({ item, quantity }) => {
    const { add, remove } = useCart();

    const handleIncrement = useCallback(() => add(item), [item]);
    const handleDecrement = useCallback(() => remove(item), [item]);

    return (
        <Card>
            <CardBody>
                <Text fontWeight='bold'>{item.name}</Text>
                <Text mb='6px'>{item.category.name}</Text>
                <Divider />
                <div className={styles.actions}>
                    <Text fontWeight='bold'>£ {item.price}</Text>
                    <ButtonGroup size='sm' isAttached>
                        <IconButton 
                            aria-label='Increment' 
                            onClick={handleIncrement} 
                            icon={<AddIcon />} 
                        />
                        <Button isDisabled>{quantity || 'Select'}</Button>
                        <IconButton 
                            aria-label='Decrement' 
                            onClick={handleDecrement} 
                            icon={<MinusIcon />} 
                        />
                    </ButtonGroup>
                </div>
            </CardBody>
        </Card>
    );
}