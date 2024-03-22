import { Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay } from "@chakra-ui/react";
import { FC } from "react";
import { useCart } from "../../../../stores/CartStore";

type Props = {
    isOpen: boolean;
    onClose: () => void;
}

export const CartDrawer: FC<Props> = ({ isOpen, onClose }) => {
    const { cart, add, remove } = useCart();

    return (
        <Drawer
            placement="right"
            isOpen={isOpen} 
            onClose={onClose}
        >
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>Cart</DrawerHeader>
                <DrawerBody>
                    {cart.map(({ item, quantity }) => ( // TODO
                        <div key={item.id}>{item.id} {item.name} {quantity}</div>
                    ))}
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    );
}