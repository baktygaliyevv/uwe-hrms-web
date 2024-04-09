import { GenericOk, Order, OrderItem } from "../../types/domain";
import { apiBase } from "../base";

type Response = GenericOk;

export const ordersIdItemsIdDelete = (orderId: Order['id'], itemId: OrderItem['item']['id']) =>
    apiBase.delete<Response>(`/orders/${orderId}/items/${itemId}`);