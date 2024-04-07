import { Booking, GenericOk } from "../../types/domain";
import { apiBase } from "../base";

type Response = GenericOk & { payload: Booking[] };

export const bookingsGet = () => apiBase.get<Response>('/bookings');