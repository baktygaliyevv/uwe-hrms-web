import { FC } from "react";
import { Product, Restaurant } from "../../../../types/domain";
import { IconButton, Stack, Td, Tr } from "@chakra-ui/react";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { storageIncrementPatch } from "../../../../api/storage/storageIncrementPatch";
import { storageDecrementPatch } from "../../../../api/storage/storageDecrementPatch";

type Props = {
    restaurant: Restaurant;
    product: Product;
    count: number;
    onChange: () => void;
};

export const AdminStorageRow: FC<Props> = ({ restaurant, product, count, onChange }) => {
    const handleIncrement = () =>
        storageIncrementPatch({
            restaurant_id: restaurant.id,
            product_id: product.id
        }).then(() => onChange());

    const handleDecrement = () =>
        storageDecrementPatch({
            restaurant_id: restaurant.id,
            product_id: product.id
        }).then(() => onChange());

    return (
        <Tr>
            <Td>{product.name}</Td>
            <Td>{count}</Td>
            <Td>
                <Stack direction="row">
                    <IconButton
                        aria-label="Increment"
                        icon={<AddIcon />}
                        onClick={handleIncrement}
                    />
                    <IconButton 
                        aria-label="Decrement"
                        icon={<MinusIcon />}
                        onClick={handleDecrement}
                    />
                </Stack>
            </Td>
        </Tr>
    )
}