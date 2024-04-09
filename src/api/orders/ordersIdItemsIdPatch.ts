import { GenericOk, Order, OrderItem, OrderItemPatch } from "../../types/domain";
import { apiBase } from "../base";

type Response = GenericOk & { payload: OrderItem };

export const ordersIdItemsIdPatch = (orderId: Order['id'], itemId: OrderItem['item']['id'], payload: OrderItemPatch) =>
    apiBase.patch<Response>(`/orders/${orderId}/items/${itemId}`, payload);