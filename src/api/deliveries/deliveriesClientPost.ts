import { Delivery, DeliveryClientPost, GenericOk } from "../../types/domain";
import { apiBase } from "../base";

type Response = GenericOk & { payload: Delivery };

export const deliveriesClientPost = (payload: DeliveryClientPost) => apiBase.post<Response>('/deliveries/client', payload)