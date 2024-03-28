import { GenericOk, Order, OrderClientPost } from "../../types/domain";
import { apiBase } from "../base";

type Response = GenericOk & { payload: Order };

export const ordersClientPost = (payload: OrderClientPost) => apiBase.post<Response>('/orders/client', payload)