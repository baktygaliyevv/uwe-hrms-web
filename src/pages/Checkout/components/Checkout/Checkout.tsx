import { Button, Center, Heading, Input, Radio, RadioGroup, Select, Stack, useToast } from "@chakra-ui/react";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import { useOwnUser } from "../../../../stores/OwnUserStore";
import styles from './Checkout.module.css';
import { useCart } from "../../../../stores/CartStore";
import { CartItem } from "../../../../components/CartItem/CartItem";
import { calculateCart } from "../../../../utils/calculateCart";
import { Restaurant, Table } from "../../../../types/domain";
import { restaurantsGet } from "../../../../api/restaurants/restaurantsGet";
import { tablesGet } from "../../../../api/tables/tablesGet";
import { ordersClientPost } from "../../../../api/orders/ordersClientPost";
import { deliveriesClientPost } from "../../../../api/deliveries/deliveriesClientPost";

type Props = {
    presetTable?: number;
}

export const Checkout: FC<Props> = ({ presetTable }) => {
    const toast = useToast();
    const navigate = useNavigate();
    const { own } = useOwnUser();
    const { cart, promocode } = useCart();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');

    // FIXME typings
    const handleFirstNameChange = useCallback(({ target }: any) => setFirstName(target.value), []);
    const handleLastNameChange = useCallback(({ target }: any) => setLastName(target.value), []);
    const handleEmailChange = useCallback(({ target }: any) => setEmail(target.value), []);

    const [restaurants, setRestaurants] = useState<Restaurant[]>();
    const [selectedRestaurant, setSelectedRestaurant] = useState<number>();
    const [tables, setTables] = useState<Table[]>();
    const [selectedTable, setSelectedTable] = useState<number>();

    console.log(selectedRestaurant, selectedTable);

    const curatedTables = useMemo(() => 
        tables?.filter((table) => table.restaurant.id === selectedRestaurant), 
    [tables, selectedRestaurant]);

    useEffect(() => {
        restaurantsGet().then(({ data }) => setRestaurants(data.payload));
        tablesGet().then(({ data }) => setTables(data.payload));
    }, []);

    useEffect(() => {
        if(presetTable && tables) {
            console.log(presetTable, tables);
            setSelectedRestaurant(tables.find(({ id }) => id === presetTable)?.restaurant.id);
            setSelectedTable(presetTable);
        }
    }, [presetTable, tables]);

    // FIXME typings
    const handleRestaurantSelect = useCallback(({ target }: any) => setSelectedRestaurant(parseInt(target.value)), []);
    const handleTableSelect = useCallback(({ target }: any) => setSelectedTable(parseInt(target.value)), []);

    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [postcode, setPostcode] = useState('');

    // FIXME typings
    const handleStreetChange = useCallback(({ target }: any) => setStreet(target.value), []);
    const handleCityChange = useCallback(({ target }: any) => setCity(target.value), []);
    const handlePostcodeChange = useCallback(({ target }: any) => setPostcode(target.value), []);

    const { subTotalSum, totalSum } = calculateCart(cart, promocode);
    
    const [orderType, setOrderType] = useState('order');
    const [billingType, setBillingType] = useState('new');

    const handleSubmit = () => {
        const items = cart.map(({ item, quantity }) => ({ item_id: item.id, quantity }));
        const newClientData = {
            first_name: firstName,
            last_name: lastName, 
            email
        };

        (orderType === 'order' ? 
            ordersClientPost({
                table_id: selectedTable!, // FIXME add emptiness check
                promocode_id: promocode?.id,
                items,
                ...(!own ? newClientData : {})
            }) : 
            deliveriesClientPost({
                restaurant_id: selectedRestaurant!,
                promocode_id: promocode?.id,
                address: `${street}, ${city} ${postcode}`,
                items,
                ...(!own ? newClientData : {})
            })
        ).then(({ data }) => {
            toast({
                title: `Order #${data.payload.id} is heading down to the kitchen!`,
                status: 'success',
                duration: 1000
            });
            navigate('/orders');
        }).catch(() => {
            toast({
                title: 'Error creating your order:(',
                status: 'error',
                duration: 2000
            });
        });
    };

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
                                    <Input placeholder="First name" value={firstName} onChange={handleFirstNameChange} />
                                    <Input placeholder="Last name" value={lastName} onChange={handleLastNameChange} />
                                </Stack>
                                <Input type='email' placeholder="Email" mb='24px' value={email} onChange={handleEmailChange} />
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
                                <Select 
                                    placeholder="Restaurant" 
                                    value={selectedRestaurant} 
                                    onChange={handleRestaurantSelect}
                                    isDisabled={!!presetTable}
                                >
                                    {restaurants?.map(({ id, city }) => <option value={id} key={id}>{city}</option>)}
                                </Select>
                                <Select 
                                    placeholder="Table" 
                                    value={selectedTable}
                                    onChange={handleTableSelect} 
                                    isDisabled={!selectedRestaurant || !!presetTable}
                                >
                                    {curatedTables?.map(({ id, capacity }) => <option value={id} key={id}>{id} ({capacity} seats)</option>)}
                                </Select>
                            </Stack>
                        ) : (
                            <>
                                <Input placeholder="Address" mb="8px" value={street} onChange={handleStreetChange} />
                                <Stack direction="row" mb="24px">
                                    <Input placeholder="City" value={city} onChange={handleCityChange} />
                                    <Input placeholder="Postcode" value={postcode} onChange={handlePostcodeChange} />
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
                        <Button width="100%" onClick={handleSubmit}>Place an order</Button>
                    </div>
                </div>
            </div>
        </Center>
    )
}