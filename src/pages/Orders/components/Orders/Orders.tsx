import { FC, useEffect, useState } from "react";
import styles from './Orders.module.css';
import { Heading, Stack } from "@chakra-ui/layout";
import { OrdersList } from "../OrdersList/OrdersList";
import { DeliveriesList } from "../DeliveriesList/DeliveriesList";
import { DeliveryGeneric, OrderGeneric } from "../../../../types/domain";
import { ordersClientGet } from "../../../../api/orders/ordersClientGet";
import { deliveriesClientGet } from "../../../../api/deliveries/deliveriesClientGet";
import { Loader } from "../../../../components/Loader/Loader";

export const Orders: FC = () => {
  const [orders, setOrders] = useState<OrderGeneric[]>();
  const [deliveries, setDeliveries] = useState<DeliveryGeneric[]>();

  useEffect(() => {
    ordersClientGet().then(({ data }) => setOrders(data.payload));
    deliveriesClientGet().then(({ data }) => setDeliveries(data.payload));
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <div>
          <Heading size="md" mb="16px">Orders</Heading>
          <Stack direction="column">
            {orders ? (
              <OrdersList orders={orders} />
            ) : (
              <Loader />
            )}
          </Stack>
        </div>
        <div>
          <Heading size="md" mb="16px">Deliveries</Heading>
          <Stack direction="column">
            {deliveries ? (
              <DeliveriesList deliveries={deliveries} />
            ) : (
              <Loader />
            )}
          </Stack>
        </div>
      </div>
    </div>
  )
};