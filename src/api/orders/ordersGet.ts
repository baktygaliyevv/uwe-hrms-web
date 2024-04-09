import { GenericOk, Order } from "../../types/domain";
import { apiBase } from "../base";

type Response = GenericOk & { payload: Order[] };

export const ordersGet = () => apiBase.get<Response>('/orders');