import { Delivery, DeliveryItem, GenericOk } from "../../types/domain";
import { apiBase } from "../base";

type Response = GenericOk;

export const deliveriesIdItemsIdDelete = (deliveryId: Delivery['id'], itemId: DeliveryItem['item']['id']) =>
    apiBase.delete<Response>(`/deliveries/${deliveryId}/items/${itemId}`);