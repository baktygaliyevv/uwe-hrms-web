import { GenericOk, Order, OrderPatch } from "../../types/domain";
import { apiBase } from "../base";

type Response = GenericOk & { payload: Order };

export const ordersIdPatch = (id: Order['id'], payload: OrderPatch) => 
    apiBase.patch<Response>(`/orders/${id}`, payload);