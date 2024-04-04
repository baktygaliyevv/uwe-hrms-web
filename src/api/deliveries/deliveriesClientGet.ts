import { DeliveryGeneric, GenericOk } from "../../types/domain";
import { apiBase } from "../base";

type Response = GenericOk & { payload: DeliveryGeneric[] };

export const deliveriesClientGet = () => apiBase.get<Response>('/deliveries/client');