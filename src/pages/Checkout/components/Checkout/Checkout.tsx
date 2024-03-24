import { Button, Center, Heading, Input, Radio, RadioGroup, Select, Stack } from "@chakra-ui/react";
import { FC, useCallback, useState } from "react";
import { Link as ReactRouterLink } from "react-router-dom";
import { useOwnUser } from "../../../../stores/OwnUserStore";
import styles from './Checkout.module.css';
import { useCart } from "../../../../stores/CartStore";
import { CartItem } from "../../../../components/CartItem/CartItem";
import { calculateCart } from "../../../../utils/calculateCart";

export const Checkout: FC = () => {
    const { own } = useOwnUser();
    const { cart, promocode } = useCart();

    const { subTotalSum, totalSum } = calculateCart(cart, promocode);
    
    const [orderType, setOrderType] = useState('order');
    const [billingType, setBillingType] = useState('new');

    return (
        <Center padding='16px'>
            <div className={styles.container}>
                <Heading size='lg' mb='24px'>Secure checkout</Heading>
                <div className={styles.inner}>
                    <div>
                        {!own && (
                            <>
                                <Heading size='md' mb='8px'>New to Horizon?</Heading>
                                <Button as={ReactRouterLink} to='/login' mb='8px'>I'm a returning customer</Button>
                                <Stack direction='row' mb='8px'>
                                    <Input placeholder="First name" />
                                    <Input placeholder="Last name" />
                                </Stack>
                                <Input type='email' placeholder="Email" mb='24px' />
                            </>
                        )}
                        <RadioGroup value={orderType} onChange={setOrderType} mb='8px'>
                            <Stack direction='row'>
                                <Radio value='order'>Eat in</Radio>
                                <Radio value='delivery'>Delivery</Radio>
                            </Stack>
                        </RadioGroup>
                        {orderType === 'order' ? (
                            <Stack direction='row' mb='24px'>
                                <Select placeholder="Restautant">
                                    <option value='test'>Test</option>
                                    <option value='test2'>Test 2</option>
                                    <option value='test3'>Test 3</option>
                                </Select>
                                <Select placeholder="Table">
                                    <option value='test'>Test</option>
                                    <option value='test2'>Test 2</option>
                                    <option value='test3'>Test 3</option>
                                </Select>
                            </Stack>
                        ) : (
                            <>
                                <Input placeholder="Address" mb="8px"/>
                                <Stack direction="row" mb="24px">
                                    <Input placeholder="City" />
                                    <Input placeholder="Postcode" />
                                </Stack>
                            </>
                        )}
                        <div className={styles.cart}>
                            {cart.map(({ item, quantity }) => (
                                <CartItem 
                                    key={item.id} 
                                    item={item} 
                                    quantity={quantity} 
                                />
                            ))}
                        </div>
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
                    </div>
                    <div>
                        <Heading size='md' mb='8px'>Payment details</Heading>
                        <Input placeholder="Card number" mb="8px"/>
                        <Stack direction='row' mb="16px">
                            <Input placeholder="MM" />
                            <Input placeholder="YY" />
                            <Input placeholder="CVV" />
                        </Stack>
                        <Heading size="sm" mb="8px">Billing address</Heading>
                        <RadioGroup value={billingType} onChange={setBillingType} mb='8px'>
                            <Stack direction='row'>
                                <Radio value='new'>Different</Radio>
                                <Radio value='same'>Same as delivery</Radio>
                            </Stack>
                        </RadioGroup>
                        {billingType === 'new' && (
                            <>
                                <Input placeholder="Address" mb="8px"/>
                                <Stack direction="row" mb="24px">
                                    <Input placeholder="City" />
                                    <Input placeholder="Postcode" />
                                </Stack>
                            </>
                        )}
                        <Button width="100%">Place an order</Button>
                    </div>
                </div>
            </div>
        </Center>
    )
}