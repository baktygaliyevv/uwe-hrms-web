import { Delivery, DeliveryItem, DeliveryItemPost, GenericOk } from "../../types/domain";
import { apiBase } from "../base";

type Response = GenericOk & { payload: DeliveryItem };

export const deliveriesIdItemsPost = (orderId: Delivery['id'], payload: DeliveryItemPost) =>
    apiBase.post<Response>(`/deliveries/${orderId}/items`, payload);