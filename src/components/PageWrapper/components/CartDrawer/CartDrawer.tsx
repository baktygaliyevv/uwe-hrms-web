import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Input, InputGroup, InputRightElement, useToast } from "@chakra-ui/react";
import { FC, useCallback, useState } from "react";
import { Link as ReactRouterLink } from "react-router-dom";
import { useCart } from "../../../../stores/CartStore";
import { CartItem } from "../../../CartItem/CartItem";
import { calculateCart } from "../../../../utils/calculateCart";
import styles from './CartDrawer.module.css';

const getDrawerHeader = (totalQuantity: number, sum: number) => {
    if(totalQuantity === 0) return 'Cart is empty';
    if(totalQuantity === 1) return `1 item worth £ ${sum}`;
    return `${totalQuantity} items worth £ ${sum}`;
}

type Props = {
    isOpen: boolean;
    onClose: () => void;
}

export const CartDrawer: FC<Props> = ({ isOpen, onClose }) => {
    const toast = useToast();
    const { cart, promocode, applyPromocode } = useCart();

    const { totalQuantity, subTotalSum, totalSum } = calculateCart(cart, promocode);

    const [promoValue, setPromoValue] = useState(promocode?.id || '');
    const handlePromoValueChange = useCallback((event: any) => setPromoValue(event.target.value), []);
    const handleApplyPromocode = useCallback(() => {
        /*promocodesIdGet({ id: promoValue })
            .then(({ data }) => {
                applyPromocode(data.payload);
                toast({
                    title: `${data.payload.discount}% applied successfully!`,
                    status: 'success',
                    duration: 1000
                });
            })
            .catch(() => {
                toast({
                    title: `Promocode is not valid`,
                    status: 'error',
                    duration: 2000
                }); 
            })*/
        applyPromocode({
            id: 'TEST',
            discount: 20,
            valid_till: ''
        });
        toast({
            title: `${20}% applied successfully!`,
            status: 'success',
            duration: 1000
        });
    }, [promoValue]);

    return (
        <Drawer
            placement="right"
            isOpen={isOpen} 
            onClose={onClose}
        >
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>{getDrawerHeader(totalQuantity, totalSum)}</DrawerHeader>
                <DrawerBody display="flex" flexDir="column" gap="8px">
                    {cart.map(({ item, quantity }) => (
                        <CartItem 
                            key={item.id} 
                            item={item} 
                            quantity={quantity}
                            showActions
                        />
                    ))}
                </DrawerBody>
                <DrawerFooter display='flex' flexDir='column' gap='16px'>
                    <InputGroup size='md'>
                        <Input 
                            variant='flushed' 
                            placeholder="Promocode"
                            color={promocode ? 'green.500' : undefined}
                            value={promoValue}
                            onChange={handlePromoValueChange}
                        />
                        <InputRightElement>
                            <Button variant='ghost' size='sm' onClick={handleApplyPromocode}>Apply</Button>
                        </InputRightElement>
                    </InputGroup>
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
                    <Button as={ReactRouterLink} to='/checkout' width='100%' onClick={onClose}>Checkout</Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}