import { FC, useCallback } from "react";
import { Menu as MenuItemType, Product } from '../../../../types/domain';
import { Button, Card, CardBody, CardFooter, CardHeader, Heading, Text } from "@chakra-ui/react";
import styles from './MenuItem.module.css';
import { getAllergyType } from "../../../../utils/getAllergyType";

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
    const handleSelect = useCallback(() => onSelect(item), [item]);

    return (
        <Card onClick={handleSelect}>
            <CardBody>
                <div className={styles.flexbetween}>
                    <Heading size="sm">{item.name}</Heading>
                    <div className={styles.markers}>
                        {getAllergyType(item.products).map((v) => {
                            const style = MARKER_COLORS[v];

                            return (
                                <div className={styles.marker} style={style}>{v}</div>
                            )
                        })}
                    </div>
                </div>
                {item.products.map(({ name }) => name).join(', ')}
            </CardBody>
            <CardFooter>
                <div className={styles.flexbetween}>
                    <Text fontWeight="bold">£ {item.price}</Text>
                    <Button>Select</Button>
                </div>
            </CardFooter>
        </Card>
    )
}