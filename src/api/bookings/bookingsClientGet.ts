import { BookingClient, GenericOk } from "../../types/domain";
import { apiBase } from "../base";

type Response = GenericOk & { payload: BookingClient[] };

export const bookingsClientGet = () => apiBase.get<Response>('/bookings/client');