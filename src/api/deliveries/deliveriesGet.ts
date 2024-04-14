import { Delivery, GenericOk } from "../../types/domain";
import { apiBase } from "../base";

type Response = GenericOk & { payload: Delivery[] };

export const deliveriesGet = () => apiBase.get<Response>('/deliveries');