import { Delivery, DeliveryPatch, GenericOk } from "../../types/domain";
import { apiBase } from "../base";

type Response = GenericOk & { payload: Delivery };

export const deliveriesIdPatch = (id: Delivery['id'], payload: DeliveryPatch) => 
    apiBase.patch<Response>(`/deliveries/${id}`, payload);