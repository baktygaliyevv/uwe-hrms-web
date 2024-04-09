import { GenericOk, Order, OrderPost } from "../../types/domain";
import { apiBase } from "../base";

type Response = GenericOk & { payload: Order };

export const ordersPost = (payload: OrderPost) => apiBase.post<Response>('/orders', payload);