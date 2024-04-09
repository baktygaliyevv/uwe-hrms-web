import { GenericOk, Order } from "../../types/domain";
import { apiBase } from "../base";

type Response = GenericOk;

export const ordersIdDelete = (id: Order['id']) => apiBase.delete<Response>(`/orders/${id}`);