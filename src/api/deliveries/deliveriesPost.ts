import { Delivery, DeliveryPost, GenericOk } from "../../types/domain";
import { apiBase } from "../base";

type Response = GenericOk & { payload: Delivery };

export const deliveriesPost = (payload: DeliveryPost) => apiBase.post<Response>('/deliveries', payload);