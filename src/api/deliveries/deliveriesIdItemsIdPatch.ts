import { Delivery, DeliveryItem, DeliveryItemPatch, GenericOk } from "../../types/domain";
import { apiBase } from "../base";

type Response = GenericOk & { payload: DeliveryItem };

export const deliveriesIdItemsIdPatch = (deliveryId: Delivery['id'], itemId: DeliveryItem['item']['id'], payload: DeliveryItemPatch) =>
    apiBase.patch<Response>(`/deliveries/${deliveryId}/items/${itemId}`, payload);