import { FC, useCallback, useMemo } from "react";
import { Menu as MenuItemType } from '../../../../types/domain';
import { Button, Card, CardBody, CardFooter, Heading, Text } from "@chakra-ui/react";
import styles from './MenuItem.module.css';
import { getAllergyType } from "../../../../utils/getAllergyType";
import { useCart } from "../../../../stores/CartStore";
import { AddIcon, MinusIcon } from '@chakra-ui/icons';

// V VE GF
// <span>{item.products.every(({ vegan }) => vegan) && 'Vegan'}</span>

const MARKER_COLORS = {
    'V': {
        color: 'white',
        background: '#1d5113'
    },
    'VE': {
        color: 'white',
        background: '#5c8326'
    },
    'GF': {
        color: 'black',
        background: '#f9f3b2'
    }
};

type Props = { 
    item: MenuItemType;
    onSelect: (item: MenuItemType) => void;
};

export const MenuItem: FC<Props> = ({ item, onSelect }) => {
    const { cart, add, remove } = useCart();

    const quantity = cart.find(({ item: i }) => i.id === item.id)?.quantity || 0;

    const handleSelect = useCallback(() => onSelect(item), [item]);
    const handleIncrement = useCallback((e: any) => { // FIXME typings
        e.stopPropagation();
        add(item);
    }, [item]);
    const handleDecrement = useCallback((e: any) => { // FIXME typings
        e.stopPropagation();
        remove(item);
    }, [item]);

    return (
        <Card onClick={handleSelect}>
            <CardBody>
                <div className={styles.flexbetween}>
                    <Heading size="sm">{item.name}</Heading>
                    <div className={styles.markers}>
                        {getAllergyType(item.products).map((v) => {
                            const style = MARKER_COLORS[v];

                            return (
                                <div key={v} className={styles.marker} style={style}>{v}</div>
                            )
                        })}
                    </div>
                </div>
                {item.products.map(({ name }) => name).join(', ')}
            </CardBody>
            <CardFooter>
                <div className={styles.flexbetween}>
                    <Text fontWeight="bold">£ {item.price}</Text>
                    <div>
                        {Boolean(quantity) && <Button onClick={handleIncrement}><AddIcon /></Button>}
                        <Button>{quantity || 'Select'}</Button>
                        {Boolean(quantity) && <Button onClick={handleDecrement}><MinusIcon /></Button>}
                    </div>
                </div>
            </CardFooter>
        </Card>
    )
}