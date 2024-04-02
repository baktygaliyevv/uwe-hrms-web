import { GenericOk, OrderGeneric } from "../../types/domain";
import { apiBase } from "../base";

type Response = GenericOk & { payload: OrderGeneric[] };

export const ordersClientGet = () => apiBase.get<Response>('/orders/client');