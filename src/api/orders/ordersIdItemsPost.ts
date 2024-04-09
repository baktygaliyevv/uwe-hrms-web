import { GenericOk, Order, OrderItem, OrderItemPost } from "../../types/domain";
import { apiBase } from "../base";

type Response = GenericOk & { payload: OrderItem };

export const ordersIdItemsPost = (orderId: Order['id'], payload: OrderItemPost) =>
    apiBase.post<Response>(`/orders/${orderId}/items`, payload);