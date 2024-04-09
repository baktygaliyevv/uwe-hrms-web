import { Delivery, GenericOk } from "../../types/domain";
import { apiBase } from "../base";

type Response = GenericOk;

export const deliveriesIdDelete = (id: Delivery['id']) => apiBase.delete<Response>(`/deliveries/${id}`);